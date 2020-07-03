// @Vendors
import React from 'react'
import {useSelector} from 'react-redux'
import {Route, Redirect} from 'react-router-dom';

// @Components
import AppFrame from 'components/AppFrame'

// @Selectors
import {selectUser} from 'state/users/users.selectors'

function LoginRoute({ component: Component, alias="Not title assigned", ...rest }) {
    const user = useSelector(state => selectUser(state))
    const ref = user.rol_id === 2 ? "/admin" : "/"
    return (
        <Route {...rest} render={
            (props) => 
            !user.isAuthenticated ? (
                <AppFrame title={alias}>
                    <Component {...props}/>
                </AppFrame>
            ) : <Redirect to={ref} />
        } />
    )
}

export default LoginRoute