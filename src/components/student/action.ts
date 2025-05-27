"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { StudentSchema } from "@/lib/formValidationSchemas";
import bcryptjs from "bcryptjs";
import { UserRole } from "@prisma/client";

type CurrentState = { success: boolean; error: boolean };

export const createStudent = async (
  currentState: CurrentState,
  data: StudentSchema
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
        role: UserRole.STUDENT,
        emailVerified: new Date(), // Auto-verify for admin-created accounts
      },
    });

    // Create student record
    await prisma.student.create({
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
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateStudent = async (
  currentState: CurrentState,
  data: StudentSchema
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

    // Update student record
    await prisma.student.update({
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
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });
    
    revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteStudent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    // Delete student record (this will also cascade to related records)
    await prisma.student.delete({
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

    revalidatePath("/list/students");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};