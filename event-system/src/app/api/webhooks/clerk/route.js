import { Webhook } from "svix";
import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Webhook endpoint for Clerk events
export async function POST(req) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing svix headers", { status: 400 });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with the webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error: Invalid webhook signature", { status: 400 });
  }

  // Handle the webhook
  const { type, data } = evt;

  console.log(`Webhook received: ${type}`);

  // Handle user creation
  if (type === "user.created") {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: {
          clerkUserId: data.id,
        },
      });

      if (existingUser) {
        return NextResponse.json({ message: "User already exists" });
      }

      // Create user in database
      const newUser = await prisma.user.create({
        data: {
          clerkUserId: data.id,
          email: data.email_addresses?.[0]?.email_address,
          name:
            data.first_name && data.last_name
              ? `${data.first_name} ${data.last_name}`.trim()
              : data.username || "",
          imageUrl: data.image_url,
        },
      });

      console.log("User created in database:", newUser.id);
      return NextResponse.json(
        { message: "User created", user: newUser },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        { error: "Error creating user" },
        { status: 500 }
      );
    }
  }

  // Handle user update
  if (type === "user.updated") {
    try {
      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: {
          clerkUserId: data.id,
        },
      });

      if (!existingUser) {
        // Create user if they don't exist
        const newUser = await prisma.user.create({
          data: {
            clerkUserId: data.id,
            email: data.email_addresses?.[0]?.email_address,
            name:
              data.first_name && data.last_name
                ? `${data.first_name} ${data.last_name}`.trim()
                : data.username || "",
            imageUrl: data.image_url,
          },
        });

        return NextResponse.json(
          { message: "User created", user: newUser },
          { status: 201 }
        );
      }

      // Update user in database
      const updatedUser = await prisma.user.update({
        where: {
          clerkUserId: data.id,
        },
        data: {
          email: data.email_addresses?.[0]?.email_address || existingUser.email,
          name:
            data.first_name && data.last_name
              ? `${data.first_name} ${data.last_name}`.trim()
              : data.username || existingUser.name,
          imageUrl: data.image_url || existingUser.imageUrl,
        },
      });

      return NextResponse.json({ message: "User updated", user: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      return NextResponse.json(
        { error: "Error updating user" },
        { status: 500 }
      );
    }
  }

  // Handle user deletion
  if (type === "user.deleted") {
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          clerkUserId: data.id,
        },
      });

      return NextResponse.json({ message: "User deleted", user: deletedUser });
    } catch (error) {
      console.error("Error deleting user:", error);
      return NextResponse.json(
        { error: "Error deleting user" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Webhook processed" });
}
