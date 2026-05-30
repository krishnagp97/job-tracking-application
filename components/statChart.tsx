"use client";

import { Label, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export default function StatChart({
  chartData,
}: {
  chartData: {
    stage: string;
    applications: number;
    fill: string;
  }[];
}) {
  const chartConfig = {
    applications: {
      label: "Applications",
    },
  } satisfies ChartConfig;

  const totalApplications = chartData.reduce(
    (acc, curr) => acc + curr.applications,
    0,
  );
  const filteredData = chartData.filter(item => item.applications > 0);

  return (
    <ChartContainer config={chartConfig} className="mx-auto h-80 w-full">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />

        <Pie
          data={filteredData}
          dataKey="applications"
          nameKey="stage"
          innerRadius={60}
          outerRadius={90}
          strokeWidth={5}
          label={({
            cx,
            cy,
            midAngle,
            outerRadius,
            name,
            value,
            payload,
          }) => {
      
            const RADIAN = Math.PI / 180;
            const radius = (outerRadius ?? 0) + 30;

            const x =
              (cx ?? 0) +
              radius * Math.cos(-(midAngle ?? 0) * RADIAN);

            const y =
              (cy ?? 0) +
              radius * Math.sin(-(midAngle ?? 0) * RADIAN);
               return (
              <text
                x={x}
                y={y}
                textAnchor={x > (cx ?? 0) ? "start" : "end"}
                dominantBaseline="central"
                fontSize={14}
                fontWeight={600}
                fill={(payload as { fill: string }).fill}
              >
                {`${name} (${value})`}
              </text>
            );
          }}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
          
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      fontSize={32}
                      fontWeight={700}
                      className="fill-foreground "
                    >
                      {totalApplications}
                    </tspan>

                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy  + 28}
                      className="fill-muted-foreground"
                    >
                      Applications
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
