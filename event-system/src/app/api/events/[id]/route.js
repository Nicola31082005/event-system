import eventService from "../../../../services/eventService";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const id = (await params).id;
    const event = await eventService.getEventById(id);
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = (await params).id;
    const event = await eventService.deleteEvent(id);
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
