import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Container, Grid, Card, CardHeader, CardContent, CardActions, Typography, IconButton, Box, Divider, Button } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import { DeleteOutline } from '@mui/icons-material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import BarChart from './Report/BarChart';
import Provided from './Report/Provided';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import ForestIcon from '@mui/icons-material/Forest';
import {
  exportComponentAsJPEG,
} from "react-component-export-image";


const classes = {
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '1200px',
    transitionDuration: '0.3s',
    borderRadius: 2,
    height: '100%'
  },
  cardHeader: {
    marginTop: 4,
    marginLeft: 4,
  },
  cardContent: {
    marginLeft: 4,
  },
  deleteBtn: {
    bottom: 20,
    left: 310,
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid1: {

  },
  grid2: {
    marginTop: 4,
    marginLeft: 4,
  },
  grid3: {
    padding: 4,
  },
  grid4: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 14,
    paddingBottom: 11.5,
  },
  powerIcon: {
    backgroundColor: '#f3ba2f',
  },
  meterIcon: {
    backgroundColor: '#50AF95',
  }
}

function ReportCard({ reportData, handleDelete, id }) {
  const [userData, setUserData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
      label: "Wh",
      data: reportData.outputs.map((item) => item.wh),
      backgroundColor: [
        "rgba(75,192,192,1)",
        "#04333f",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0",
      ],
    }],
  });

  const elementRef = useRef();

  useEffect(() => {

  }, []);


  return (
    <Container sx={classes.root} ref={elementRef}>
      <Card sx={classes.card} elevation={3}>
        <Grid container rowSpacing={2} columnSpacing={{ md: 2, xs: 3 }}>
          <Grid sx={classes.grid1} xs={6}>
            {/* 1 */}
            <Card variant='outlined' sx={{ pb: 1.3 }}>
              <Typography variant='h5' sx={classes.cardHeader}>Results</Typography>
              <Typography sx={classes.cardContent} variant='h6' component='div'>
                Solar panel capacity: {reportData.solarSize} Wh
              </Typography>
              <Typography sx={classes.cardContent} variant='caption' color='textSecondary'>for 100% generation using solar energy</Typography>
              <CardContent sx={classes.cardContent}>
                <BarChart chartData={userData} />
                <Typography textAlign='center' variant='caption'>*Solar production graph in a year</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={6}>
            {/* item 2 */}
            <Card variant='outlined'>
              <CardContent sx={classes.grid2}>
                <Typography variant='h5' component='div'>
                  Data Provided
                  <IconButton sx={classes.deleteBtn} onClick={() => handleDelete(id)}>
                    <DeleteOutline />
                  </IconButton>
                </Typography>
                <Provided reportData={reportData} />
              </CardContent>
            </Card>

            <Card variant='outlined' sx={{ pb: 1 }}>
              <CardContent>
                <Typography variant='h5' component='div'>
                  Annual Savings <Box sx={{ color: '#50AF95', fontWeight: 'bold', display: 'inline-block' }}>$ USD {Number(reportData.annualSolar).toFixed(2)}</Box>
                </Typography>
                <Typography variant='h7' color='textSecondary' component='div'>
                  Based on your current cost of <Box sx={{ fontWeight: 'bold', display: 'inline-block' }}>{reportData.costkWh.toFixed(2)} USD / kWh</Box>
                </Typography>
              </CardContent>
            </Card>

          </Grid>

          <Grid xs={6}>
            {/* item 3 */}
            <Card sx={classes.grid3} variant='outlined'>
              <CardContent>
                <Typography variant='h5' component='div' >
                  Design of your solar system
                </Typography>



                <Grid container spacing={2} columns={14}>

                  <Grid item xs={7} >
                    <CardHeader sx={{ mb: 1 }}
                      avatar={
                        <Avatar
                          sx={classes.powerIcon}
                          variant='square'
                        ><SolarPowerIcon /></Avatar>
                      }
                      title={'Quantity of panels you would need'}
                    />

                    <Grid container>
                      <Grid item xs>
                        <Typography variant='body2' component='div'>
                          {reportData.panel300Qty} panels <br></br> of 300Wp
                        </Typography>
                      </Grid>
                      <Divider orientation="vertical" flexItem >
                        or
                      </Divider>
                      <Grid item xs>
                        <Typography variant='body2' component='div' ml={2}>
                          {reportData.panel500Qty} panels <br></br> of 500Wp
                        </Typography>
                      </Grid>
                    </Grid>








                  </Grid>

                  <Grid item xs={7}>

                    <CardHeader sx={{ mb: 1 }}
                      avatar={
                        <Avatar
                          sx={classes.meterIcon}
                          variant='square'
                        ><ElectricMeterIcon /></Avatar>
                      }
                      title={'Quantity of inverters you would need'}
                    />


                    <Grid container mb={2}>
                      <Grid item xs>
                        <Typography variant='body2' component='div'>
                          {reportData.inverter1kwQty} inverters <br></br> of 1 kW
                        </Typography>
                      </Grid>
                      <Divider orientation="vertical" flexItem>
                        or
                      </Divider>
                      <Grid item xs>
                        <Typography variant='body2' component='div' ml={2}>
                          {reportData.inverter3kwQty} inverters <br></br> of 2 kW
                        </Typography>
                      </Grid>
                    </Grid>


                  </Grid>

                </Grid>

                <Typography textAlign='center' variant='caption' color='textSecondary' component='div'>
                  Assuming 18% of DC energy loss
                </Typography>
                <Typography textAlign='center' variant='caption' color='textSecondary' component='div'>
                  Typical solar panel and inverter sizes
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={6} >
            {/* ITEM 4  */}
            <Card variant='outlined' sx={classes.grid4}>
              <AvatarGroup total={reportData.trees}>
                <Avatar sx={{ backgroundColor: '#50AF95' }} ><ForestIcon /></Avatar>
                <Avatar sx={{ backgroundColor: '#50AF95' }}><ForestIcon /></Avatar>
                <Avatar sx={{ backgroundColor: '#50AF95' }} ><ForestIcon /></Avatar>
                <Avatar sx={{ backgroundColor: '#50AF95' }} ><ForestIcon /></Avatar>
              </AvatarGroup>
              <Typography textAlign='center' variant='h6'>This solar system offsets <br></br> carbon emission equivalent of {reportData.trees}  trees</Typography>
            </Card>
          </Grid>

        </Grid>
        <CardActions>
          <Typography textAlign='center' variant='caption' color='textSecondary' component='div'>
            Report created on {reportData.createdAt.slice(0, 10)}
          </Typography>
          <br></br>
          <Button sx={{ ml: 4 }} size='small' color='secondary' startIcon={<SaveAltIcon />}
            onClick={() => exportComponentAsJPEG(elementRef, { fileName: `${reportData.createdAt.slice(0, 10)}-report` })}
          >Download report</Button>
        </CardActions>
      </Card>
    </Container >
  )
}

export default ReportCard