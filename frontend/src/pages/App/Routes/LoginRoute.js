// @Vendors
import React from 'react'
import { Route, useLocation } from 'wouter'

// @Components
import AppFrame from 'components/AppFrame'

function PrivateRoute({ component: Component, path, alias="Login"}) {
    const user = { logged : true }
    const [_, setLocation] = useLocation()

    return (
    !user.logged ?  
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