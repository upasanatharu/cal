"use server";

import { db } from "@/lib/mock-db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface CreateBookingInput {
  eventTypeId: number;
  name: string;
  email: string;
  startTime: Date;
  duration: number;
}

export async function createBooking({
  eventTypeId,
  name,
  email,
  startTime,
  duration,
}: CreateBookingInput) {
  try {
    const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

    // MOCK DATA - Persist to shared memory
    await db.createBooking({
      eventTypeId,
      bookerName: name,
      bookerEmail: email,
      startTime,
      endTime,
    });

    revalidatePath("/[username]/[slug]", "page");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Failed to create booking. Please try again.",
    };
  }
}

export async function cancelBooking(bookingId: number) {
  try {
    await db.deleteBooking(bookingId);

    revalidatePath("/bookings");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Failed to cancel booking. Please try again.",
    };
  }
}

interface CreateEventTypeInput {
  title: string;
  slug: string;
  duration: number;
  description: string | null;
}

export async function createEventType({
  title,
  slug,
  duration,
  description,
}: CreateEventTypeInput) {
  try {
    await db.createEventType({
      title,
      slug,
      duration,
      description: description || "",
      userId: 1
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Error creating event type:", error);
    return {
      success: false,
      error: "Failed to create event type. Please try again.",
    };
  }

  redirect("/");
}