import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Report from './Report/Report.jsx';
import { Paper, Box, Stack, TextField, InputAdornment, Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Solar500 from '../data/Solar500.js';
import FinalSolar from '../data/FinalSolar.js';
import solarData from '../data/Solar.js';

const classes = {
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

function Form() {
  const [formData, setFormData] = useState({
    address: '16 Hawksmoor',
    kwh: 443,
    cost: 120,
  });
  const [location, setLocation] = useState({
    lat: 33.5890841,
    lon: -117.7171232,
  });

  const [reportData, setReportData] = useState({
    initialPrediction: 0,
    kwhConsumption: 0,
    monthlyBill: 0,
    kwhYear: 0,
    solarSize: 0,
    costkWh: 0,
    annualSolar: 0,
  })

  const [report, setReport] = useState(false);

  const { address, kwh, cost } = formData;
  const { lat, lon } = location;

  function sumAll() {
    let initialPrediction = 0;
    let counter = 0;

    // initial 500 to check how much is left to pay using monthly bill and energy monthly
    Solar500.outputs.forEach((item) => {
      initialPrediction += item.wh;
      counter++;
    })

    // monthly energy used
    let kwhConsumption = 443;

    // monthly electricty bill
    let monthlyBill = 120;

    // yearly energy used
    let kwhYear = kwhConsumption * 12;


    // divide initial by 1000 to convert from wh to kWh
    let solarSize = kwhYear / (initialPrediction / 1000) * 500;
    solarSize = Math.ceil(solarSize);

    // cost of kwh
    let costkWh = monthlyBill / kwhConsumption;

    let annualSolar = 0;
    counter = 0;
    // initial 500 to check how much is left to pay using monthly bill and energy monthly
    FinalSolar.outputs.forEach((item) => {
      annualSolar += item.wh;
      counter++;
    })

    console.log('solar size \t', solarSize);
    console.log('annual solar \t', annualSolar);

    // convert to kWh
    annualSolar = annualSolar / 1000;
    annualSolar = annualSolar * costkWh;

    console.log('annaul savings', annualSolar);

    setReportData({
      initialPrediction,
      kwhConsumption,
      monthlyBill,
      kwhYear,
      solarSize,
      costkWh,
      annualSolar,
    })

  }

  useEffect(() => {
    sumAll();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setReport(prevCheck => !prevCheck);

  }

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const getData = async () => {

    const options = {
      method: 'GET',
      url: 'https://solarenergyprediction.p.rapidapi.com/v2.0/solar/estimation',
      params: {
        lat: '33.5890841',
        lon: '-117.717123',
        wp: '3034',
        deg: '34',
        az: '0',
        loss: '14'
      },
      headers: {
        'X-RapidAPI-Key': '8773cbcb94msh62d3e6b171ddb4cp1774bajsn6dc6e8b83dda',
        'X-RapidAPI-Host': 'solarenergyprediction.p.rapidapi.com'
      }

    };

    let response = await axios.request(options);

    console.log('api data', response.data);
  }

  const getLocation = async (address) => {
    const options = {
      method: 'GET',
      url: 'https://geocode-forward-and-reverse.p.rapidapi.com/forward',
      params: { address: address },
      headers: {
        'X-RapidAPI-Key': '8773cbcb94msh62d3e6b171ddb4cp1774bajsn6dc6e8b83dda',
        'X-RapidAPI-Host': 'geocode-forward-and-reverse.p.rapidapi.com'
      }
    };

    let response = await axios.request(options);

    console.log(response.data);
  }

  return (

    <Box width='600px' m={5}>
      <Paper elevation='3' sx={classes.form}>
        <form onSubmit={handleSubmit}>
          <Typography>Calculate your savings going Solar</Typography>
          <Stack spacing={4} m={3}>
            <Stack direction='column' spacing={2}>
              <TextField label='address'
                variant='outlined' required
                type="text"
                id='address'
                name='address'
                value={address}
                helperText="Enter your full address"
                onChange={handleChange}
              />
            </Stack>

            <Stack spacing={3} direction='row'>
              <TextField
                label='Monthly Bill' required
                type="text"
                id='cost'
                name='cost'
                value={cost}
                helperText="Enter your electricty bill"
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>$</InputAdornment>
                }}
              />
              <TextField
                label='Energy Monthly' required
                type="text"
                id='kwh'
                name='kwh'
                value={kwh}
                helperText="Enter your energy consumption"
                onChange={handleChange}
                InputProps={{
                  endAdornment: <InputAdornment position='start'>kWh</InputAdornment>
                }}
              />
            </Stack>
          </Stack>
          <Button type='submit' variant="contained">Submit</Button>
        </form>
      </Paper>
      {report && <Report formData={formData} solarData={solarData} reportData={reportData} />}
    </Box>

  )
}

export default Form