"use client"

import { Users } from "lucide-react"
import { Pie, PieChart } from "recharts"

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

const chartData = [
  { gender: "male", count: 320, fill: "hsl(var(--chart-1))" },
  { gender: "female", count: 280, fill: "hsl(var(--chart-2))" },
]

const chartConfig = {
  count: {
    label: "Students",
  },
  male: {
    label: "Male",
    color: "hsl(var(--chart-1))",
  },
  female: {
    label: "Female",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function StudentGenderChart() {
  const totalStudents = chartData.reduce((sum, item) => sum + item.count, 0)
  const malePercentage = ((chartData[0].count / totalStudents) * 100).toFixed(1)
  const femalePercentage = ((chartData[1].count / totalStudents) * 100).toFixed(1)

  return (
    <Card className="flex flex-col border-none shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Students</CardTitle>
        <CardDescription>Gender Distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 -mt-2">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[240px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="count" nameKey="gender" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <Users className="h-4 w-4" />
          Total Students: {totalStudents}
        </div>
        <div className="flex gap-4 text-muted-foreground">
          <span>Male: {malePercentage}%</span>
          <span>Female: {femalePercentage}%</span>
        </div>
      </CardFooter>
    </Card>
  )
}