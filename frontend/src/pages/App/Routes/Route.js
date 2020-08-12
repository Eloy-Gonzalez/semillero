// @Vendors
import React, {useEffect, useState, useCallback, memo} from 'react'
import {useDispatch} from 'react-redux'
import {Route as VendorRoute, Redirect} from 'react-router-dom'

// @Components
import AppFrame from 'components/AppFrame'
import AdminFrame from 'components/AdminFrame'

// @Actions
import {logout} from 'state/auth/auth.actions'
import {verifyToken, userCan} from 'utils/helpers'

function Route({ component: Component, alias, user, ...rest } = {}) {
    const [user_rol_id, setUser_rol_id] = useState(1)
    const dispatch = useDispatch()

    const doLogout = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

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
    }, [user,setUser_rol_id])


    return  verifyToken()
    ? <VendorRoute {...rest} render={ (routeProps) => 
        userCan("ROOT", user_rol_id) || userCan("ADMINISTRADOR", user_rol_id)
        ?   <AdminFrame title={alias} user={user} onLogout={doLogout}>
                <Component {...routeProps}/>
            </AdminFrame>
        :   <AppFrame title={alias} user={user} onLogout={doLogout}>
                <Component {...routeProps}/>
            </AppFrame>
    } />
    : <Redirect to="acceder"/>
}

export default memo(Route)