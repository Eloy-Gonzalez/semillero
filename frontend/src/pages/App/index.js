// @Vendors
import React, {useEffect} from 'react'
import {Switch, Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

// @Routes
import LoginRoute from './Routes/LoginRoute'
import Route from './Routes/Route'
import RouteAdministrador from './Routes/RouteAdministrador'
import RouteAnalista from './Routes/RouteAnalista'

// @Actions
import {clearServerErrors, clearServerSuccess, closeModal, closeDialogConfirm} from 'state/app/app.actions'
import {checkAutentication} from 'state/auth/auth.actions'

// @Selectors
import {selectServerErrors, selectServerSuccess, selectModal, selectDialogConfirm} from 'state/app/app.selectors'
import {selectUser} from 'state/users/users.selectors'

// @Components
import Snackbars from 'components/Snackbars'
import SnackbarsSuccess from 'components/SnackbarsSuccess'
import MaterialModal from 'components/Modal'
import DialogConfirm from 'components/DialogConfirm'

// @Admin Pages
import Administrador from 'pages/Administrador'
import Periodos from 'pages/Administrador/Periodos'
import Fases from 'pages/Administrador/Fases'
import Categorias from 'pages/Administrador/Categorias'
import Usuarios from 'pages/Administrador/Usuarios'
import Videos from 'pages/Administrador/Videos'

// @Pages
import Home from 'pages/Home'
import Register from 'pages/Register'
import Perfil from 'pages/Profile'
import ActivateAccount from 'pages/Login/ActivateAccount'
import ResetPassword from 'pages/Login/ResetPassword'
import Login  from 'pages/Login'

function App() {
    const dispatch = useDispatch()
    const serverErrors = useSelector(state => selectServerErrors(state))
    const serverSuccess = useSelector(state => selectServerSuccess(state))
    const modal = useSelector(state => selectModal(state))
    const dialogConfirm = useSelector(state => selectDialogConfirm(state))
    const user = useSelector(state => selectUser(state))

    useEffect(() => {
        dispatch(checkAutentication())
    }, [dispatch])

    return (
        <React.Fragment>
            <Snackbars onClose={() => dispatch(clearServerErrors())} message={serverErrors} open={!!serverErrors} />
            <SnackbarsSuccess  onClose={() => dispatch(clearServerSuccess())} message={serverSuccess} open={!!serverSuccess} />

	    <Switch>
		<RouteAdministrador exact path="/admin/usuarios" alias="Administrar Usuarios" component={Usuarios} user={user}/>
		<RouteAdministrador exact path="/admin/categorias" alias="Administrar Categorias" component={Categorias} user={user}/>
		<RouteAdministrador exact path="/admin/fases" alias="Administrar Fases" component={Fases} user={user}/>
		<RouteAdministrador exact path="/admin/periodos" alias="Administrar Per??odos" component={Periodos} user={user}/>
		<RouteAnalista exact path="/admin/videos" alias="Administrar videos" component={Videos} user={user}/>
		<RouteAnalista exact path="/admin" alias="Administrador" component={Administrador} user={user}/>
		<Route exact path="/perfil" alias="Perfil" component={Perfil} user={user}/>
		<Route exact path="/" alias="Inicio" component={Home} user={user}/>
		<LoginRoute exact path="/acceder" alias="Iniciar Sesi??n" component={Login} />
		<LoginRoute exact path="/crear-cuenta" alias="Crear cuenta" component={Register}/>
		<LoginRoute exact path="/activateuser/:token" alias="Activar cuenta" component={ActivateAccount}/>
		<LoginRoute exact path="/updatepassword/:token" alias="Restablecer contrase??a" component={ResetPassword}/>
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
        </React.Fragment>
    )
}
export default App
