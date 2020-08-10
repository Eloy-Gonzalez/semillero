// @Vendors
import React, {useEffect, useState, useCallback, memo} from 'react'
import {useDispatch} from 'react-redux'
import { Route as VendorRoute, Redirect } from 'react-router-dom'

// @Components
import AppFrame from 'components/AppFrame'
import AdminFrame from 'components/AdminFrame'

// @Actions
import {logout} from 'state/auth/auth.actions'
import {verifyToken, userCan} from 'utils/helpers'

// @Constants
import {
    ADMINISTRADOR,
    ROOT
} from 'constants/index'

function Route({ component: Component, alias, user, ...rest } = {}) {
    const [user_rol_id, setUser_rol_id] = useState(1)
    const dispatch = useDispatch()

    const doLogout = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    const WrapperFrame = useCallback((props) => {
        return userCan(ROOT, user_rol_id) || userCan(ADMINISTRADOR, user_rol_id)
        ?   <AdminFrame title={alias} user={user} onLogout={doLogout}>
                <Component {...props}/>
            </AdminFrame>
        :   <AppFrame title={alias} user={user} onLogout={doLogout}>
                <Component {...props}/>
            </AppFrame>
    }, [user, user_rol_id, doLogout, alias])

    useEffect(() => {
        if(user.isAuthenticated) {
            try {
            const {Permisos} = user
            const {id_permiso} = Permisos[0]
            setUser_rol_id(id_permiso)
            } catch(err) {
                // Silenct
            }
        }
    }, [setUser_rol_id, user])


    return  verifyToken()
    ? <VendorRoute {...rest} render={ (routeProps) => <WrapperFrame {...routeProps}/> } />
    : <Redirect to="acceder"/>
}

export default memo(Route)