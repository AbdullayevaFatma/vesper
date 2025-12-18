"use client";

import { useState, useEffect } from "react";

const TIME_SLOTS = [
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
  "00:00",
  "00:30",
  "01:00",
];

const RESTAURANT_CONFIG = {
  totalTables: 20,
  maxCapacityPerTable: 6,
};

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    specialRequests: "",
  });

  const [availability, setAvailability] = useState(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (formData.date && formData.guests) {
      checkAvailability();
    }
  }, [formData.date, formData.guests]);

  const checkAvailability = async () => {
    setCheckingAvailability(true);
    setAvailability(null);

    try {
      const response = await fetch("/api/reservations/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: formData.date,
          guests: formData.guests,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAvailability(data);
      } else {
        setAvailability({ available: false, remainingReservations: 0 });
      }
    } catch (err) {
      console.error("Availability check error:", err);
      setAvailability({ available: false, remainingReservations: 0 });
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          `✓ Reservation confirmed! Table ${data.reservation.tableNumber} is reserved for you on ${formData.date} at ${formData.time}.`,
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          guests: "2",
          specialRequests: "",
        });
        setAvailability(null);
      } else {
        setError(data.error || "Reservation failed");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className=" bg-[#f5f1e8] max-w-3xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-primary-500 px-8 py-6">
          <h2 className="text-3xl font-bold text-white text-center tracking-wide">
            Reserve Your Table
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400"
              placeholder="John Doe"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600  mb-2 uppercase tracking-wide">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400"
                placeholder="+39 123 456 7890"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                min={today}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent duration-300 transition-all text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                Number of Guests *
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-gray-800 appearance-none cursor-pointer"
              >
                {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Time *
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-gray-800 appearance-none  cursor-pointer"
            >
              <option value="">Select time</option>
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-gray-500">
              Restaurant hours: 17:00 - 01:00
            </p>
          </div>
          {checkingAvailability && (
            <div className="p-4 bg-primary-50 border-2 border-primary-500 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500"></div>
                <span className="text-primary-500 font-medium">
                  Checking availability...
                </span>
              </div>
            </div>
          )}

          {availability && !checkingAvailability && (
            <div
              className={`p-5 rounded-lg border-2 ${
                availability.available
                  ? "bg-green-50 border-primary-500"
                  : "bg-red-50 border-red-400"
              }`}
            >
              {availability.available ? (
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-6 h-6 text-primary-500 shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-primary-500">Available!</p>
                    <p className="text-sm text-primary-500 mt-1">
                      {availability.remainingReservations} of{" "}
                      {availability.totalTables} tables remaining for{" "}
                      {formData.date}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-6 h-6 text-red-600 shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-red-800">Fully Booked</p>
                    <p className="text-sm text-red-700 mt-1">
                      Sorry, all tables are reserved for {formData.date}. Please
                      choose another date.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Special Requests (Optional)
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400 resize-none"
              placeholder="Dietary restrictions, celebration, window seat preference, allergies..."
            />
          </div>
          <button
            type="submit"
            disabled={submitting || !availability?.available}
            className={`w-full py-4 px-6 rounded-lg font-bold text-white text-lg tracking-wide transition-all duration-300 transform ${
              submitting || !availability?.available
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primary-500 cursor-pointer"
            }`}
          >
            {submitting ? (
              <span className="flex items-center justify-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Confirming Reservation...</span>
              </span>
            ) : (
              "Confirm Reservation"
            )}
          </button>

          {message && (
            <div className="p-5 bg-green-50 border-2 border-green-400 rounded-lg">
              <div className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-green-600 shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="font-semibold text-green-800">Success!</p>
                  <p className="text-sm text-green-700 mt-1">{message}</p>
                  <p className="text-xs text-green-600 mt-2">
                    A confirmation email has been sent to your inbox.
                  </p>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="p-5 bg-red-50 border-2 border-red-400 rounded-lg">
              <div className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-red-600 shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="font-semibold text-red-800">Error</p>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
