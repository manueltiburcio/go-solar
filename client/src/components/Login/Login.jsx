import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography, Container, Link, Grid, Card, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import videoBg from '../../assets/videoBg.mov';
import { Fade } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        Go Solar
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const classes = {
  main: {
    overflowY: 'hidden',
    overflowX: 'hidden',
  },
  navigate: {
    cursor: 'pointer',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: '5',
    backgroundColor: 'rgba(0,0,0,.4)',
  },
  form: {
    borderRadius: 1,
    backgroundColor: '#fff6e5',
    padding: 10,
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifiyContent: 'center',
    flexDirection: 'column',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '5',
    overflowY: 'hidden',
    overflowX: 'hidden',
    transition: 'ease-in',
  }
}

export default function Login({ handleSubmitLogin, handleChangeLogin, loginData }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [delay, setDelay] = useState(false);
  const [titleDelay, setTitleDelay] = useState(false);

  const { loginEmail, loginPassword } = loginData;

  useEffect(() => {
    setTimeout(() => {
      setDelay(true);
    }, 500)
    setTimeout(() => {
      setDelay(true);
    }, 800)
  }, []);

  return (
    <div sx={classes.main}>
      <div className={classes.overlay}></div>
      <video className={classes.video} src={videoBg} autoPlay loop muted />

      <Fade in={titleDelay}>
        <Typography variant='body2' color='textSecondary'>Calculate your savings using solar energy</Typography>
      </Fade>

      <Fade in={delay}>

        <Box sx={classes.form} variant='outlined'>
          <Avatar sx={{ m: 1, bgcolor: '#2E3B55' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmitLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="loginEmail"
              label="Email Address"
              name="loginEmail"
              autoComplete="email"
              autoFocus
              onChange={handleChangeLogin}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="loginPassword"
              label="Password"
              type="password"
              id="loginPassword"
              autoComplete="current-password"
              onChange={handleChangeLogin}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  sx={classes.navigate}
                  variant="body2"
                  textAlign='right'
                  onClick={() => navigate('/signup')}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 4 }} />
        </Box>
      </Fade>



    </div>
  );
}