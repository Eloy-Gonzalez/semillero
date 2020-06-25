// @Vendors
import React, {useEffect} from 'react'
import {Switch, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

// @Routes
import PrivateRoute from './Routes/PrivateRoute'
import LoginRoute from './Routes/LoginRoute'

// @Actions
import {checkAutentication} from 'state/auth/auth.actions'
import {clearServerErrors, clearServerSuccess} from 'state/app/app.actions'

// @Selectors
import {selectServerErrors, selectServerSuccess} from 'state/app/app.selectors'

// @Components
import Backdrop from 'components/Backdrop'
import Snackbars from 'components/Snackbars';
import SnackbarsSuccess from 'components/SnackbarsSuccess';

// @Pages 
import Login  from 'pages/Login'
import Home from 'pages/Home'

const Register = React.lazy(() => import('pages/Register'))

function App() {
    const dispatch = useDispatch()
    const serverErrors = useSelector(state => selectServerErrors(state))
    const serverSuccess = useSelector(state => selectServerSuccess(state))

    useEffect(() => {
        dispatch(checkAutentication())
    }, [dispatch])

    return (
        <React.Suspense 
                fallback={
                    <Backdrop show={true} bgColor="#fff">
                        <center style={{margin: '60px 0 0'}}><h3 className="app--title">Cargando datos....</h3></center>
                    </Backdrop>
            }>
            <Snackbars onClose={() => dispatch(clearServerErrors())} message={serverErrors} open={!!serverErrors} />
            <SnackbarsSuccess  onClose={() => dispatch(clearServerSuccess())} message={serverSuccess} open={!!serverSuccess} />
            
            <Switch>
                <PrivateRoute exact path="/" alias="Inicio" component={Home} />
                <LoginRoute exact path="/crear-cuenta" alias="Crear Cuenta" component={Register} />
                <LoginRoute exact path="/acceder" alias="Iniciar Sesión" component={Login} />
                <Redirect to="/acceder" />
            </Switch>
        </React.Suspense>
    )
}

export default App