// @Vendors
import React from 'react'
import LoginForm from './LoginForm'
// @Styles - component
import './index.scss'

function index() {
    return (
        <div className="box--login">
            <h3 className="app-title">Iniciar Sesión</h3>
            <LoginForm />
        </div>
    )
}

export default index