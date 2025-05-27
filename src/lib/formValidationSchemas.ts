import { z } from "zod";
import { UserSex } from "@prisma/client";

export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(3, { message: "Username must be at least 3 characters long!" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long!" }).optional().or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }).optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood type is required!" }),
  sex: z.nativeEnum(UserSex),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  subjects: z.array(z.string()).optional(),
});

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(3, { message: "Username must be at least 3 characters long!" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long!" }).optional().or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }).optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, { message: "Blood type is required!" }),
  sex: z.nativeEnum(UserSex),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
  parentId: z.string().min(1, { message: "Parent is required!" }),
});

export const parentSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(3, { message: "Username must be at least 3 characters long!" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long!" }).optional().or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }).optional().or(z.literal("")),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string(),
});

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  teachers: z.array(z.string()).optional(),
});

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Class name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),
  supervisorId: z.string().optional(),
});

export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  lessonId: z.coerce.number().min(1, { message: "Lesson is required!" }),
});

export type TeacherSchema = z.infer<typeof teacherSchema>;
export type StudentSchema = z.infer<typeof studentSchema>;
export type ParentSchema = z.infer<typeof parentSchema>;
export type SubjectSchema = z.infer<typeof subjectSchema>;
export type ClassSchema = z.infer<typeof classSchema>;
export type ExamSchema = z.infer<typeof examSchema>; 