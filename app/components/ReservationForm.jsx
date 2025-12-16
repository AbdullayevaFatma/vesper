'use client';

import { useState, useEffect } from 'react';

const TIME_SLOTS = [
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
];

const RESTAURANT_CONFIG = {
  totalTables: 20,
  maxCapacityPerTable: 6,
};

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
  });

  const [availability, setAvailability] = useState(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
 

  const today = new Date().toISOString().split('T')[0];

 
  useEffect(() => {
    if (formData.date && formData.guests) {
      checkAvailability();
    }
  }, [formData.date, formData.guests]);

  const checkAvailability = async () => {
    setCheckingAvailability(true);
    setAvailability(null);

    try {
      const response = await fetch('/api/reservations/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: formData.date,
          guests: formData.guests
        })
      });

      const data = await response.json();

      if (response.ok) {
        setAvailability(data);
      } else {
        setAvailability({ available: false, remainingReservations: 0 });
      }
    } catch (err) {
      console.error('Availability check error:', err);
      setAvailability({ available: false, remainingReservations: 0 });
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Reservation confirmed! Table ${data.reservation.tableNumber} is reserved for you.`);
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          guests: '2',
          specialRequests: ''
        });
        setAvailability(null);
      } else {
        setError(data.error || 'Reservation failed');
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-10 py-8 my-24 bg-[#f5f1e8] rounded-lg shadow-xl">
      <h2 className="text-3xl lg:text-4xl font-extrabold text-primary-500 tracking-widest mb-6 text-center">
        Make a Reservation
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border text-gray-800 border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border text-gray-800 border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="+1 234 567 8900"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            min={today}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Time *</label>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full appearance-none px-4  py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="">Select time</option>
            {TIME_SLOTS.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Number of Guests *</label>
          <select
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            required
            className="w-full appearance-none px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            {[1,2,3,4,5,6].map(num => (
              <option key={num} value={num}>{num} {num===1?'Guest':'Guests'}</option>
            ))}
          </select>
        </div>
        {checkingAvailability && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">
            Checking availability...
          </div>
        )}
        {availability && !checkingAvailability && (
          <div className={`p-4 rounded-lg ${
            availability.available ? 'bg-orange-50 border border-primary-500 text-primary-500' : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {availability.available
              ? `✓ Available! ${availability.remainingReservations} reservation(s) left for this day.`
              : '✗ Sorry, no reservations left for this day.'}
          </div>
        )}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Special Requests (Optional)
          </label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none  focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Dietary restrictions, celebration, window seat preference..."
          />
        </div>
        <button
          type="submit"
          disabled={submitting || !availability?.available}
          className="w-full py-4 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Confirming...' : 'Confirm Reservation'}
        </button>
        {message && <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">{message}</div>}
        {error && <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}
      </form>
    </div>
  );
}
