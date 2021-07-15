import React,{Component} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';

import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ListItem, ListItemText } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Face from '@material-ui/icons/Face';

const ListItemLink=(props)=>{
    return <ListItem button component={RouterLink} {...props}/>
}

class Sidebar extends Component{
    render(){
        return(
            <List>
                <ListItemLink to="/admin">
                    <ListItemIcon >
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItemLink >
                <ListItemLink to="/admin/posts">
                    <ListItemIcon >
                        <FileCopyIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Posts"/>
                </ListItemLink>
                <ListItemLink to="/admin/users">
                    <ListItemIcon >
                        <Face/>
                    </ListItemIcon>
                    <ListItemText primary="Users"/>
                </ListItemLink>
            </List>
        )
    }
}

export default Sidebar;