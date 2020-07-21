// @Vendors
import React, {Fragment} from 'react'
import {withRouter} from 'react-router-dom'

import styled from 'styled-components'

// @Components
import ItemMenu from './ItemMenu'
import Avatar from 'components/Avatar'
import Button from '@material-ui/core/Button'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// @Statics > Styles
import './index.scss'

const publicItems = [
    { url: "/acceder", label:"Iniciar Sesión" },
    { url: "/crear-cuenta", label:"Crear cuenta" }
]

const AvatarSettings = styled.div`
    display:grid;
    grid-template-columns: 35px 35px;
    justify-content:center;
    align-items: center;
    gap:10px;
    margin: auto;
    p {
        color: #fff;
        font-size: 20px;
    }
    svg {
        color: #fff
    }
`

function MenuC({ user = {}, logout = () => console.log("First login"), history, admin =false, ...rest}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
        <div className="menu">
            <ul className="menu__list">
                {
                    !user.isAuthenticated ? publicItems.map(({url, label}) => (
                        <ItemMenu key={url} url={url} label={label}/>
                    ))
                    : (
                        <div className="user--profiles">
                            <Button variant="outlined" style={{borderColor:"#fff"}} onClick={() => history.push("/perfil")}>
                                <div className="btn--perfil app--text" style={{color: admin ? "#777" : "#fff"}}>
                                    <Avatar />
                                    <span>{user.username}</span>
                                </div>
                            </Button>
                            <Button variant="outlined" onClick={() => logout()} style={{borderColor:"#fff", color: admin ? "#777" : "#fff"}}>
                                <span className="app--text">Cerrar sesión</span>
                            </Button>
                        </div>
                    )
                }
            </ul>
        </div>
        <div className="responsive-menu">
            <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
            style={{borderRadius: "10px"}}
            >
                <AvatarSettings>
                <Avatar width="45px" height="45px" />
                <ExpandMoreIcon />
                </AvatarSettings>
            </IconButton>
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            {!user.isAuthenticated ? publicItems.map(({url, label}) => (
                <MenuItem key={url} onClick={() => {
                    history.push(url)
                    handleClose()
                }}>
                    {label}
                </MenuItem>
            )) : 
                <div>
                    <MenuItem onClick={() => {
                        history.push("/perfil")
                        handleClose()
                    }}>Datos del perfil</MenuItem>
                    <MenuItem onClick={() => {
                        logout()
                        handleClose()
                    }}>Cerrar sesión</MenuItem>
                </div>
            }
            </Menu>
        </div>
        </Fragment>
    )
}

export default withRouter(React.memo(MenuC))