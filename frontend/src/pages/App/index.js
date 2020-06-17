import React from 'react'

// @Components
import Home from 'pages/Home'
import Login from 'pages/login'
import PrivateRoute from './Routes/PrivateRoute'

function index() {
    return (
        <React.Fragment>
            <PrivateRoute exact path="/" alias="Inicio" component={Home} />
        </React.Fragment>
    )
}

export default React.memo(index)