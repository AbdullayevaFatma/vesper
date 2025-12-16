// app/api/newsletter/route.js
import { NextResponse } from 'next/server';
import { readData, writeData, isValidEmail } from '../../lib/db';

// Newsletter subscription (POST)
export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;
    
    // Email validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Mevcut subscribers'ı oku
    const subscribers = readData('newsletters.json');
    
    // Email zaten kayıtlı mı?
    const existingSubscriber = subscribers.find(
      sub => sub.email.toLowerCase() === email.toLowerCase()
    );
    
    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 409 }
      );
    }
    
    // Yeni subscriber ekle
    const newSubscriber = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 8),
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
      active: true
    };
    
    subscribers.push(newSubscriber);
    
    // Dosyaya kaydet
    const saved = writeData('newsletters.json', subscribers);
    
    if (!saved) {
      return NextResponse.json(
        { error: 'Failed to save subscription' },
        { status: 500 }
      );
    }
    
    // Başarılı
    return NextResponse.json(
      { 
        message: 'Successfully subscribed to newsletter!',
        subscriber: newSubscriber
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get all subscribers (GET) - Admin için
export async function GET(request) {
  try {
    const subscribers = readData('newsletters.json');
    
    // Sadece aktif subscribers'ı döndür
    const activeSubscribers = subscribers.filter(sub => sub.active);
    
    return NextResponse.json({
      total: activeSubscribers.length,
      subscribers: activeSubscribers
    });
    
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}