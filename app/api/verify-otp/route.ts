import connectDB from "@/lib/db";
import Otp from "../../../lib/models/otp";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { email, otp } = body;
    const user = await Otp.findOne({
      email,
    });
    if (!user) {
      return Response.json("failed to find otp", { status: 500 });
    }

    const validateOtp = await bcrypt.compare(otp, user.otp);

    if (user.expiresAt < new Date()) {
      return Response.json(
        {
          error: "OTP expired",
        },
        { status: 400 },
      );
    }
    if (!validateOtp) {
      return Response.json(
        {
          error: "OTP does not match",
        },
        { status: 400 },
      );
    }
    await user.deleteOne();

    return Response.json("otp verified successfully", { status: 200 });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}
