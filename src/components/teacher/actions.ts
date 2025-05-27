//components/teacher/actions.ts
"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { TeacherSchema } from "@/lib/formValidationSchemas";
import bcryptjs from "bcryptjs";
import { UserRole } from "@prisma/client";

type CurrentState = { success: boolean; error: boolean };

export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  try {
    // Hash the password
    const hashedPassword = await bcryptjs.hash(data.password, 10);

    // Create user in AuthJS User table
    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: UserRole.TEACHER,
        emailVerified: new Date(), // Auto-verify for admin-created accounts
      },
    });

    // Create teacher record
    await prisma.teacher.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });

    revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema
) => {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    // Update user in AuthJS User table
    const updateData: any = {
      username: data.username,
      email: data.email,
    };

    // Only hash and update password if provided
    if (data.password && data.password !== "") {
      updateData.password = await bcryptjs.hash(data.password, 10);
    }

    await prisma.user.update({
      where: { id: data.id },
      data: updateData,
    });

    // Update teacher record
    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data: {
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          set: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });
    
    revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    // Delete teacher record (this will also cascade to related records)
    await prisma.teacher.delete({
      where: {
        id: id,
      },
    });

    // Delete user from AuthJS User table
    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};