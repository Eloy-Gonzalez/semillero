// @Vendors
import React from 'react'
import {useSelector} from 'react-redux'
import {Route, Redirect} from 'react-router-dom';
import jsonwebtoken from 'jsonwebtoken'

// @Utils
import {getToken} from 'utils/helpers'

// @Components
import AppFrame from 'components/AppFrame'

// @Selectors
import {selectUser} from 'state/users/users.selectors'

function LoginRoute({ component: Component, alias="Not title assigned", ...rest }) {
    const user = useSelector(state => selectUser(state))

    return (
        <Route {...rest} render={
            (props) => 
            !user.isAuthenticated ? (
                <AppFrame title={alias}>
                    <Component {...props}/>
                </AppFrame>
            ) : <Redirect to={jsonwebtoken.decode(getToken()).user.Permisos[0].permiso.nombre === "ADMINISTRADOR" || jsonwebtoken.decode(getToken()).user.Permisos[0].permiso.nombre === "ROOT" ? "/admin/videos" : "/"} />
        } />
    )
}

export default LoginRoute