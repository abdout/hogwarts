import { DocsConfig } from "./type";

export const docsConfig: DocsConfig = {
  sidebarNav: [
    {
      title: "",
      items: [
        {
          title: "Admin Dashboard",
          href: "/admin",
          visible: ["ADMIN"],
        },
        {
          title: "Student",
          href: "/list/students",
          visible: ["ADMIN", "TEACHER"],
        },
        {
          title: "Teacher",
          href: "/list/teachers",
          visible: ["ADMIN", "TEACHER"],
        },
        {
          title: "Parent",
          href: "/list/parents",
          visible: ["ADMIN", "TEACHER"],
        },
        {
          title: "Subject",
          href: "/list/subjects",
          visible: ["ADMIN"],
        },
        {
          title: "Class",
          href: "/list/classes",
          visible: ["ADMIN", "TEACHER"],
        },
        {
          title: "Lesson",
          href: "/list/lessons",
          visible: ["ADMIN", "TEACHER"],
        },
        {
          title: "Exam",
          href: "/list/exams",
          visible: ["ADMIN", "TEACHER", "STUDENT", "PARENT"],
        },
        {
          title: "Assignment",
          href: "/list/assignments",
          visible: ["ADMIN", "TEACHER", "STUDENT", "PARENT"],
        },
        {
            title: "Attendance",
            href: "/list/attendance",
            visible: ["ADMIN", "TEACHER", "STUDENT", "PARENT"],
        },
        {
            title: "Results",
            href: "/list/results",
            visible: ["ADMIN", "TEACHER", "STUDENT", "PARENT"],
        },
        // {
        //     title: "Events",
        //     href: "/list/events",
        //     visible: ["ADMIN", "TEACHER", "STUDENT", "PARENT"],
        // },
        // {
        //     title: "Messages",
        //     href: "/list/messages",
        //     visible: ["ADMIN", "TEACHER", "STUDENT", "PARENT"],
        // },
        // {
        //     title: "Announcements",
        //     href: "/list/announcements",
        //     visible: ["ADMIN", "TEACHER", "STUDENT", "PARENT"],
        // },
      ],
    },
    
  ],
};
