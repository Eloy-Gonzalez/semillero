// @Vendors
import React, {useCallback} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'

// @Utils
import {getToken} from 'utils/helpers'

// @Actions
import {logout} from 'state/auth/auth.actions'

// @Components
import AppFrame from 'components/AppFrame'

function PrivateRoute({ component: Component, alias, user, ...rest }) {
    const dispatch = useDispatch()

    const doLogout = useCallback(() => {
        dispatch(logout())
    }, [dispatch])
    
    return (
        <Route {...rest} render={
            props => 
            user.isAuthenticated || getToken()
            ? <AppFrame title={alias} user={user} onLogout={doLogout}>
                    <Component {...props}/>
              </AppFrame> 
            : <Redirect to="/acceder"/>
        } />
    )
}

export default React.memo(PrivateRoute)