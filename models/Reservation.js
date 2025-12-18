import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      minlength: [10, "Phone number must be at least 10 characters"]
    },
    date: {
      type: String, // YYYY-MM-DD format
      required: [true, "Date is required"],
      validate: {
        validator: function(v) {
          return /^\d{4}-\d{2}-\d{2}$/.test(v);
        },
        message: "Date must be in YYYY-MM-DD format"
      }
    },
    time: {
      type: String,
      required: [true, "Time is required"],
      enum: [
        '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
        '20:00', '20:30', '21:00', '21:30', '22:00', '22:30',
        '23:00', '23:30', '00:00', '00:30', '01:00'
      ]
    },
    guests: {
      type: Number,
      required: [true, "Number of guests is required"],
      min: [1, "At least 1 guest required"],
      max: [6, "Maximum 6 guests allowed per reservation"]
    },
    specialRequests: {
      type: String,
      default: '',
      maxlength: [500, "Special requests cannot exceed 500 characters"]
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled', 'completed'],
      default: 'confirmed'
    },
    tableNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 20
    }
  },
  {
    timestamps: true 
  }
);


ReservationSchema.index({ date: 1, status: 1 });
ReservationSchema.index({ email: 1 }); 
ReservationSchema.index({ date: 1, time: 1 }); 

export default mongoose.models.Reservation || 
  mongoose.model("Reservation", ReservationSchema);

