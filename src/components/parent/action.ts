"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { ParentSchema } from "@/lib/formValidationSchemas";
import bcryptjs from "bcryptjs";
import { UserRole } from "@prisma/client";

type CurrentState = { success: boolean; error: boolean };

export const createParent = async (
  currentState: CurrentState,
  data: ParentSchema
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
        role: UserRole.PARENT,
        emailVerified: new Date(), // Auto-verify for admin-created accounts
      },
    });

    // Create parent record
    await prisma.parent.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone,
        address: data.address,
      },
    });

    revalidatePath("/list/parents");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateParent = async (
  currentState: CurrentState,
  data: ParentSchema
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

    // Update parent record
    await prisma.parent.update({
      where: {
        id: data.id,
      },
      data: {
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone,
        address: data.address,
      },
    });
    
    revalidatePath("/list/parents");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteParent = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    // Delete parent record (this will also cascade to related records)
    await prisma.parent.delete({
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

    revalidatePath("/list/parents");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};