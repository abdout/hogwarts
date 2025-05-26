"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, ResponsiveContainer } from "recharts"
import { PrismaClient } from "@prisma/client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Initialize Prisma client
const prisma = new PrismaClient()

interface StudentPieChartProps {
  boys: number;
  girls: number;
}

// Type for the groupBy result
interface GroupByResult {
  sex: "MALE" | "FEMALE";
  _count: {
    sex: number;
  };
}

const chartConfig = {
  count: {
    label: "Students",
  },
  male: {
    label: "Boys",
    color: "hsl(200, 89%, 52%)", // lamaSky color
  },
  female: {
    label: "Girls",
    color: "hsl(47, 95%, 57%)", // lamaYellow color
  },
} satisfies ChartConfig

export function StudentPieChart({ boys, girls }: StudentPieChartProps) {
  const chartData = [
    { gender: "male", count: boys, fill: chartConfig.male.color },
    { gender: "female", count: girls, fill: chartConfig.female.color },
  ]

  const totalStudents = React.useMemo(() => {
    return boys + girls
  }, [boys, girls])

  const boysPercentage = Math.round((boys / totalStudents) * 100)
  const girlsPercentage = Math.round((girls / totalStudents) * 100)

  return (
    <Card className="w-full">
      <CardHeader className="items-center pb-2">
        <CardTitle>Student Distribution</CardTitle>
        <CardDescription>Gender Ratio</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] w-full p-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="gender"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
              paddingAngle={5}
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalStudents.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Students
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-6">
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: chartConfig.male.color }} />
          <span className="font-bold">{boys}</span>
          <span className="text-xs text-muted-foreground">
            Boys ({boysPercentage}%)
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: chartConfig.female.color }} />
          <span className="font-bold">{girls}</span>
          <span className="text-xs text-muted-foreground">
            Girls ({girlsPercentage}%)
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}

// Container component that fetches data
export async function StudentPieChartContainer() {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: {
      sex: true,
    },
  });

  const boys = data.find((d) => d.sex === "MALE")?._count.sex || 0;
  const girls = data.find((d) => d.sex === "FEMALE")?._count.sex || 0;

  return <StudentPieChart boys={boys} girls={girls} />;
}