import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/FormContainer";
import Performance from "@/components/Performance";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { currentRole } from "@/lib/auth";
import { Teacher } from "@prisma/client";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone, BookOpen, CalendarDays, Users, GraduationCap, Award } from "lucide-react";
import Link from "next/link";

const SingleTeacherPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const role = await currentRole();

  const teacher:
    | (Teacher & {
        _count: { subjects: number; lessons: number; classes: number };
      })
    | null = await prisma.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
    },
  });

  if (!teacher) {
    return notFound();
  }

  const statsCards = [
    {
      title: "Attendance",
      value: "90%",
      icon: Award,
    },
    {
      title: "Branches",
      value: teacher._count.subjects,
      icon: BookOpen,
    },
    {
      title: "Lessons",
      value: teacher._count.lessons,
      icon: CalendarDays,
    },
    {
      title: "Classes",
      value: teacher._count.classes,
      icon: Users,
    },
  ];

  const shortcuts = [
    {
      title: "Teacher's Classes",
      href: `/list/classes?supervisorId=${teacher.id}`,
      bgColor: "bg-blue-50",
    },
    {
      title: "Teacher's Students",
      href: `/list/students?teacherId=${teacher.id}`,
      bgColor: "bg-purple-50",
    },
    {
      title: "Teacher's Lessons",
      href: `/list/lessons?teacherId=${teacher.id}`,
      bgColor: "bg-yellow-50",
    },
    {
      title: "Teacher's Exams",
      href: `/list/exams?teacherId=${teacher.id}`,
      bgColor: "bg-pink-50",
    },
    {
      title: "Teacher's Assignments",
      href: `/list/assignments?teacherId=${teacher.id}`,
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Teacher Info Card */}
          <Card className="flex-1 bg-blue-600 rounded-none rounded-l-md shadow-sm">
            <CardContent className="pt-6 flex gap-4">
              <div className="w-1/3">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={teacher.img || "/noAvatar.jpeg"} alt={teacher.name} />
                  <AvatarFallback>{teacher.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div className="w-2/3 flex flex-col justify-between gap-4">
                <div className="flex items-center gap-4">
                  <h1 className="text-xl font-semibold text-white">
                    {teacher.name} {teacher.surname}
                  </h1>
                  {role === "ADMIN" && (
                    <FormContainer table="teacher" type="update" data={teacher} />
                  )}
                </div>
                <p className="text-sm text-gray-200">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </p>
                <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium text-white">
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{teacher.email || "-"}</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{teacher.phone || "-"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {statsCards.map((stat, index) => {
              let cornerClasses = "rounded-none"; // Default sharp corners
              
              if (index === 1) { // First card (Branches)
                cornerClasses = "rounded-none rounded-tr-md";
              } else if (index === statsCards.length - 1) { // Last card (Classes)
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
            <CardTitle>Teacher&apos;s Schedule</CardTitle>
          </CardHeader>
          <CardContent className="">
            <BigCalendarContainer type="teacherId" id={teacher.id} />
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

export default SingleTeacherPage;