import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route, Link } from "react-router-dom";
import Container from '@mui/material/Container';
import Create from './components/Reports/Create';
import Reports from './components/Reports/Reports';
import Layout from './components/Layout';
import Login from './components/Login/Login.jsx';
import SignUp from './components/Login/SignUp.jsx';
import Solar500 from './data/Solar500.js';
import FinalSolar from './data/FinalSolar.js';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
});

const classes = {
  root: {
    display: 'flex',
  }
}

function App() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: '',
    cost: '',
    kwh: '',
  });
  const [location, setLocation] = useState({
    lat: 33.5890841,
    lon: -117.7171232,
  });

  const [reportData, setReportData] = useState({
    userEmail: '',
    outputs: [],
    address: '16  Hawksmoor',
    cost: '144',
    kwh: '60',
    trees: '',
    initialPrediction: 0,
    kwhConsumption: 0,
    monthlyBill: 0,
    kwhYear: 0,
    solarSize: 0,
    costkWh: 0,
    annualSolar: 0,
    panel300Qty: 0,
    panel500Qty: 0,
    inverter1kwQty: 0,
    inverter3kwQty: 0,
  })

  const [loginData, setLoginData] = useState({
    loginEmail: '',
    loginPassword: '',
  })

  const [signData, setSignData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })


  const [reportsList, setReportsList] = useState([]);

  const [report, setReport] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { address, kwh, cost } = formData;
  const { loginEmail, loginPassword } = loginData;
  const { firstName, lastName, email, password } = signData;
  const { lat, lon } = location;

  function sumAll() {
    let initialPrediction = 0;

    // initial 500 to check how much is left to pay using monthly bill and energy monthly
    Solar500.outputs.forEach((item) => {
      initialPrediction += item.wh;
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

    // initial 500 to check how much is left to pay using monthly bill and energy monthly
    FinalSolar.outputs.forEach((item) => {
      annualSolar += item.wh;
    })

    // convert to kWh
    annualSolar = annualSolar / 1000;
    annualSolar = annualSolar * costkWh;

    let panel300Qty = Math.ceil(solarSize / 300);
    let panel500Qty = Math.ceil(solarSize / 500);

    let inverter1kwQty = Math.ceil(solarSize * 0.82 / 1000);
    let inverter2kwQty = Math.ceil(solarSize * 0.82 / 3000);

    let trees = Math.floor(solarSize * 180 / 7000);


    setReportData({
      outputs: FinalSolar.outputs,
      address: '16  Hawksmoor',
      cost: '144',
      kwh: '60',
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
      inverter2kwQty,
    })

  }

  useEffect(() => {
  }, []);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    searchUser();
    let data = await getUserReports(loginEmail);
    if (data) {
      setLoading(false);
      setReportsList(data);
    }
  }

  const handleChangeLogin = (e) => {
    e.preventDefault();
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmitSign = (e) => {
    e.preventDefault();
    setSignData({
      firstName,
      lastName,
      email,
      password,
    });
    createUser();
    navigate('/');
  }
  const handleChangeSign = (e) => {
    setSignData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleReportSubmit = async (e) => {
    e.preventDefault();

    await createUserReport();
    let newReport = await getUserReports(loginEmail);

    setReportsList(newReport);
    navigate('/reports');

  }

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const createUserReport = async () => {

    // let geo = await getLocation(formData.address);

    //let eng = await getData(location.lat, location.lon, 500);

    let initialPrediction = 0;

    // initial 500 to check how much is left to pay using monthly bill and energy monthly
    Solar500.outputs.forEach((item) => {
      initialPrediction += item.wh;
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

    //let finalPred = await getData(location.lat, location.lon, solarSize);

    // cost of kwh
    let costkWh = monthlyBill / kwhConsumption;

    let annualSolar = 0;

    // initial 500 to check how much is left to pay using monthly bill and energy monthly
    FinalSolar.outputs.forEach((item) => {
      annualSolar += item.wh;
    })

    // convert to kWh
    annualSolar = annualSolar / 1000;
    annualSolar = annualSolar * costkWh;

    let panel300Qty = Math.ceil(solarSize / 300);
    let panel500Qty = Math.ceil(solarSize / 500);

    let inverter1kwQty = Math.ceil(solarSize * 0.82 / 1000);
    let inverter3kwQty = Math.ceil(solarSize * 0.82 / 3000);

    let trees = Math.floor(solarSize * 180 / 7000);


    let data = {
      userEmail: loginEmail,
      outputs: FinalSolar.outputs,
      address: '21402 Arborwood, Lake Forest',
      cost: 144,
      kwh: 60,
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
    }


    await axios.post('http://localhost:5000/reports/create', data);
    alert('created report');
  }

  const getUserReports = async (email) => {
    let response = await axios.post('http://localhost:5000/reports', { userEmail: email });
    return response.data;
  }

  const handleDelete = async (id) => {
    let response = await axios.delete(`http://localhost:5000/reports/${id}`,);
    let updateReports = await getUserReports(loginEmail);

    setReportsList(updateReports);
  }

  const getData = async (lat, lon, wp) => {

    const options = {
      method: 'GET',
      url: 'https://solarenergyprediction.p.rapidapi.com/v2.0/solar/estimation',
      params: {
        lat,
        lon,
        wp,
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

    return response.data;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const searchUser = async () => {
    let response = await axios.post('http://localhost:5000/users', { email: loginEmail, password: loginPassword });
    if (response.data.name) {
      setUserName(response.data.name);
      setLoggedIn(true);
      navigate('/reports');
    }
  }



  const createUser = async () => {
    let response = await axios.post('http://localhost:5000/users/create', {
      firstName,
      lastName,
      email,
      password,
    });
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
    return response.data;
  }


  return (
    <ThemeProvider theme={theme}>
      <Layout userName={userName} loggedIn={loggedIn}>
        <Routes>
          <Route path="/" element={<Login handleSubmitLogin={handleSubmitLogin} handleChangeLogin={handleChangeLogin} loginData={loginData} />} />
          <Route path="/signup" element={<SignUp handleSubmitSign={handleSubmitSign} handleChangeSign={handleChangeSign} signData={signData} />} />
          <Route path="/create" element={<Create formData={formData} handleChange={handleChange} handleReportSubmit={handleReportSubmit} />} />
          <Route path="/reports" element={<Reports reportsList={reportsList} formData={formData} reportData={reportData} loading={loading} handleDelete={handleDelete} />} />
        </Routes>
      </Layout>
    </ThemeProvider >

  );
}

export default App;
