import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Drawer, Typography } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import { GiSolarPower } from 'react-icons/gi';

const drawerWidth = 240

const classes = {
  login: {
    overviewY: 'hidden',
    overviewX: 'hidden',
  },
  page: {
    width: '100%',
  },
  drawer: {
    width: drawerWidth,
    ".MuiDrawer-paper": {
      width: drawerWidth,
    },
  },
  root: {
    display: 'flex',
  },
  active: {
    backgroundColor: '#f1f1f1 !important',
  },
  title: {
    marginTop: 5,
    marginLeft: 3,
  },
  appbar: {
    backgroundColor: '#2E3B55',
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    marginBottom: 30,
  },
  toolbar: {
    marginBottom: 5,
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  avatar: {
    marginLeft: 5,
  },
  logo: {
    color: '#f3ba2f',
  }
}

function Layout({ children, loggedIn, userName }) {
  const navigate = useNavigate();
  const location = useLocation();


  const menuItems = [
    {
      text: 'My Reports',
      icon: <SubjectOutlined color='secondary' />,
      path: '/reports'
    },
    {
      text: 'Create Report',
      icon: <AddCircleOutlineOutlined color='secondary' />,
      path: '/create'
    },
  ]

  return (
    <div className={classes.root}>
      {loggedIn ?

        <>
          {/* app bar */}
          < AppBar
            sx={classes.appbar}
          >
            <Toolbar>
              <Typography sx={classes.toolbarTitle}>
                Welcome to solar savings
              </Typography>
              <Typography>
                {userName ? userName : 'Guest'}
              </Typography>
              <Avatar src={userName ? 'https://source.unsplash.com/random' : ''} sx={classes.avatar} />
            </Toolbar>
          </AppBar>

          {/* side drawer */}
          <Drawer sx={classes.drawer} variant='permanent' anchor='left'>
            <div>
              <Typography
                sx={classes.title}
                variant='h5'
              ><EnergySavingsLeafIcon sx={{ mr: 1 }} color='secondary' />Go Solar</Typography>
            </div>


            {/* list / links */}

            <List>
              {menuItems.map(item => (
                <ListItem
                  button
                  key={item.text}
                  sx={location.pathname === item.path ? classes.active : null}
                  onClick={() => navigate(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text}></ListItemText>
                </ListItem>
              ))}
            </List>

          </Drawer>

          <div className={classes.page} style={{ marginTop: 85 }}>
            <div className={classes.toolbar}></div>
            {children}
          </div>
        </>
        :



        <div className={classes.login}>
          {children}
        </div>

      }
    </div >
  )
}

export default Layout