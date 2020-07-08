// @Vendors
import React from 'react'
import {withRouter} from 'react-router-dom'

// @Components
import ItemMenu from './ItemMenu'
import avatar from 'statics/images/logos/avatar_2x.png'
import Button from '@material-ui/core/Button'
// @Statics > Styless
import './index.scss'

const publicItems = [
    { url: "/acceder", label:"Iniciar Sesión" },
    { url: "/crear-cuenta", label:"Crear cuenta" }
]

function index({ user = {}, logout = () => console.log("First login"), history, ...rest} = {}) {
    return (
        <div className="menu" {...rest}>
            <ul className="menu__list">
                {
                    !user.isAuthenticated ? publicItems.map(({url, label}) => (
                        <ItemMenu key={url} url={url} label={label}/>
                    ))
                    : (
                        <div className="user--profiles">
                            <Button variant="outlined" style={{borderColor:"#fff"}} onClick={() => history.push("/perfil")}>
                                <div className="btn--perfil app--text" style={{color:"#fff"}}>
                                    <span>
                                        <div id="app--avatar"><img src={avatar} alt={avatar} /></div>
                                    </span>
                                    <span>{user.username}</span>
                                </div>
                            </Button>
                            <Button variant="outlined" onClick={() => logout()} style={{borderColor:"#fff", color:"#fff"}}>
                                <span className="app--text">Cerrar sesión</span>
                            </Button>
                        </div>
                    )
                }
            </ul>
        </div>
    )
}

export default withRouter(React.memo(index))