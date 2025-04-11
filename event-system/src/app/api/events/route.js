import { NextResponse } from "next/server";
import eventService from "../../../services/eventService";

export async function GET(req) {
  const events = await eventService.getAllEvents();
  return NextResponse.json(events);
}

export async function POST(req) {
  const body = await req.json();
  const event = await eventService.createEvent(body);
  return NextResponse.json(event);
}
