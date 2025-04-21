import { NextResponse } from "next/server";
import rsvpService from "@/services/rsvpService";

// POST /api/events/[id]/rsvp - Create a new RSVP
export async function POST(request, { params }) {
  try {
    const eventId = params.id;
    const { status = "PENDING" } = await request.json();

    const rsvp = await rsvpService.createRsvp(eventId, { status });

    return NextResponse.json(rsvp);
  } catch (error) {
    console.error("Error creating RSVP:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create RSVP" },
      { status: error.message.includes("not authenticated") ? 401 : 400 }
    );
  }
}

// DELETE /api/events/[id]/rsvp - Delete a user's RSVP
export async function DELETE(request, { params }) {
  try {
    const { id: eventId } = params;

    await rsvpService.cancelRsvp(eventId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting RSVP:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete RSVP" },
      { status: error.message.includes("not authenticated") ? 401 : 400 }
    );
  }
}

// PATCH /api/events/[id]/rsvp/[rsvpId] - Update RSVP status (for organizers)
