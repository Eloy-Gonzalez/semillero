// @Vendors
import React, {useCallback} from 'react'
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

// @Material UI
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

// @Styles
import './index.scss'

// @Components
import ActionsButtons from 'components/ActionsButtons'
import PreviusStep from './PreviusStep'

// @Components > Views Formularios
import QuestionRegister from './QuestionRegister'
import Ceduled from "./Ceduled"
import NotCeduled from "./NotCeduled"

const FormSearchCedula = React.lazy( () => import("./formularios/FormSearchCedula"))
const DetailUserProfile = React.lazy( () => import("./formularios/DetailUserProfile"))
const FormUsuariosDomicilio = React.lazy( () => import("./formularios/FormUsuariosDomicilio"))
const FormCreateAccount = React.lazy( () => import("./formularios/FormCreateAccount"))
const FormUsuariosPerfil = React.lazy( () => import("./formularios/FormUsuariosPerfil"))

function Register() {
  const dispatch = useDispatch()
  const {actualVisible} = useSelector(state => selectFormStep(state))
  const loading = useSelector(state => selectLoading(state))
  const [print, setPrint] = React.useState("QUESTION")
  
  const FORM_NOT_CEDULED = "NO_CEDULADO"
  const FORM_CEDULED = "CEDULADO"

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
    FormCreateAccount
  ], [])

  return (
    <div className="container card--box">
        <h2 className="app--text-second" 
          style={{textAlign: "center",fontSize: "30px",margin: "0",fontWeight: "bold",color: "#263c61", position:"relative"}}>
            { print !== "QUESTION" &&
              <IconButton 
                aria-label="Atrás"
                style={{position:"absolute",top:"0",left:"0"}}
                onClick={() => setPrint("QUESTION")}
              >
                <Tooltip title="Regresar a opciones">
                  <ArrowBackIosIcon/>
                </Tooltip>
              </IconButton>                
            }
            Registrar nuevo usuario { print === "QUESTION" ? "" : print === FORM_CEDULED ? "(Cedulado)" : "(No Cedulado)"}
        </h2>
          {
            print === FORM_NOT_CEDULED ?
              <NotCeduled
                actualVisible={actualVisible}
                nextPrev={nextPrev} 
                listFormiks={[...FormsFase1, FormUsuariosPerfil, ...FormsFase2]}
                ActionsButtons={ActionsButtons}
                dispatch={dispatch}
                loading={loading}
                resetFormData={resetFormData}
                PreviusStep={
                  <PreviusStep 
                    items={["Consultar cédula", "Verificar datos","Datos Personales", "Datos Domicilio", "Finalizar"]} 
                    actualVisible={actualVisible}
                  />
                }
               />

              : print === FORM_CEDULED ?
                  <Ceduled
                    actualVisible={actualVisible}
                    nextPrev={nextPrev} 
                    listFormiks={[...FormsFase1, ...FormsFase2]}
                    ActionsButtons={ActionsButtons}
                    dispatch={dispatch}
                    loading={loading}
                    resetFormData={resetFormData}
                    PreviusStep={
                      <PreviusStep 
                        items={["Consultar cédula", "Verificar datos","Datos Domicilio", "Finalizar"]} 
                        actualVisible={actualVisible}
                      />
                    }
                  />
                : <QuestionRegister 
                    dispatch={setPrint}
                    actions={[FORM_NOT_CEDULED, FORM_CEDULED]}
                  />
          }
    </div>
  )
}

export default React.memo(Register)