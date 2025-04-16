import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  getUserByClerkId: async (clerkUserId) => {
    return await prisma.user.findUnique({
      where: { clerkUserId: clerkUserId },
    });
  },
};
