// @Vendors
import React, {Suspense, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// @Selectors
import {selectLoading} from 'state/app/app.selectors'
import {selectFormStep} from 'state/users/users.selectors'

// @Actions
import {
  setFormStep,
  cleanProfiles,
  cleanUbication,
  cleanRepresentante
} from 'state/users/users.actions'

// @Styles
import './index.scss'

// @Components
import LoaderFormData from './LoaderFormData'
import ActionsButtons from 'components/ActionsButtons'

// @Components > Views Formularios
const Ceduled = React.lazy( () => import("./Ceduled"))
const NotCeduled = React.lazy( () => import("./NotCeduled"))

const FormSearchCedula = React.lazy( () => import("./formularios/FormSearchCedula"))
const DetailUserProfile = React.lazy( () => import("./formularios/DetailUserProfile"))
const FormUsuariosDomicilio = React.lazy( () => import("./formularios/FormUsuariosDomicilio"))
const AuthForm = React.lazy( () => import("pages/Login/AuthForm"))
const FormUsuariosPerfil = React.lazy( () => import("./formularios/FormUsuariosPerfil"))

function Register() {
  const dispatch = useDispatch()
  const {actualVisible} = useSelector(state => selectFormStep(state)) || 0
  const loading = useSelector(state => selectLoading(state))
  const [isCeduled, setIsCeduled] = React.useState(true)

  const nextPrev = useCallback((index) => {
    const payload = {actualVisible: index}
    dispatch(setFormStep(payload))
  }, [dispatch])

  const resetFormData = useCallback(() => {
    dispatch(cleanProfiles())
    dispatch(cleanUbication())
    dispatch(cleanRepresentante())
  }, [dispatch])
  
  const FormsFase1 = React.useMemo(() => [
    FormSearchCedula,
    DetailUserProfile,
  ], [])

  const FormsFase2 = React.useMemo(() => [
    FormUsuariosDomicilio,
    AuthForm
  ], [])

  return (
    <div className="container card--box">
        <h2 className="app--title" style={{textAlign:"center"}}>Crear Cuenta Nueva</h2>
        <p className="app--text-secod" style={{fontWeight: "bold", fonSize:"18px"}}>
          {isCeduled ? "Usuario no cedulado " : "Usuario cedulado "} 
          <span 
            style={{cursor:"pointer", color:"blue"}}
            onClick={() => setIsCeduled(prev => !prev)}>
            ingrese aqui
          </span>
        </p>
        <Suspense fallback={<LoaderFormData />}>
            {(
              isCeduled ?
                <Ceduled
                  actualVisible={actualVisible}
                  nextPrev={nextPrev} 
                  listFormiks={[...FormsFase1, ...FormsFase2]}
                  ActionsButtons={ActionsButtons}
                  dispatch={dispatch}
                  loading={loading}
                  resetFormData={resetFormData}
                /> :
                <NotCeduled
                  actualVisible={actualVisible}
                  nextPrev={nextPrev} 
                  listFormiks={[...FormsFase1, FormUsuariosPerfil, ...FormsFase2]}
                  ActionsButtons={ActionsButtons}
                  dispatch={dispatch}
                  loading={loading}
                  resetFormData={resetFormData}
                />
            )}
        </Suspense>
    </div>
  )
}

export default Register