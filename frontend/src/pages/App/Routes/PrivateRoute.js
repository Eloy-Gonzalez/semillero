// @Vendors
import React from 'react'
import { Route, useLocation } from 'wouter'
import {useSelector} from 'react-redux'

// @Selectors
import {selectIsAuthenticated} from 'state/users/users.selectors'

// @Components
import AppFrame from 'components/AppFrame'

function PrivateRoute({ component: Component, path, alias}) {
    const isAuthenticated = useSelector(state => selectIsAuthenticated(state))
    const [_, setLocation] = useLocation()

    return (
        isAuthenticated ?
            <Route exact path={path}>
                {props => (
                    <AppFrame title={alias} authenticated={isAuthenticated}>
                        <Component {...props}/>
                    </AppFrame>
                )}
            </Route>
        : setLocation("/acceder")
    )
}

export default React.memo(PrivateRoute)