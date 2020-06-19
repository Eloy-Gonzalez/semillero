// @Vendors
import React, { useEffect } from 'react'
import { useLocation } from 'wouter'

// @Routes
import PrivateRoute from './Routes/PrivateRoute'
import LoginRoute from './Routes/LoginRoute'
import { useDispatch, useSelector } from 'react-redux'

// @Selectors
import { selectIsAuthenticated } from 'state/auth/auth.selectors'

// @Actions
import {checkAutentication} from 'state/auth/auth.actions'

// @Pages 
const Home = React.lazy(() => import('pages/Home'))
const Login = React.lazy(() => import('pages/Login'))

function App() {
    const dispatch = useDispatch()
    const [_, setLocation] = useLocation()
    const isAuth = useSelector(state => selectIsAuthenticated(state))
    
    useEffect(() => {
        dispatch(checkAutentication())
    }, [dispatch])

    useEffect(() => {
        if(isAuth){
            setLocation("/")
        }
    },[isAuth, setLocation])
    
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <PrivateRoute path="/" alias="Inicio" component={Home} />
            <LoginRoute path="/login" alias="Iniciar Sesión" component={Login} />
        </React.Suspense>
    )
}

export default App