// @Vendors
import React from 'react'
import {useSelector} from 'react-redux'
import { Route, useLocation } from 'wouter'

// @Components
import AppFrame from 'components/AppFrame'

// @Selectors
import {selectIsAuthenticated} from 'state/auth/auth.selectors'
import { getToken } from 'utils/helpers'

function PrivateRoute({ component: Component, path, alias="Login"}) {
    const isAuthenticated = useSelector(state => selectIsAuthenticated(state))
    const [_, setLocation] = useLocation()
    return (
    !isAuthenticated || !getToken() ?
        <Route exact path={path}>
            {props => 
                <AppFrame title={alias}>
                    <Component {...props}/>
                </AppFrame>
            }
        </Route>
        : setLocation("/")
    )
}

export default React.memo(PrivateRoute)