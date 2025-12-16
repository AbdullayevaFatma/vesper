// app/api/reservations/route.js
import { NextResponse } from 'next/server';
import { readData, writeData, isValidDate, isPastDate, isValidEmail } from '../../lib/db';

const RESTAURANT_CONFIG = {
  totalTables: 20,
  maxCapacityPerTable: 6,
};

// Create reservation (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, guests, specialRequests } = body;

    // Validation
    if (!name || !email || !phone || !date || !guests) {
      return NextResponse.json(
        { error: 'All fields are required (name, email, phone, date, guests)' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format', status: 400 });
    }

    if (!isValidDate(date)) {
      return NextResponse.json({ error: 'Invalid date format. Use YYYY-MM-DD', status: 400 });
    }

    if (isPastDate(date)) {
      return NextResponse.json({ error: 'Cannot make reservations for past dates', status: 400 });
    }

    const guestCount = parseInt(guests);
    if (isNaN(guestCount) || guestCount < 1 || guestCount > RESTAURANT_CONFIG.maxCapacityPerTable) {
      return NextResponse.json({ error: `Guests must be between 1 and ${RESTAURANT_CONFIG.maxCapacityPerTable}`, status: 400 });
    }

    // Read existing reservations
    const reservations = readData('reservations.json');

    // Gün bazlı rezervasyon sayısı
    const reservationsForDate = reservations.filter(
      res => res.date === date && res.status === 'confirmed'
    );

    if (reservationsForDate.length >= RESTAURANT_CONFIG.totalTables) {
      return NextResponse.json(
        { error: 'Sorry, no reservations left for this day' },
        { status: 409 }
      );
    }

    // Table number ataması artık gün bazlı
    const newReservation = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      phone,
      date,
      guests: guestCount,
      specialRequests: specialRequests || '',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      tableNumber: reservationsForDate.length + 1 
    };

    reservations.push(newReservation);

    const saved = writeData('reservations.json', reservations);
    if (!saved) {
      return NextResponse.json({ error: 'Failed to save reservation', status: 500 });
    }

    return NextResponse.json(
      { message: 'Reservation confirmed!', reservation: newReservation },
      { status: 201 }
    );

  } catch (error) {
    console.error('Reservation creation error:', error);
    return NextResponse.json({ error: 'Internal server error', status: 500 });
  }
}

// Get all reservations (GET)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    let reservations = readData('reservations.json');

    if (date) {
      reservations = reservations.filter(res => res.date === date);
    }

    const confirmedReservations = reservations.filter(res => res.status === 'confirmed');

    return NextResponse.json({
      total: confirmedReservations.length,
      reservations: confirmedReservations
    });

  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json({ error: 'Internal server error', status: 500 });
  }
}
