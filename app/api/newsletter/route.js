import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Subscriber from "../../../models/Subscriber";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectDB();

    const exists = await Subscriber.findOne({ email });

    if (exists) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 409 },
      );
    }

    await Subscriber.create({ email });

    return NextResponse.json(
      { message: "Successfully subscribed!" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const subscribers = await Subscriber.find({ active: true }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      total: subscribers.length,
      subscribers,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
