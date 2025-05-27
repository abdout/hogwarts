import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/FormContainer";
import Performance from "@/components/Performance";
import StudentAttendanceCard from "@/components/StudentAttendanceCard";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { currentRole } from "@/lib/auth";
import { Class, Student } from "@prisma/client";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar, GraduationCap, BookOpen, Users } from "lucide-react";
import Link from "next/link";

const SingleStudentPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const role = await currentRole();

  const student:
    | (Student & {
        class: Class & { _count: { lessons: number } };
      })
    | null = await prisma.student.findUnique({
    where: { id },
    include: {
      class: { include: { _count: { select: { lessons: true } } } },
    },
  });

  if (!student) {
    return notFound();
  }

  const statsCards = [
    {
      title: "Attendance",
      value: <Suspense fallback="loading...">
        <StudentAttendanceCard id={student.id} />
      </Suspense>,
      icon: Users,
    },
    {
      title: "Grade",
      value: `${student.class.name.charAt(0)}th`,
      icon: GraduationCap,
    },
    {
      title: "Lessons",
      value: student.class._count.lessons,
      icon: BookOpen,
    },
    {
      title: "Class",
      value: student.class.name,
      icon: Users,
    },
  ];

  const shortcuts = [
    {
      title: "Student's Lessons",
      href: `/list/lessons?classId=${student.class.id}`,
      bgColor: "bg-blue-50",
    },
    {
      title: "Student's Teachers",
      href: `/list/teachers?classId=${student.class.id}`,
      bgColor: "bg-purple-50",
    },
    {
      title: "Student's Exams",
      href: `/list/exams?classId=${student.class.id}`,
      bgColor: "bg-pink-50",
    },
    {
      title: "Student's Assignments",
      href: `/list/assignments?classId=${student.class.id}`,
      bgColor: "bg-blue-50",
    },
    {
      title: "Student's Results",
      href: `/list/results?studentId=${student.id}`,
      bgColor: "bg-yellow-50",
    },
  ];

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Student Info Card */}
          <Card className="flex-1 bg-blue-600 rounded-none rounded-l-md shadow-sm">
            <CardContent className="pt-6 flex gap-4">
              <div className="w-1/3">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={student.img || "/noAvatar.png"} alt={student.name} />
                  <AvatarFallback>{student.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div className="w-2/3 flex flex-col justify-between gap-4">
                <div className="flex items-center gap-4">
                  <h1 className="text-xl font-semibold text-white">
                    {student.name} {student.surname}
                  </h1>
                  {role === "ADMIN" && (
                    <FormContainer table="student" type="update" data={student} />
                  )}
                </div>
                <p className="text-sm text-gray-200">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </p>
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium text-white">
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{student.email || "-"}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{student.phone || "-"}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Intl.DateTimeFormat("en-GB").format(student.birthday)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {statsCards.map((stat, index) => {
              let cornerClasses = "rounded-none";
              
              if (index === 1) {
                cornerClasses = "rounded-none rounded-tr-md";
              } else if (index === statsCards.length - 1) {
                cornerClasses = "rounded-none rounded-br-md";
              }
              
              return (
                <Card 
                  key={index} 
                  className={`w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%] bg-gray-50 shadow-sm ${cornerClasses}`}
                >
                  <CardContent className="pt-6 flex items-center gap-4">
                    <stat.icon className="w-6 h-6 text-gray-500" />
                    <div>
                      <h1 className="text-xl font-semibold">{stat.value}</h1>
                      <span className="text-sm text-gray-400">{stat.title}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Calendar */}
        <Card className="mt-4 border-none shadow-none">
          <CardHeader>
            <CardTitle>Student&apos;s Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <BigCalendarContainer type="classId" id={student.class.id} />
          </CardContent>
        </Card>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>Shortcuts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap text-xs">
              {shortcuts.map((shortcut, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`${shortcut.bgColor} hover:${shortcut.bgColor}/90`}
                  asChild
                >
                  <Link href={shortcut.href}>
                    {shortcut.title}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;