import { PrismaClient } from "@prisma/client";
import userService from "./userService";
import { auth, currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export default {
  getAllEvents: async ({ page, limit, paginate = true } = {}) => {
    // Base query options
    const queryOptions = {
      include: {
        organizer: true,
      },
      orderBy: {
        startDate: "asc", // Order by upcoming events first
      },
    };

    // If pagination is requested
    if (paginate) {
      // Use provided values or defaults
      const pageNumber = page || 1;
      const pageSize = limit || 10;

      // Calculate pagination values
      const skip = (pageNumber - 1) * pageSize;

      // Get events with pagination
      const events = await prisma.event.findMany({
        ...queryOptions,
        skip,
        take: pageSize,
      });

      // Get total count for pagination
      const total = await prisma.event.count();

      return {
        events,
        pagination: {
          total,
          page: pageNumber,
          limit: pageSize,
          pages: Math.ceil(total / pageSize),
          hasMore: skip + events.length < total,
        },
      };
    }

    // If no pagination is requested, return all events
    else {
      const events = await prisma.event.findMany(queryOptions);
      return events;
    }
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
