import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

const classes = {
  location: {
    backgroundColor: "rgba(75,192,192,1)",
  },
  bill: {
    backgroundColor: "#04333f",
  },
  energy: {
    backgroundColor: "#f3ba2f",
  }
}

function Provided({ reportData }) {
  console.log(reportData);
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={classes.location}>
            <LocationOnIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Location' secondary={reportData.address} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={classes.bill}>
            <AttachMoneyIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Monthly bill" secondary={'$ USD ' + reportData.cost} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={classes.energy}>
            <ElectricBoltIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Energy Consumption" secondary={'kWh ' + reportData.kwh} />
      </ListItem>
    </List>
  );
}

export default Provided;