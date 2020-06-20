// @Vendors
import React, {useEffect} from 'react'
import {Switch, Route} from "wouter";
import {useDispatch} from 'react-redux'

// @Routes
import PrivateRoute from './Routes/PrivateRoute'
import LoginRoute from './Routes/LoginRoute'

// @Actions
import {checkAutentication} from 'state/auth/auth.actions'

// @Components
import Backdrop from 'components/Backdrop'

// @Pages 
const Home = React.lazy(() => import('pages/Home'))
const Login = React.lazy(() => import('pages/Login'))
const Register = React.lazy(() => import('pages/Register'))
const NotFoundPage = React.lazy(() => import('components/PagesResponses/NotFoundPage'))

function App() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(checkAutentication())
    }, [dispatch])

    return (
        <React.Suspense 
                fallback={
                    <Backdrop show={true} bgColor="#fff">
                        <center><h3>Cargando datos....</h3></center>
                    </Backdrop>
            }>
            <Switch>
                <PrivateRoute path="/" alias="Inicio" component={Home} />
                <LoginRoute path="/crear-cuenta" alias="Cuenta nueva" component={Register} />
                <LoginRoute path="/acceder" alias="Iniciar Sesión" component={Login} />
                <Route path="/:rest*">
                    <NotFoundPage title="¡Ruta no encontrada!" message="La ruta indicada no es correcta..."/>
                </Route>
            </Switch>
        </React.Suspense>
    )
}

export default App