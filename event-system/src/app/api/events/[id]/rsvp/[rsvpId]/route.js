import { NextResponse } from "next/server";
import rsvpService from "@/services/rsvpService";

// PATCH /api/events/[id]/rsvp/[rsvpId] - Update RSVP status (for organizers)
export async function PATCH(request, { params }) {
  try {
    const { id: eventId, rsvpId } = params;
    const { status } = await request.json();

    if (!rsvpId || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedRsvp = await rsvpService.updateRsvpStatus(rsvpId, status);

    return NextResponse.json(updatedRsvp);
  } catch (error) {
    console.error("Error updating RSVP:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update RSVP status" },
      { status: error.message.includes("Not authorized") ? 403 : 400 }
    );
  }
}
