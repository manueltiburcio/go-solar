import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FinalSolar from '../../data/FinalSolar.js';
import Container from '@mui/material/Container';
import ReportCard from '../ReportCard.jsx';
import solarData from '../../data/Solar.js';

function Reports({ formData, reportData }) {
  const [reportsList, setReportsList] = useState([]);
  const [reports, setReports] = useState([FinalSolar]);

  console.log('reportData', reportData);


  const handleDelete = async (month) => {
    const newReports = reports.filter((report) => report.month !== month);
    setReports(newReports);
  }



  return (
    <Container>
      <Grid container>
        {reports.map((item) => {
          let id = Math.random();
          return <Grid key={id}>
            <ReportCard
              report={item}
              solarData={solarData}
              formData={formData}
              reportData={reportData}
              handleDelete={handleDelete}
            ></ReportCard>
          </Grid>
        })}
      </Grid >
    </Container>
  )
}

export default Reports