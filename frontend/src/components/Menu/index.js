// @Vendors
import React from 'react'

// @Components
import ItemMenu from './ItemMenu'
import avatar from 'statics/images/logos/avatar_2x.png'

// @Statics > Styless
import './index.scss'

const publicItems = [
    { url: "/acceder", label:"Iniciar Sesión" },
    { url: "/crear-cuenta", label:"Crear cuenta" }
]

function index({ user = {}, logout = () => console.log("First login"), ...rest} = {}) {
    return (
        <div className="menu" {...rest}>
            <ul className="menu__list">
                {
                    !user.isAuthenticated ? publicItems.map(({url, label}) => (
                        <ItemMenu key={url} url={url} label={label}/>
                    ))
                    : (
                        <div className="user--profiles">
                            <div className="btnClose--session btn--perfil item--menu app--text">
                                <span>
                                    <div id="app--avatar"><img src={avatar} alt={avatar} /></div>
                                </span>
                                <span>{user.username}</span>
                            </div>
                            <button className="btnClose--session item--menu app--text" onClick={logout}>
                                Cerrar sesión
                            </button>
                        </div>
                    )
                }
            </ul>
        </div>
    )
}

export default React.memo(index)