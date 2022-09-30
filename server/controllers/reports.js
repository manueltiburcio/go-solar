const Report = require('../models/report');

const getReports = async (req, res) => {

  const { userEmail } = req.body;



  if (!req.body.userEmail) {
    res.status(400).json({ message: 'please add something' });
    return;
  }



  const reports = await Report.find({ userEmail }).exec();

  if (reports.length > 0) {
    return res.status(200).json(reports);
  } else {
    return res.status(200).json({ message: 'no reports on user' });
  }


}

const createReport = async (req, res) => {
  console.log('test');

  const {
    userEmail,
    outputs,
    address,
    cost,
    kwh,
    trees,
    initialPrediction,
    kwhConsumption,
    monthlyBill,
    kwhYear,
    solarSize,
    costkWh,
    annualSolar,
    panel300Qty,
    panel500Qty,
    inverter1kwQty,
    inverter3kwQty,
  } = req.body;

  console.log(req.body);

  if (!req.body.userEmail) {
    res.status(400).json({ message: 'please add something' });
    return;
  }

  const report = await Report.create({
    userEmail,
    outputs,
    address,
    cost,
    kwh,
    trees,
    initialPrediction,
    kwhConsumption,
    monthlyBill,
    kwhYear,
    solarSize,
    costkWh,
    annualSolar,
    panel300Qty,
    panel500Qty,
    inverter1kwQty,
    inverter3kwQty,
  })

  res.status(201).json(report);
}


const deleteReport = async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ message: 'please add id' });
    return;
  }
  const report = await Report.findById(req.params.id);
  await report.remove();

  res.status(200).json({ id: req.params.id });
}

module.exports = {
  getReports,
  createReport,
  deleteReport,
}