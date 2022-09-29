const Report = require('../models/report');

const getReports = async (req, res) => {
  const reports = await Report.find();

  res.status(200).json(reports);
}

const createReport = async (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ message: 'please add something' });
    return;
  }

  const report = await Report.create({
    text: req.body.text,
  })

  res.status(200).json(report);
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