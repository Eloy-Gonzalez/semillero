// @Vendors
import React from 'react'
import {useSelector} from 'react-redux'
import { Route, useLocation } from 'wouter'

// @Components
import AppFrame from 'components/AppFrame'

// @Selectors
import {selectIsAuthenticated} from 'state/auth/auth.selectors'

function LoginRoute({ component: Component, path, alias="Not title assigned"}) {
    const isAuthenticated = useSelector(state => selectIsAuthenticated(state))
    const [_, setLocation] = useLocation()
    
    return (
    !isAuthenticated ?
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

export default React.memo(LoginRoute, (prevProps, nextProps) => (prevProps.path === nextProps.path))