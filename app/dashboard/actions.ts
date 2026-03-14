"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import db from "@/db";
import { links } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const createLinkSchema = z.object({
  originalUrl: z.string().url("Must be a valid URL"),
  shortCode: z
    .string()
    .min(3, "Short code must be at least 3 characters")
    .max(10, "Short code must be at most 10 characters")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Short code can only contain letters, numbers, hyphens, and underscores",
    )
    .optional(),
});

const updateLinkSchema = z.object({
  id: z.number(),
  originalUrl: z.string().url("Must be a valid URL"),
  shortCode: z
    .string()
    .min(3, "Short code must be at least 3 characters")
    .max(10, "Short code must be at most 10 characters")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Short code can only contain letters, numbers, hyphens, and underscores",
    ),
});

type CreateLinkInput = z.infer<typeof createLinkSchema>;
type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

export async function createLink(data: CreateLinkInput) {
  // 1. Check authentication FIRST
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  // 2. Validate data
  const parsed = createLinkSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const validatedData = parsed.data;

  // 3. Generate short code if not provided
  const shortCode = validatedData.shortCode || generateShortCode();

  // 4. Check if short code already exists
  const existingLink = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);

  if (existingLink.length > 0) {
    return {
      error: "Short code already exists. Please choose a different one.",
    };
  }

  // 5. Create the link
  try {
    await db.insert(links).values({
      userId,
      originalUrl: validatedData.originalUrl,
      shortCode,
    });

    // 6. Revalidate the dashboard page
    revalidatePath("/dashboard");

    return { success: true, shortCode };
  } catch (error) {
    console.error("Error creating link:", error);
    return { error: "Failed to create link. Please try again." };
  }
}

function generateShortCode(): string {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function updateLink(data: UpdateLinkInput) {
  // 1. Check authentication FIRST
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  // 2. Validate data
  const parsed = updateLinkSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const validatedData = parsed.data;

  // 3. Check if the link exists and belongs to the user
  const existingLink = await db
    .select()
    .from(links)
    .where(and(eq(links.id, validatedData.id), eq(links.userId, userId)))
    .limit(1);

  if (existingLink.length === 0) {
    return { error: "Link not found or you don't have permission to edit it" };
  }

  // 4. If short code is being changed, check if the new one already exists
  if (existingLink[0].shortCode !== validatedData.shortCode) {
    const shortCodeExists = await db
      .select()
      .from(links)
      .where(eq(links.shortCode, validatedData.shortCode))
      .limit(1);

    if (shortCodeExists.length > 0) {
      return {
        error: "Short code already exists. Please choose a different one.",
      };
    }
  }

  // 5. Update the link
  try {
    await db
      .update(links)
      .set({
        originalUrl: validatedData.originalUrl,
        shortCode: validatedData.shortCode,
      })
      .where(and(eq(links.id, validatedData.id), eq(links.userId, userId)));

    // 6. Revalidate the dashboard page
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error updating link:", error);
    return { error: "Failed to update link. Please try again." };
  }
}

export async function deleteLink(linkId: number) {
  // 1. Check authentication FIRST
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  // 2. Check if the link exists and belongs to the user
  const existingLink = await db
    .select()
    .from(links)
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .limit(1);

  if (existingLink.length === 0) {
    return {
      error: "Link not found or you don't have permission to delete it",
    };
  }

  // 3. Delete the link
  try {
    await db
      .delete(links)
      .where(and(eq(links.id, linkId), eq(links.userId, userId)));

    // 4. Revalidate the dashboard page
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error deleting link:", error);
    return { error: "Failed to delete link. Please try again." };
  }
}
