// @Vendors
import React from 'react'

// @Pages 
import Home from 'pages/Home'
import Login from 'pages/login'

// @Routes
import PrivateRoute from './Routes/PrivateRoute'
import LoginRoute from './Routes/LoginRoute'

function index() {
    return (
        <React.Fragment>
            <PrivateRoute path="/" alias="Inicio" component={Home} />
            <LoginRoute path="/login" alias="Iniciar Sesión" component={Login} />
        </React.Fragment>
    )
}

export default index