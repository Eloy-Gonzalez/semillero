// @Vendors
import React, {useEffect} from 'react'
import {Switch, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

// @Routes
import PrivateRoute from './Routes/PrivateRoute'
import LoginRoute from './Routes/LoginRoute'

// @Actions
import {checkAutentication} from 'state/auth/auth.actions'
import {clearServerErrors, clearServerSuccess, closeModal, closeDialogConfirm} from 'state/app/app.actions'

// @Selectors
import {selectServerErrors, selectServerSuccess, selectModal, selectDialogConfirm} from 'state/app/app.selectors'

// @Components
import Backdrop from 'components/Backdrop'
import Snackbars from 'components/Snackbars';
import SnackbarsSuccess from 'components/SnackbarsSuccess';
import CircularProgress from '@material-ui/core/CircularProgress'
import MaterialModal from 'components/Modal'
import DialogConfirm from 'components/DialogConfirm'

// @Pages 
import Login  from 'pages/Login'
import Home from 'pages/Home'

const Register = React.lazy(() => import('pages/Register'))

function App() {
    const dispatch = useDispatch()
    const serverErrors = useSelector(state => selectServerErrors(state))
    const serverSuccess = useSelector(state => selectServerSuccess(state))
    const modal = useSelector(state => selectModal(state))
    const dialogConfirm = useSelector(state => selectDialogConfirm(state))

    useEffect(() => {
        dispatch(checkAutentication())
    }, [dispatch])

    return (
        <React.Suspense 
                fallback={<Backdrop show={true} bgColor="#fff" style={{textAlign:"center"}}>
                    <CircularProgress />
                </Backdrop>}>
            <Snackbars onClose={() => dispatch(clearServerErrors())} message={serverErrors} open={!!serverErrors} />
            <SnackbarsSuccess  onClose={() => dispatch(clearServerSuccess())} message={serverSuccess} open={!!serverSuccess} />
            
            <Switch>
                <PrivateRoute exact path="/" alias="Inicio" component={Home} />
                <PrivateRoute exact path="/periodos" alias="Periodos" component={Home} />
                <PrivateRoute exact path="/fases" alias="Fases" component={Home} />
                <PrivateRoute exact path="/categorias" alias="Crear Cuenta" component={Register} />
                <PrivateRoute exact path="/usuarios" alias="Usuarios" component={Home} />
                <LoginRoute exact path="/acceder" alias="Iniciar Sesión" component={Login} />
                <Redirect to="/acceder" />
            </Switch>

            <MaterialModal open={modal.open} handleClose={() => dispatch(closeModal())} >
                {modal.description}
            </MaterialModal>
            <DialogConfirm 
                dialogTitle={dialogConfirm.title}
                dialogText={dialogConfirm.description}
                open={dialogConfirm.open}
                onClose={() => dispatch(closeDialogConfirm())}
                onConfirm={() => dialogConfirm.onConfirm()}
            />
        </React.Suspense>
    )
}

export default App