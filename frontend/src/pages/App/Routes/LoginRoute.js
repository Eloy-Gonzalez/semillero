// @Vendors
import React from 'react'
import {useSelector} from 'react-redux'
import {Route, Redirect} from 'react-router-dom';

// @Components
import AppFrame from 'components/AppFrame'

// @Selectors
import {selectIsAuthenticated} from 'state/users/users.selectors'

function LoginRoute({ component: Component, alias="Not title assigned", ...rest }) {
    const isAuthenticated = useSelector(state => selectIsAuthenticated(state))
    
    return (
        <Route {...rest} render={
            (props) => 
            !isAuthenticated ? (
                <AppFrame title={alias}>
                    <Component {...props}/>
                </AppFrame>
            ) : <Redirect to="/" />
        } />
    )
}

export default LoginRoute