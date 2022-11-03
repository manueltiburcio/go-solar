import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';


const classes = {
  title: {
    color: '#404040',
    textDecoration: 'underline',
  },
  paper: {
    width: '600px',
    heigh: '800px',
    padding: 5,
    backgroundColor: 'transparent',
  },
  field: {
    marginTop: 5,
    marginBottom: 5,
    display: 'block'
  },
  address: {
    color: 'black',
    marginTop: 2,
    width: '30vw',
  },
  bill: {
    marginTop: 4,
  },
  energy: {
    marginTop: 4,
    marginLeft: 4,
  },
  control: {
    marginBottom: 2,
    display: 'block'
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    boxShadow: 'purple'
  },
  btn: {
    marginTop: 2,
  }
}

function Create({ formData, handleChange, handleReportSubmit, open, setOpen }) {

  const { address, kwh, cost } = formData;
  const [category, setCategory] = useState('solar');





  return (
    <Container>


      <Paper variant='outlined' sx={classes.paper}>
        <Typography
          sx={classes.title}
          variant='h6'
          component='h2'
          color='textSecondary'
          gutterBottom
        >Create a New Savings Report</Typography>

        <form noValidate onSubmit={handleReportSubmit}>

          <TextField
            sx={classes.address}
            required
            label='Address'
            type="text"
            id='address'
            name='address'
            helperText="Enter your full address"
            variant='filled'
            color='secondary'
            onChange={handleChange}
          />
          <br></br>

          <TextField
            sx={classes.bill}
            required
            label='Monthly Bill'
            type="number"
            id='cost'
            name='cost'
            size='small'
            variant='outlined'
            color='secondary'
            value={cost}
            helperText="Enter your electricty bill"
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position='start'>$</InputAdornment>
            }}

            onChange={handleChange}
          />

          <TextField sx={classes.energy}
            required
            label='Energy Monthly'
            type="number"
            id='kwh'
            name='kwh'
            size='small'
            variant='outlined'
            color='secondary'
            helperText="Enter your energy consumption"
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position='start'>kWh</InputAdornment>
            }}
          />

          {/* PENDING
        <FormControl sx={classes.control} >
          <FormLabel>Report Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value='solar' control={<Radio />} label='Solar Only' />
            <FormControlLabel value='ev' control={<Radio />} label='EV' />
          </RadioGroup>
        </FormControl> */}

          <br></br>

          <Button
            sx={classes.btn}
            type='submit'
            color='secondary'
            variant='contained'
            disabled={kwh ? false : true}
            endIcon={<KeyboardArrowRightIcon />}
          >Submit</Button>
        </form>
      </Paper>
    </Container >
  )
}

export default Create