// @Vendors
import React, {Suspense, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// @Selectors
import {selectModal, selectLoading} from 'state/app/app.selectors'
import {selectFormStep, selectUser, selectProfiles, selectUbication} from 'state/users/users.selectors'

// @Actions
import {openModal, closeModal} from 'state/app/app.actions'
import {consultarSaime, setUbication, registerNewUser, setFormStep} from 'state/users/users.actions'

// @Styles
import './index.scss'

// @Local Lazy Components
import LoaderFormData from './LoaderFormData'
import ActionsButtons from './ActionsButtons'
import MaterialModal from 'components/Modal'

const AuthForm = React.lazy( () => import("pages/Login/AuthForm"))
const FormSearchCedula = React.lazy( () => import("./formularios/FormSearchCedula"))
const DetailUserProfile = React.lazy( () => import("./formularios/DetailUserProfile"))
const FormUsuariosDomicilio = React.lazy( () => import("./formularios/FormUsuariosDomicilio"))
const FormNoCedulado = React.lazy( () => import("./formularios/FormNoCedulado"))

function Register() {
  const dispatch = useDispatch()
  const modal = useSelector(state => selectModal(state))
  const loading = useSelector(state => selectLoading(state))
  const user = useSelector(state => selectUser(state))
  const profiles = useSelector(state => selectProfiles(state))
  const ubication = useSelector(state => selectUbication(state))
  const {actualVisible} = useSelector(state => selectFormStep(state)) || 3

  const listFormiks = useCallback([
    FormSearchCedula,
    DetailUserProfile,
    FormUsuariosDomicilio,
    AuthForm
  ],[])
  const VisualizedForm = listFormiks[actualVisible]
  
  const nextPrev = useCallback((index) => {
    const payload = {actualVisible: index}
    dispatch(setFormStep(payload))
  }, [dispatch])

  const listSubmit = [
      function(values, actions) {
        const {cedula} = values
        dispatch(consultarSaime(cedula))
      },
      function(e) {
        e.preventDefault()
        e.stopPropagation()
        nextPrev(2)
      },
      function(values, actions) {
        dispatch(setUbication(values))
        nextPrev(3)
      },
      function(values, actions) {
        const lastValues = {...values, id_pregunta: 1, respuesta_seguridad: 'MUÑECA'}
        const payload = {...user, ...profiles, ...ubication, ...lastValues}
        dispatch(registerNewUser(payload))
      }
  ]

  const clickNoCedulado = useCallback(() => (
    dispatch(openModal(
      <React.Fragment>
        <h2 className="app--title" style={{textAlign:"center"}}>
          Registrar no cedulado
        </h2>
        <FormNoCedulado onSubmit={() => alert("No ced")} isNewRecord={true}/>
      </React.Fragment>
    ))
  ), [dispatch])

  return (
    <div className="container card--box">
        <h2 className="app--title" style={{textAlign:"center"}}>Crear Cuenta Nueva</h2>
        <div className="target">
            <Suspense fallback={<LoaderFormData messagge="Cargando..." />}>
              <VisualizedForm
                onSubmit={listSubmit[actualVisible]}
                ActionsButtons={
                  <ActionsButtons 
                    actualVisible={actualVisible}
                    totalForms={(listFormiks.length -1)}
                    nextPrev={nextPrev}
                    disabledButton={loading}
                  />}
              />
              <span className="app--text" style={{color:"#777"}}>
                Si no posee cédula  
                <i style={{fontSize:"15px",color: "#86a513", cursor:"pointer"}} onClick={clickNoCedulado}> Click Aquí</i>
              </span>
              <MaterialModal open={modal.open} handleClose={() => dispatch(closeModal())}>{modal.description}</MaterialModal>
            </Suspense>
        </div>
    </div>
  )
}

export default Register