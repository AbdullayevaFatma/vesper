import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import Reservation from '../../../models/Reservation';
import { 
  RESTAURANT_CONFIG,
  isValidEmail,
  isValidDate,
  isPastDate,
  isValidTime
} from '../../../lib/reservationHelpers';

// Create reservation (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, time, guests, specialRequests } = body;
    
    // Validation
    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json(
        { error: 'All required fields must be filled (name, email, phone, date, time, guests)' },
        { status: 400 }
      );
    }
    
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
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
    
    if (!isValidTime(time)) {
      return NextResponse.json(
        { error: 'Invalid time selected' },
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
    
    // Gün bazlı rezervasyon sayısını kontrol et
    const reservationsForDate = await Reservation.find({
      date: date,
      status: 'confirmed'
    }).sort({ tableNumber: 1 });
    
    if (reservationsForDate.length >= RESTAURANT_CONFIG.totalTables) {
      return NextResponse.json(
        { error: 'Sorry, no tables available for this day' },
        { status: 409 }
      );
    }
    
    // Kullanıcının aynı gün için zaten rezervasyonu var mı kontrol et
    const existingUserReservation = await Reservation.findOne({
      email: email.toLowerCase(),
      date: date,
      status: 'confirmed'
    });
    
    if (existingUserReservation) {
      return NextResponse.json(
        { error: 'You already have a reservation for this date' },
        { status: 409 }
      );
    }
    
    // Table number ataması (gün bazlı)
    const nextTableNumber = reservationsForDate.length + 1;
    
    // Yeni rezervasyon oluştur
    const newReservation = await Reservation.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      date,
      time,
      guests: guestCount,
      specialRequests: specialRequests?.trim() || '',
      status: 'confirmed',
      tableNumber: nextTableNumber
    });
    
    return NextResponse.json(
      {
        message: 'Reservation confirmed successfully!',
        reservation: {
          id: newReservation._id,
          name: newReservation.name,
          email: newReservation.email,
          date: newReservation.date,
          time: newReservation.time,
          guests: newReservation.guests,
          tableNumber: newReservation.tableNumber,
          createdAt: newReservation.createdAt
        }
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Reservation creation error:', error);
    
    // Mongoose validation hatası
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: messages.join(', ') },
        { status: 400 }
      );
    }
    
    // Duplicate key hatası
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'A reservation with this information already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get all reservations (GET)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const email = searchParams.get('email');
    
    await connectDB();
    
    // Query builder
    let query = { status: 'confirmed' };
    
    if (date) {
      query.date = date;
    }
    
    if (email) {
      query.email = email.toLowerCase();
    }
    
    const reservations = await Reservation.find(query)
      .sort({ date: -1, time: 1 })
      .select('-__v'); // __v field'ini gizle
    
    return NextResponse.json({
      total: reservations.length,
      reservations: reservations.map(res => ({
        id: res._id,
        name: res.name,
        email: res.email,
        phone: res.phone,
        date: res.date,
        time: res.time,
        guests: res.guests,
        tableNumber: res.tableNumber,
        specialRequests: res.specialRequests,
        status: res.status,
        createdAt: res.createdAt
      }))
    });
    
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Cancel/Delete reservation (DELETE)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Reservation ID is required' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    const reservation = await Reservation.findById(id);
    
    if (!reservation) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      );
    }
    
    // Soft delete (status değiştir)
    reservation.status = 'cancelled';
    await reservation.save();
    
    // Veya tamamen sil:
    // await Reservation.findByIdAndDelete(id);
    
    return NextResponse.json({
      message: 'Reservation cancelled successfully',
      reservation: {
        id: reservation._id,
        status: reservation.status
      }
    });
    
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}