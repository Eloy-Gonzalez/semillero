// @Vendors
import React, {useEffect, useCallback, useState} from 'react'
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

    return (
        <Route {...rest} render={
            props => 
            (getToken())
            ? <AdminFrame title={alias} user={user} onLogout={doLogout}>
                    <Component {...props}/>
              </AdminFrame> 
            : <Redirect to="/" />
        } />
    )
}

export default AdminRoute