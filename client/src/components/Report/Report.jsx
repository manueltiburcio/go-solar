import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Divider
} from '@mui/material';
import Provided from './Provided.jsx';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import BarChart from './BarChart.jsx';

const classes = {
  bar: {
    marginTop: '30px',
    flexGrow: 1,
  }
}


function Report({ formData, solarData }) {

  const [userData, setUserData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
      label: "Wh",
      data: solarData.outputs.map((item) => item.wh),
      backgroundColor: [
        "rgba(75,192,192,1)",
        "#04333f",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0",
        "#2a71d0",
        "#2a71d0",
        "#2a71d0",
        "#2a71d0",
        "#2a71d0",
        "#2a71d0",
        "#2a71d0",
      ],
    }],
  });

  return (
    <Box sx={classes.bar} width='800px'>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Results
              </Typography>
              <Typography gutterBottom variant='body1' component='div'>
                Solar panel capacity:
              </Typography>
              <BarChart chartData={userData} />
            </CardContent>
            <CardActions>
              <Button size='small' startIcon={<SaveAltIcon />}>Save to PDF</Button>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Card>


        </Grid>
        <Grid item xs={4}>

          <Card>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Data Provided
              </Typography>
              <Provided formData={formData} />
            </CardContent>
          </Card>



        </Grid>

      </Grid>
    </Box>
  );
}

export default Report;