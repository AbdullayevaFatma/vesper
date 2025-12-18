import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Reservation from "../../../models/Reservation";
import {
  RESTAURANT_CONFIG,
  isValidEmail,
  isValidDate,
  isPastDate,
  isValidTime,
} from "../../../lib/reservationHelpers";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, time, guests, specialRequests } = body;

    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json(
        {
          error:
            "All required fields must be filled (name, email, phone, date, time, guests)",
        },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    if (!isValidDate(date)) {
      return NextResponse.json(
        { error: "Invalid date format. Use YYYY-MM-DD" },
        { status: 400 },
      );
    }

    if (isPastDate(date)) {
      return NextResponse.json(
        { error: "Cannot make reservations for past dates" },
        { status: 400 },
      );
    }

    if (!isValidTime(time)) {
      return NextResponse.json(
        { error: "Invalid time selected" },
        { status: 400 },
      );
    }

    const guestCount = parseInt(guests);
    if (
      isNaN(guestCount) ||
      guestCount < 1 ||
      guestCount > RESTAURANT_CONFIG.maxCapacityPerTable
    ) {
      return NextResponse.json(
        {
          error: `Guests must be between 1 and ${RESTAURANT_CONFIG.maxCapacityPerTable}`,
        },
        { status: 400 },
      );
    }

    await connectDB();

    const reservationsForDate = await Reservation.find({
      date: date,
      status: "confirmed",
    }).sort({ tableNumber: 1 });

    if (reservationsForDate.length >= RESTAURANT_CONFIG.totalTables) {
      return NextResponse.json(
        { error: "Sorry, no tables available for this day" },
        { status: 409 },
      );
    }

    const existingUserReservation = await Reservation.findOne({
      email: email.toLowerCase(),
      date: date,
      status: "confirmed",
    });

    if (existingUserReservation) {
      return NextResponse.json(
        { error: "You already have a reservation for this date" },
        { status: 409 },
      );
    }

    const nextTableNumber = reservationsForDate.length + 1;

    const newReservation = await Reservation.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      date,
      time,
      guests: guestCount,
      specialRequests: specialRequests?.trim() || "",
      status: "confirmed",
      tableNumber: nextTableNumber,
    });

    return NextResponse.json(
      {
        message: "Reservation confirmed successfully!",
        reservation: {
          id: newReservation._id,
          name: newReservation.name,
          email: newReservation.email,
          date: newReservation.date,
          time: newReservation.time,
          guests: newReservation.guests,
          tableNumber: newReservation.tableNumber,
          createdAt: newReservation.createdAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Reservation creation error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return NextResponse.json({ error: messages.join(", ") }, { status: 400 });
    }

    if (error.code === 11000) {
      return NextResponse.json(
        { error: "A reservation with this information already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
