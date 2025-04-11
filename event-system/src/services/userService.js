import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  createUser: async (userId, email, firstName, lastName, imageUrl) => {
    return await prisma.user.create({
      data: { clerkUserId: userId, email, firstName, lastName, imageUrl },
    });
  },
  getUserByClerkId: async (clerkUserId) => {
    return await prisma.user.findUnique({
      where: { clerkUserId },
    });
  },
};
