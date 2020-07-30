import React, {Fragment} from 'react';
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader'
import Collapse from '@material-ui/core/Collapse'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

// @Icons - @Material UI
import AlarmIcon from '@material-ui/icons/Alarm';
import ExpandLess from '@material-ui/icons/ExpandLess'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import ExpandMore from '@material-ui/icons/ExpandMore'
import LoopIcon from '@material-ui/icons/Loop';
import CategoryIcon from '@material-ui/icons/Category';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import Grid from '@material-ui/core/Grid'

// @Statics > Logos
import LogoSemilleros from 'statics/images/logos/juventud.png'

// @Hooks 
import useWindowWidth from 'hooks/useWindowWidth'


let drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background:"#fff",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    "& svg": {
      color: "#777"
    }
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "rgb(73, 89, 117)",
    color: "#fff",
    "& .MuiListItemIcon-root": {
      color: "#fff"
    }
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'center',
    minHeight: "300px",
    height: "auto",
    position: "relative", 
    padding: "20px",
    boxSizing:"border-box"
  },
  content: {
    flexGrow: 1,
    padding: "34px 0 0 0",
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
     [theme.breakpoints.down('sm')]: {
      margin: "0"
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  nested: {
    paddingLeft: "44px"
  },
  heightHeader: {
    height: "64px"
  }
}));

const BoxIcon = styled.div`
  width: 100%;
    padding: 20px 30px 0 5px;
    box-sizing: border-box;
    max-width: 100%;
    max-height: 100%;
    img {
      float: left;
      width: 100%;
      height: 100%;
    }
`

function LeftMenu({ history, children, menu }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const [openList, setOpenList] = React.useState(false)


  const {width} = useWindowWidth()

  React.useEffect(() => {
    if (width !== 0 &&  width < 720) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [width, setOpen])

  const prefix = "/admin"
  const link = (href) => {
    history.push(`${prefix}${href}`)
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpenList(!openList)
  }

	return (
    <Fragment>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Grid container maxwidth="md" spacing={1} alignItems="center" justify="space-between">
            <Grid item sm={6}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>

              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerClose}
                edge="start"
                className={clsx(classes.menuButton, !open && classes.hide)}
              >
                <ChevronLeftIcon />
              </IconButton>
            </Grid>
            <Grid item sm={6}>
              {menu}
            </Grid>

          </Grid>

        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <BoxIcon>
              <img src={LogoSemilleros} alt="logo"/>
          </BoxIcon>
        </div>
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
            <ListItem button onClick={() => link("/periodos")}>
                <ListItemIcon>
                  <AlarmIcon/>
                </ListItemIcon>
                <ListItemText primary="Períodos" />
            </ListItem>

            <ListItem button onClick={() => link("/fases")}>
                <ListItemIcon>
                  <LoopIcon/>
                </ListItemIcon>
                <ListItemText primary="Fases" />
            </ListItem>

            <ListItem button onClick={() => link("/categorias")}>
                <ListItemIcon>
                  <CategoryIcon/>
                </ListItemIcon>
                <ListItemText primary="Categorías" />
            </ListItem>
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <SupervisedUserCircleIcon/>
              </ListItemIcon>
              <ListItemText primary="Administración" />
              {openList ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button onClick={() => link("/usuarios")} className={classes.nested}>
                    <ListItemIcon>
                      <PeopleAltIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" />
                  </ListItem>
                <ListItem button onClick={() => link("/videos")} className={classes.nested}>
                    <ListItemIcon>
                      <OndemandVideoIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Videos" />
                  </ListItem>
              </List>
            </Collapse>
            </List>
            <Divider />
      </Drawer>

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.heightHeader}/>
          {children}
        </main>
      </Fragment>
	)
}

export default withRouter(React.memo(LeftMenu))