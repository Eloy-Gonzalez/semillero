// @Vendors
import React, {useCallback} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'

// @Utils
import {getToken} from 'utils/helpers'

// @Actions
import {logout} from 'state/auth/auth.actions'

// @Components
import AdminFrame from 'components/AdminFrame'

function AdminRoute({ component: Component, alias, user, ...rest }) {
    const dispatch = useDispatch()

    const doLogout = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    const rol_user = 2
    return (
        <Route {...rest} render={
            props => 
            (rol_user === 2 && user.isAuthenticated || getToken())
            ? <AdminFrame title={alias} user={user} onLogout={doLogout}>
                    <Component {...props}/>
              </AdminFrame> 
            : <Redirect to="/"/>
        } />
    )
}

export default React.memo(AdminRoute)