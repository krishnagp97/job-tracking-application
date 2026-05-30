import {
  Target,
  Trophy,
  CheckCircle2,
  BriefcaseBusiness,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface StatsCardIProps {
  interviewRate: number;
  offerRate: number;
  successRate: number;
  activeApplications: number;
}

export function StatsCard({
  interviewRate,
  offerRate,
  successRate,
  activeApplications,
}: StatsCardIProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Job Search Insights</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Interview Rate
            </p>
            <Target className="h-4 w-4 text-blue-600" />
          </div>

          <p className="text-2xl font-bold text-blue-600">
            {interviewRate.toFixed(0)}%
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Offer Rate
            </p>
            <Trophy className="h-4 w-4 text-amber-600" />
          </div>

          <p className="text-2xl font-bold text-amber-600">
            {offerRate.toFixed(0)}%
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Success Rate
            </p>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>

          <p className="text-2xl font-bold text-emerald-600">
            {successRate.toFixed(0)}%
          </p>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Active Jobs
            </p>
            <BriefcaseBusiness className="h-4 w-4 text-slate-600" />
          </div>

          <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">
            {activeApplications}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}