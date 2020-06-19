// @Vendors
import React from 'react'

import ItemMenu from './ItemMenu'

import './index.scss'

const items = [
    { url: "/login", label:"Iniciar Sesión" },
    { url: "/registro", label:"Crear cuenta" }
]

function index() {
    return (
        <div className="menu">
            <ul className="menu__list">
                {
                    items.map(({url, label}) => (
                        <ItemMenu url={url} label={label}/>
                    ))
                }
            </ul>
        </div>
    )
}

export default React.memo(index)