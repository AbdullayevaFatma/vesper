
// ============================================
// 4. app/api/reservations/availability/route.js (GÜNCELLENMİŞ)
// ============================================
import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongodb';
import Reservation from '../../../../models/Reservation';
import { 
  RESTAURANT_CONFIG, 
  isValidDate, 
  isPastDate 
} from '../../../../lib/reservationHelpers';

export async function POST(request) {
  try {
    const body = await request.json();
    const { date, guests } = body;
    
    // Validation
    if (!date || !guests) {
      return NextResponse.json(
        { error: 'Date and number of guests are required' },
        { status: 400 }
      );
    }
    
    if (!isValidDate(date)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }
    
    if (isPastDate(date)) {
      return NextResponse.json(
        { error: 'Cannot make reservations for past dates' },
        { status: 400 }
      );
    }
    
    const guestCount = parseInt(guests);
    if (isNaN(guestCount) || guestCount < 1 || guestCount > RESTAURANT_CONFIG.maxCapacityPerTable) {
      return NextResponse.json(
        { error: `Guests must be between 1 and ${RESTAURANT_CONFIG.maxCapacityPerTable}` },
        { status: 400 }
      );
    }
    
    // MongoDB'ye bağlan
    await connectDB();
    
    // Gün bazlı rezervasyonları say
    const reservationsForDate = await Reservation.countDocuments({
      date: date,
      status: 'confirmed'
    });
    
    const remainingReservations = RESTAURANT_CONFIG.totalTables - reservationsForDate;
    const isAvailable = remainingReservations > 0;
    
    return NextResponse.json({
      available: isAvailable,
      remainingReservations, 
      totalTables: RESTAURANT_CONFIG.totalTables,
      reservedTables: reservationsForDate,
      date,
      guests: guestCount
    });
    
  } catch (error) {
    console.error('Availability check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}