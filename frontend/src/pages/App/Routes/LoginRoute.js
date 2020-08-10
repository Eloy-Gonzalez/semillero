// @Vendors
import React from 'react'
import {Route, Redirect} from 'react-router-dom';

// @Utils
import {verifyToken} from 'utils/helpers'

// @Components
import AppFrame from 'components/AppFrame'

function LoginRoute({ component: Component, alias="Not title assigned", ...rest }) {
    return (
        <Route {...rest} render={
            (props) => 
            !verifyToken() ? (
                <AppFrame title={alias}>
                    <Component {...props}/>
                </AppFrame>
            ) : <Redirect to="/"/>
        } />
    )
}

export default LoginRoute