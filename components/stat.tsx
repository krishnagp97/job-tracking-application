import { Board, Column, JobApplication } from "@/lib/models";
import StatChart from "./statChart";
import connectDB from "@/lib/db";
import { StatsCard } from "./statsCard";

export default async function Stat({ userId }: { userId: string }) {
  await connectDB();
  const board = await Board.findOne({ userId, name: "Job Hunt" });
  const boardId = board?._id;
  if (!boardId) {
    return <div>Failed to find board</div>;
  }

  const wishListId = await Column.findOne({ boardId, name: "Wish List" });
  const OfferId = await Column.findOne({ boardId, name: "offer" });
  const appliedId = await Column.findOne({ boardId, name: "Applied" });
  const rejectedId = await Column.findOne({ boardId, name: "Rejected" });
  const interviewingId = await Column.findOne({
    boardId,
    name: "Interviewing",
  });

  if (!wishListId || !OfferId || !appliedId || !rejectedId || !interviewingId) {
    return <div>Failed to find column</div>;
  }
  const jobs = await JobApplication.aggregate([
    { $match: { boardId } },
    {
      $group: {
        _id: "$columnId",
        count: { $sum: 1 },
      },
    },
  ]);
  const jobMap = new Map(jobs.map((j) => [j._id.toString(), j.count]));

  const jobsInWishList = jobMap.get(wishListId._id.toString()) || 0;
  const jobsInOffer = jobMap.get(OfferId._id.toString()) || 0;
  const jobsInApplied = jobMap.get(appliedId._id.toString()) || 0;
  const jobsInRejected = jobMap.get(rejectedId._id.toString()) || 0;
  const jobsInInterviewing = jobMap.get(interviewingId._id.toString()) || 0;
  const chartData = [
    {
      stage: "Wish List",
      applications: jobsInWishList,
      fill: "#06B6D4",
    },
    {
      stage: "Applied",
      applications: jobsInApplied,
      fill: "#A855F7",
    },
    { stage: "Offer", applications: jobsInOffer, fill: "#EAB308" },
    {
      stage: "Interviewing",
      applications: jobsInInterviewing,
      fill: "#22C55E",
    },
    {
      stage: "Rejected",
      applications: jobsInRejected,
      fill: "#EF4444",
    },
  ];
  const totalJobs = await JobApplication.countDocuments({ userId });
  const interviewRate =
    totalJobs > 0 ? ((jobsInInterviewing + jobsInOffer) / totalJobs) * 100 : 0;
  const offerRate = totalJobs > 0 ? (jobsInOffer / totalJobs) * 100 : 0;
  const successRate =
    jobsInOffer + jobsInRejected > 0
      ? (jobsInOffer / (jobsInOffer + jobsInRejected)) * 100
      : 0;
  const activeApplications =
    jobsInWishList + jobsInApplied + jobsInInterviewing + jobsInOffer;

  return (
    <div className="mx-auto mt-8 max-w-6xl px-4">
      <div className="grid gap-6 lg:grid-cols-[1.8fr_1fr] items-stretch">
        <StatChart chartData={chartData} />

        <StatsCard
          interviewRate={interviewRate}
          offerRate={offerRate}
          successRate={successRate}
          activeApplications={activeApplications}
        />
      </div>
    </div>
  );
}
