// @Vendors
import React, {useState, useCallback, Fragment} from 'react'
import {useDispatch} from 'react-redux'

// @Componenets
import FormRecoverPass from './FormRecoverPass'
import FormRecoverPass2 from './FormRecoverPass2'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

// @ActionsTypes
import {MODAL_CLOSE} from 'state/app/app.actionTypes'

// @Services
import {recoverpassword, recoverpassword2} from 'state/auth/auth.services'

export default function RecoverPass() {
	const dispatch = useDispatch()
	const [state, setState] = useState({
		pregunta: "",
		username: "",
		showForm: true,
		showResponse: false,
		loading: false,
		errors: { name: "", value: null },
		success: null
	})

	const handleRecoverPass = useCallback( async (data1, actions) => {
		setState({...state, loading: true})
		const res = await recoverpassword(data1)
		const {data} = res

		if(data.pregunta_seguridad) {
			const {username} = data
			const {nombre} = data.pregunta_seguridad
			setState({
				...state,
				showForm: false,
				username: username,
				pregunta: nombre,
				loading: false,
				showResponse: true
			})
		} else {
			setState({
				...state,
				loading: false,
				errors: {
					name: "form1",
					value:"Correo inválido"
				}
			})
		}
		actions.setSubmitting(false)
	}, [state, setState])

	const handleRecoverPass2 = useCallback( async (data2, actions) => {
		setState({...state, loading: true})
		// username && respuesta
		const {respuesta} = data2
		const {username} = state
		const payload = {username, respuesta}
		
		const res = await recoverpassword2(payload)
    	const {data} = res

	    if(data.alert.type === "success") {
			setState({
				...state,
				loading: false,
				showResponse: false,
				showForm: false,
				errors: {
					name: "",
					value:"",
					showResponse: false,
				},
				success: data.alert.message
			})
			setTimeout(() => dispatch({ type: MODAL_CLOSE }), 3000)
	    } else {
			setState({
				...state,
				loading: false,
				errors: {
					name: "form2",
					value: data.alert.message
				},
				success: null
			})	      
	    }
		actions.setSubmitting(false)
	}, [state, dispatch])

	return  (
		<Fragment>
			{ state.showResponse && <IconButton 
                aria-label="Atrás"
                onClick={() => setState({ 
					pregunta: "",
					username: "",
					showForm: true,
					showResponse: false,
					loading: false,
					errors: { name: "", value: null },
					success: null
                })}
              >
	            <Tooltip title="Regresar">
	              <ArrowBackIosIcon/>
	            </Tooltip>
             </IconButton>
         	}
			{!state.success && <h2 style={{color:"var(--lightGreen)"}}>Recuperar contraseña</h2> }
			{ state.loading === false && state.errors.value && <p className="app-title-second" style={{fontSize:"20px",color:"#d65b5b"}}>{state.errors.value}</p> }
			{ state.showForm && 
				<FormRecoverPass 
					onSubmit={handleRecoverPass}
					disabledButton={state.loading}
				/>
			}
			{ state.showResponse && 
				<FormRecoverPass2
					pregunta={state.pregunta}
					onSubmit={handleRecoverPass2}
					disabledButton={state.loading}
				/>
			}
			{ state.success && <h1 style={{textAlign:"center",color: "var(--lightGreen)"}}>{state.success}</h1> }
		</Fragment>
	)

}