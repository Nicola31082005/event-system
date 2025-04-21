import { PrismaClient } from "@prisma/client";
import userService from "./userService";
import { auth, currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export default {
  // Get all RSVPs with pagination support
  getAllRsvps: async ({ page, limit, paginate = true } = {}) => {
    const queryOptions = {
      include: {
        user: true,
        event: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    };

    if (paginate) {
      const pageNumber = page || 1;
      const pageSize = limit || 10;
      const skip = (pageNumber - 1) * pageSize;

      const rsvps = await prisma.rSVP.findMany({
        ...queryOptions,
        skip,
        take: pageSize,
      });

      const total = await prisma.rSVP.count();

      return {
        rsvps,
        pagination: {
          total,
          page: pageNumber,
          limit: pageSize,
          pages: Math.ceil(total / pageSize),
          hasMore: skip + rsvps.length < total,
        },
      };
    } else {
      const rsvps = await prisma.rSVP.findMany(queryOptions);
      return rsvps;
    }
  },

  // Get RSVPs for a specific event
  getRsvpsByEventId: async (
    eventId,
    { page, limit, paginate = true, status } = {}
  ) => {
    const whereClause = {
      eventId,
      ...(status ? { status } : {}),
    };

    const queryOptions = {
      where: whereClause,
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    };

    if (paginate) {
      const pageNumber = page || 1;
      const pageSize = limit || 10;
      const skip = (pageNumber - 1) * pageSize;

      const rsvps = await prisma.rSVP.findMany({
        ...queryOptions,
        skip,
        take: pageSize,
      });

      const total = await prisma.rSVP.count({ where: whereClause });

      return {
        rsvps,
        pagination: {
          total,
          page: pageNumber,
          limit: pageSize,
          pages: Math.ceil(total / pageSize),
          hasMore: skip + rsvps.length < total,
        },
      };
    } else {
      const rsvps = await prisma.rSVP.findMany(queryOptions);
      return rsvps;
    }
  },

  // Get RSVPs for the current user
  getUserRsvps: async ({ status } = {}) => {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const dbUser = await userService.getUserByClerkId(userId);
    if (!dbUser) {
      throw new Error("User not found");
    }

    return await prisma.rSVP.findMany({
      where: {
        userId: dbUser.id,
        ...(status ? { status } : {}),
      },
      include: {
        event: {
          include: {
            organizer: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  // Get a specific RSVP by ID
  getRsvpById: async (id) => {
    return await prisma.rSVP.findUnique({
      where: { id },
      include: {
        user: true,
        event: true,
      },
    });
  },

  // Check if a user has RSVPed to an event
  getUserRsvpForEvent: async (eventId) => {
    const { userId } = await auth();
    if (!userId) {
      return null;
    }

    const dbUser = await userService.getUserByClerkId(userId);
    if (!dbUser) {
      return null;
    }

    return await prisma.rSVP.findFirst({
      where: {
        eventId,
        userId: dbUser.id,
      },
    });
  },

  // Create a new RSVP
  createRsvp: async (eventId, { status = "PENDING" } = {}) => {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const dbUser = await userService.getUserByClerkId(userId);
    if (!dbUser) {
      throw new Error("User not found");
    }

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    // Check if user is the organizer (organizers don't need to RSVP)
    if (event.organizerId === dbUser.id) {
      throw new Error("Organizers cannot RSVP to their own events");
    }

    // Check if user already has an RSVP for this event
    const existingRsvp = await prisma.rSVP.findFirst({
      where: {
        eventId,
        userId: dbUser.id,
      },
    });

    if (existingRsvp) {
      throw new Error("You have already RSVPed to this event");
    }

    // If event is at capacity, automatically set to waitlist
    if (status === "PENDING" && event.capacity) {
      const approvedRsvpsCount = await prisma.rSVP.count({
        where: {
          eventId,
          status: "APPROVED",
        },
      });

      if (approvedRsvpsCount >= event.capacity) {
        status = "WAITLIST";
      }
    }

    // Create the RSVP
    return await prisma.rSVP.create({
      data: {
        status,
        user: {
          connect: { id: dbUser.id },
        },
        event: {
          connect: { id: eventId },
        },
      },
      include: {
        user: true,
        event: true,
      },
    });
  },

  // Delete/cancel an RSVP
  cancelRsvp: async (eventId) => {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const dbUser = await userService.getUserByClerkId(userId);
    if (!dbUser) {
      throw new Error("User not found");
    }

    // Find the user's RSVP for this event
    const rsvp = await prisma.rSVP.findFirst({
      where: {
        eventId,
        userId: dbUser.id,
      },
    });

    if (!rsvp) {
      throw new Error("No RSVP found for this event");
    }

    // Delete the RSVP
    return await prisma.rSVP.delete({
      where: { id: rsvp.id },
    });
  },
};
