// @Vendors
import React from 'react'

import ItemMenu from './ItemMenu'

import './index.scss'

const items = [
    { url: "/registro", label:"Crear cuenta" },
    { url: "/login", label:"Iniciar Sesión" },
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