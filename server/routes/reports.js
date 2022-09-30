const express = require('express');
const router = express.Router();
const { getReports, createReport, deleteReport } = require('../controllers/reports');

router.post('/', getReports);

router.post('/create', createReport);

router.delete('/:id', deleteReport)

module.exports = router;