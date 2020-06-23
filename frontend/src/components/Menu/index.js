// @Vendors
import React from 'react'

// @Components
import ItemMenu from './ItemMenu'

// @Statics > Styless
import './index.scss'

const publicItems = [
    { url: "/acceder", label:"Iniciar Sesión" },
    { url: "/crear-cuenta", label:"Crear cuenta" }
]

function index({ user = {}, logout = () => console.log("First login") } = {}) {
    return (
        <div className="menu">
            <ul className="menu__list">
                {
                    !user.isAuthenticated ? publicItems.map(({url, label}) => (
                        <ItemMenu key={url} url={url} label={label}/>
                    ))
                    : (
                        <div className="user--profiles">
                            <div className="btnClose--session item--menu app--text">
                                {user.username}
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