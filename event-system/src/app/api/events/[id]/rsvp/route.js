import eventService from "@/services/eventService";

// POST /api/events/[id]/rsvp - Create a new RSVP
export async function POST(request, { params }) {
  try {
    // Get the event
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        rsvps: true,
        organizer: true,
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Check if event is in the past
    if (event.date < new Date()) {
      return NextResponse.json(
        { error: "Cannot RSVP to past events" },
        { status: 400 }
      );
    }

    // Check if user is already RSVP'd
    const existingRsvp = await prisma.rSVP.findFirst({
      where: {
        eventId,
        userId: session.user.id,
      },
    });

    if (existingRsvp) {
      return NextResponse.json(
        { error: "You have already RSVP'd to this event" },
        { status: 400 }
      );
    }

    // Create the RSVP
    const rsvp = await prisma.rSVP.create({
      data: {
        status,
        user: {
          connect: { id: session.user.id },
        },
        event: {
          connect: { id: eventId },
        },
      },
    });

    return NextResponse.json(rsvp);
  } catch (error) {
    console.error("Error creating RSVP:", error);
    return NextResponse.json(
      { error: "Failed to create RSVP" },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id]/rsvp - Delete a user's RSVP
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);

  // Check if user is authenticated
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "You must be signed in to cancel an RSVP" },
      { status: 401 }
    );
  }

  const { id: eventId } = params;

  try {
    // Find the user's RSVP for this event
    const rsvp = await prisma.rSVP.findFirst({
      where: {
        eventId,
        userId: session.user.id,
      },
    });

    if (!rsvp) {
      return NextResponse.json({ error: "No RSVP found" }, { status: 404 });
    }

    // Delete the RSVP
    await prisma.rSVP.delete({
      where: {
        id: rsvp.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting RSVP:", error);
    return NextResponse.json(
      { error: "Failed to delete RSVP" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    // Check if user is authenticated
    // const session = await getServerSession(authOptions);
    // if (!session || !session.user.isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Get the event ID from the route params
    const eventId = params.id;

    // Parse the request body
    const body = await request.json();
    const { rsvpId, status } = body;

    if (!rsvpId || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a real app, update the RSVP status
    // const updatedRsvp = await prisma.rSVP.update({
    //   where: {
    //     id: rsvpId
    //   },
    //   data: {
    //     status
    //   }
    // });

    return NextResponse.json({
      id: rsvpId,
      status,
      eventId,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating RSVP:", error);
    return NextResponse.json(
      { error: "Failed to update RSVP status" },
      { status: 500 }
    );
  }
}
