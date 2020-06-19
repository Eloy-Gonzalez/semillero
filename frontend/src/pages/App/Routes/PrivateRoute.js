// @Vendors
import React from 'react'
import { Route, useLocation } from 'wouter'
import {useSelector} from 'react-redux'

// @Selectors
import {selectIsAuthenticated} from 'state/auth/auth.selectors'

// @Components
import AppFrame from 'components/AppFrame'
import { getToken } from 'utils/helpers'

function PrivateRoute({ component: Component, path, alias}) {
    const isAuthenticated = useSelector(state => selectIsAuthenticated(state))
    const [_, setLocation] = useLocation()

    return (
        isAuthenticated || getToken() ?  
            <Route exact path={path}>
                {props => 
                    <AppFrame title={alias} authenticated={isAuthenticated}>
                        <Component {...props}/>
                    </AppFrame>
                }
            </Route>
        : setLocation("/login")
    )
}

export default React.memo(PrivateRoute)