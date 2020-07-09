// @Vendors
import React, {useCallback} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import jsonwebtoken from 'jsonwebtoken'

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

    if(getToken()){
        if(jsonwebtoken.decode(getToken()).user.Permisos.length) {
            if(jsonwebtoken.decode(getToken()).user.Permisos[0].permiso.nombre === "ADMINISTRADOR" || jsonwebtoken.decode(getToken()).user.Permisos[0].permiso.nombre === "ROOT") {
                return (<Route {...rest} render={
                    props => 
                  <AdminFrame title={alias} user={user} onLogout={doLogout}>
                        <Component {...props}/>
                  </AdminFrame>
                }/>)
            } else {
                return (<Redirect to="/" />)
            }
        } else {
            return (<Redirect to="/" />)
        }

    } else {
        return (<Redirect to="/acceder" />)
    }

}

export default React.memo(AdminRoute)