const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  disability: { type: Boolean, default: false },
  price: { type: Number, required: true }
});

const ticketSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  trainId: { type: String, required: true },
  trainInfo: {
    name: String,
    from: String,
    to: String,
    basePrice: Number
  },
  slotDate: { type: Date, required: true },
  slotTime: { type: String, required: true },
  passengers: [passengerSchema],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const ticketModel = mongoose.model('ticket', ticketSchema);

module.exports = ticketModel;