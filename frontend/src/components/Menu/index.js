// @Vendors
import React from 'react'

// @Components
import ItemMenu from './ItemMenu'

// @Statics > Styles
import './index.scss'

const items = [
    { url: "/login", label:"Iniciar Sesión" },
    { url: "/register", label:"Crear cuenta" }
]

function index({ authenticated = false, logout = () => console.log("First login") } = {}) {
    return (
        <div className="menu">
            <ul className="menu__list">
                {
                    !authenticated ? items.map(({url, label}) => (
                        <ItemMenu key={url} url={url} label={label}/>
                    ))
                    : (<ItemMenu url="#" label="Cerrar sesión" onClick={logout}/>)
                }
            </ul>
        </div>
    )
}

export default React.memo(index)