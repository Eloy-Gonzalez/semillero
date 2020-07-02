import React from 'react'
import styled from 'styled-components'

import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import {withRouter} from 'react-router-dom'

// @Material UI
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListSubheader from '@material-ui/core/ListSubheader'
import Collapse from '@material-ui/core/Collapse'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
// @Material UI > Icons
import AlarmIcon from '@material-ui/icons/Alarm';
import ExpandLess from '@material-ui/icons/ExpandLess'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import ExpandMore from '@material-ui/icons/ExpandMore'
import LoopIcon from '@material-ui/icons/Loop';
import CategoryIcon from '@material-ui/icons/Category';

// @Statics > Logos
import LogoSemilleros from 'statics/images/logos/juventud.png'

const drawerWidth = 250

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
    nested: {
    paddingLeft: theme.spacing(4),
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}))

const Menu = styled.div`
	border-right: solid 2px #999;
	grid-row: 1 / 3;

	@media (max-width: 720px) {
		display:none;
	}
`

const BoxIcon = styled.div`
	width: 100%;
    padding: 20px 30px 0 5px;
    box-sizing: border-box;
    max-height: 200px;
    img {
    	float: left;
	    width: 100%;
	    height: 100%;
    }
`


function LeftMenu({ history }) {
	const classes = useStyles()
	const [open, setOpen] = React.useState(false)
	const handleClick = () => {
		setOpen(!open)
	}
	
	const href= (location) => {
		history.push(location)
	}

	return (
		<Menu>
			<Drawer
		        className={classes.drawer}
		        variant="permanent"
		        classes={{
		          paper: classes.drawerPaper,
		        }}
		        anchor="left"
		      >
		        <BoxIcon>
		        	<img src={LogoSemilleros} alt="logo"/>
		        </BoxIcon>
		        <div className={classes.toolbar} />
		        <Divider />
		        <List
		        	component="nav"
		        	aria-labelledby="nested-list-subheader"
		        	subheader={
		        		<ListSubheader component="div" id="nested-list-subheader">
				          Listado de opciones
				        </ListSubheader>
				    }
		        >
			      <ListItem button onClick={() => href("periodos/")}>
			        <ListItemIcon>
			          <AlarmIcon/>
			        </ListItemIcon>
			        <ListItemText primary="Períodos" />
			      </ListItem>
			      <ListItem button onClick={() => href("/fases")}>
			        <ListItemIcon>
			          <LoopIcon/>
			        </ListItemIcon>
			        <ListItemText primary="Fases" />
			      </ListItem>
			      <ListItem button onClick={() => href("/categorias")}>
			        <ListItemIcon>
			          <CategoryIcon/>
			        </ListItemIcon>
			        <ListItemText primary="Categorías" />
			      </ListItem>
			      <ListItem button onClick={() => href("/")} onClick={handleClick}>
			        <ListItemIcon>
			          <SupervisorAccountIcon/>
			        </ListItemIcon>
			        <ListItemText primary="Administración" />
			        {open ? <ExpandLess /> : <ExpandMore />}
			      </ListItem>
			      <Collapse in={open} timeout="auto" unmountOnExit>
			        <List component="div" disablePadding>
				        <ListItem button onClick={() => href("/usuarios")} className={classes.nested}>
			            	<ListItemIcon>
			              	<PeopleAltIcon/>
			            	</ListItemIcon>
			            	<ListItemText primary="Usuarios" />
			          	</ListItem>
			        </List>
			      </Collapse>
		        </List>
		        <Divider />
		    </Drawer>
		</Menu>
	)
}

export default withRouter(LeftMenu)