import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LayersIcon from '@mui/icons-material/Layers';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const MainListItems = () => {
const navigate = useNavigate();
return(
    <React.Fragment>
        <ListItemButton onClick={()=>navigate('/')}>
        <ListItemIcon>
            <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton onClick={()=>navigate('/groups')}>
        <ListItemIcon>
            <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="Groups" />
        </ListItemButton>
        <ListItemButton onClick={()=>navigate('/settings')}>
        <ListItemIcon>
            <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
        </ListItemButton>
        <ListItemButton onClick={()=>navigate('/invite')}>
        <ListItemIcon>
            <GroupAddIcon />
        </ListItemIcon>
        <ListItemText primary="Invite" />
        </ListItemButton>
        <ListItemButton onClick={()=>navigate('/signout')}>
        <ListItemIcon>
            <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
        </ListItemButton>
  </React.Fragment>
)}
