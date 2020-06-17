// @Vendors
import React from 'react'
import { Route, useLocation } from 'wouter'

// @Components
import AppFrame from 'components/AppFrame'

function PrivateRoute({ component: Component, path, alias}) {
    const user = { logged : true }
    const [_, setLocation] = useLocation()

    return (
    user.logged ?  
        <Route path={path}>
            {props => 
                <AppFrame title={alias}>
                    <Component {...props}/>
                </AppFrame>
            }
        </Route>
        : setLocation("/login")
    )
}

export default React.memo(PrivateRoute)