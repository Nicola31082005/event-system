import eventService from "../../../../services/eventService";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const id = (await params).id;
  const event = await eventService.getEventById(id);
  return NextResponse.json(event);
}

export async function DELETE(req, { params }) {
  const id = (await params).id;
  const event = await eventService.deleteEvent(id);
  return NextResponse.json(event);
}
