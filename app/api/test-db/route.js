// app/api/test-db/route.js
import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json({
      status: "success",
      message: "MongoDB connection successful!",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database test failed:", error);

    return NextResponse.json(
      {
        status: "error",
        message: error.message,
        code: error.code,
      },
      { status: 500 },
    );
  }
}
