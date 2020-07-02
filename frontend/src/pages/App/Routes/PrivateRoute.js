// @Vendors
import React, {useCallback} from 'react'
import { Route, Redirect, withRouter} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

// @Actions
import {logout} from 'state/auth/auth.actions'

// @Selectors
import {selectUser} from 'state/users/users.selectors'

// @Components
import AppFrame from 'components/AppFrame'
import AdminFrame from 'components/AdminFrame'

function PrivateRoute({ history, component: Component, alias, ...rest }) {
    const user = useSelector(state => selectUser(state))
    const dispatch = useDispatch()

    const doLogout = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    const rol = 2

    return (
        <Route {...rest} render={
            props => 
            user.isAuthenticated ? 
            rol === 2 ?  (
                <AdminFrame title={alias} user={user} onLogout={doLogout}>
                    <Component {...props}/>
                </AdminFrame>
            ) : (
                <AppFrame title={alias} user={user} onLogout={doLogout}>
                    <Component {...props}/>
                </AppFrame>
            ) : <Redirect to="/acceder" />
        } />
    )
}

export default withRouter(React.memo(PrivateRoute))