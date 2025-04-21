import { PrismaClient } from "@prisma/client";
import userService from "./userService";
import { auth, currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export default {
  getAllEvents: async () => {
    return await prisma.event.findMany({
      include: {
        organizer: true,
      },
    });
  },

  getLastestEvents: async (numberToGet = 1000) => {
    return await prisma.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: numberToGet,
    });
  },

  getEventById: async (id) => {
    return await prisma.event.findUnique({
      where: { id },
      include: {
        organizer: true,
      },
    });
  },

  createEvent: async (data) => {
    const { userId } = await auth();

    // Get the database user associated with the Clerk user
    const dbUser = await userService.getUserByClerkId(userId);

    if (!dbUser) {
      throw new Error("User not found");
    }

    return await prisma.event.create({
      data: {
        ...data,
        organizerId: dbUser.id,
      },
      include: {
        organizer: true,
      },
    });
  },

  deleteEvent: async (id) => {
    const { userId } = await auth();

    // Get the database user associated with the Clerk user
    const dbUser = await userService.getUserByClerkId(userId);
    if (!dbUser) {
      throw new Error("User not found");
    }

    // Check if the user is the organizer of the event
    const event = await prisma.event.findUnique({
      where: { id },
      select: { organizerId: true },
    });

    if (event?.organizerId !== dbUser.id) {
      throw new Error("Unauthorized to delete this event");
    }

    return await prisma.event.delete({
      where: { id },
    });
  },
};
