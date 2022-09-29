import React, { useState } from 'react';
import { Avatar, Container, Grid, Card, CardHeader, CardContent, CardActions, Typography, IconButton, Box, Divider, Button } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import BarChart from './Report/BarChart';
import Provided from './Report/Provided';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';


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
    fontSize: 14,
    marginTop: 1,
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
    padding: 5,
  },
  grid4: {
    bottom: 20,
  },
  powerIcon: {
    backgroundColor: '#f3ba2f',
  },
  meterIcon: {
    backgroundColor: '#50AF95',
  }
}

function ReportCard({ formData, report, reportData, handleDelete }) {
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


  return (
    <Container sx={classes.root}>
      <Card sx={classes.card} elevation={3}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, md: 2, xs: 3 }}>
          <Grid sx={classes.grid1} xs={6}>
            {/* 1 */}
            <Card variant='outlined'>
              <CardHeader
                sx={classes.cardHeader}
                title='Results'
              />
              <Typography sx={classes.cardContent} variant='h6' component='div'>
                Solar panel capacity: {reportData.solarSize} wh
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
                  <IconButton sx={classes.deleteBtn} onClick={() => handleDelete(report.month)}>
                    <DeleteOutline />
                  </IconButton>
                </Typography>
                <Provided reportData={reportData} />
              </CardContent>
            </Card>

            <Card variant='outlined'>
              <CardContent>
                <Typography variant='h5' component='div'>
                  Annual Savings USD$ {Number(reportData.annualSolar).toFixed(2)}
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
                <Typography variant='h5' component='div'>
                  Design of your solar system
                </Typography>



                <Grid container spacing={2} columns={16}>

                  <Grid item xs={8}>
                    <CardHeader
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
                          {reportData.panel300Qty} panels of 300Wp
                        </Typography>
                      </Grid>
                      <Divider orientation="vertical" flexItem>
                        or
                      </Divider>
                      <Grid item xs>
                        <Typography variant='body2' component='div'>
                          {reportData.panel500Qty} panels of 500Wp
                        </Typography>
                      </Grid>
                    </Grid>








                  </Grid>



                  <Grid item xs={8}>

                    <CardHeader
                      avatar={
                        <Avatar
                          sx={classes.meterIcon}
                          variant='square'
                        ><ElectricMeterIcon /></Avatar>
                      }
                      title={'Quantity of inverters you would need'}
                    />


                    <Grid container>
                      <Grid item xs>
                        <Typography variant='body2' component='div'>
                          {reportData.inverter1kwQty} inverters of <br></br>1 kW
                        </Typography>
                      </Grid>
                      <Divider orientation="vertical" flexItem>
                        or
                      </Divider>
                      <Grid item xs>
                        <Typography variant='body2' component='div'>
                          {reportData.inverter2kwQty} inverters of <br></br>2 kW
                        </Typography>
                      </Grid>
                    </Grid>


                  </Grid>

                </Grid>

                <Typography textAlign='center' variant='caption' color='textSecondary' component='div'>
                  Assuming 18% of DC energy loss
                </Typography>
                <Typography textAlign='center' variant='caption' color='textSecondary' component='div'>
                  Typical solar panels and inverters sizes
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={6} sx={classes.grid4}>
            {/* ITEM 4  */}
          </Grid>
        </Grid>
        <CardActions>
          <Typography textAlign='center' variant='caption' color='textSecondary' component='div'>
            Report created on {reportData.createdAt}
          </Typography>
          <br></br>
          <Button size='small' color='secondary' startIcon={<SaveAltIcon />}>Save to PDF</Button>
          <Button size='small' color='secondary' >Learn More</Button>
        </CardActions>
      </Card>
    </Container>
  )
}

export default ReportCard