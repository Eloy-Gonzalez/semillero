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

function PrivateRoute({ history, component: Component, alias, ...rest }) {
    const user = useSelector(state => selectUser(state))
    const dispatch = useDispatch()

    const doLogout = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    return (
        <Route {...rest} render={
            props => 
            user.isAuthenticated ? (
                <AppFrame title={alias} user={user} onLogout={doLogout}>
                    <Component {...props}/>
                </AppFrame>
            ) : <Redirect to="/acceder" />
        } />
    )
}

export default withRouter(React.memo(PrivateRoute))