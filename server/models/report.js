const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
  userEmail: String,
  createdAt: String,
  outputs: [],
  address: String,
  cost: Number,
  kwh: Number,
  trees: Number,
  initialPrediction: Number,
  kwhConsumption: Number,
  monthlyBill: Number,
  kwhYear: Number,
  solarSize: Number,
  costkWh: Number,
  annualSolar: Number,
  panel300Qty: Number,
  panel500Qty: Number,
  inverter1kwQty: Number,
  inverter3kwQty: Number,

}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);