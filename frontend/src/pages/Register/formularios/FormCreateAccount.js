// @Vendors
import React, {useState, useCallback, useEffect, Fragment} from 'react'
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup'

// @Components
import CrsField from 'components/Form/CrsField'
import SimpleSelect from 'components/Form/SimpleSelect'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

// @React ReCAPTCHA
import ReCAPTCHA from "react-google-recaptcha"

// @Services
import {getQuestions} from 'utils/helpers'


function FormCreateAccount({ title = "Datos de Acceso", ActionsButtons = "", onSubmit}) {
	const [preguntas, setPreguntas] = useState([])
	const [state, setState] = useState({
		showPassword: false,
		showResponse: false
	})

	const handleClickShowPassword = useCallback(() => {
		setState({ ...state, showPassword: !state.showPassword })
	}, [setState, state])
	
	const handleClickShowResponse = useCallback(() => {
		setState({ ...state, showResponse: !state.showResponse })
	},[setState, state])

	const handleMouseDownPassword = useCallback((event) => {
    	event.preventDefault()
  	},[])

	const initialValues = {
		username: '',
		password: '',
		passwordRepeat: '',
		id_pregunta: '',
		respuesta_seguridad: ''
	}
	const passwordRegex = RegExp("^[a-zA-Z0-9!#$%&/_.,]+$")
	const AccountSchema = Yup.object().shape({
		username: Yup.string().email("¡Ingrese un correo válido!").required("¡Campo requerido!"),
		password: Yup.string().min(6, "¡Mínimo 6 caractéres!").max(255, "¡Máximo 255 caractéres!").required("¡Campo requerido!").matches(passwordRegex, "¡Introduzca una contraseña válida!"),
		passwordRepeat: Yup.string().oneOf([Yup.ref("password"),null], '¡Las contraseñas no coinciden!').required("¡Campo requerido!"),
		id_pregunta: Yup.string().required("¡Campo requerido!"),
		respuesta_seguridad: Yup.string().min(3, "¡Debes ingresar 3 o más caractéres!").required("¡Campo requerido!")
	})
	
  	const obtenerPreguntas = useCallback( async () => {
  		const listPreguntas = await getQuestions()
  		const { data } = listPreguntas
  		const payload = []
  		for(let i=0; i < data.length; i++){
  			payload.push({value: data[i].id, label: data[i].nombre})
  		}
  		setPreguntas(payload)
  	}, [])

  	useEffect(() => {
  		obtenerPreguntas()
  	}, [obtenerPreguntas])

	return (
		<Fragment>
		<p className="app--text-second" style={{color:"rgb(148, 169, 71)"}}>
			Datos de Acceso
		</p>
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={AccountSchema}
		>
			{
				({errors, touched, values, handleChange, handleBlur, handleSubmit}) => (
				<form onSubmit={handleSubmit} className="anim_form-data">
				<Grid container maxwidth="md" spacing={3}>
					<Grid item sm={12} md={4}>
						<CrsField
							id="username"
							name="username"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.username}
							label="Correo electrónico"
							helperText={<ErrorMessage name="username"/>}
							error={errors.username && touched.username}
						/>
					</Grid>
					<Grid item sm={12} md={4}>
						<Tooltip title="Se recomienda utilizar una contraseña que contenta letras, números y al menos un caractér especial (!#$%&/_.,)">
							<CrsField 
								id="password"
								name="password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								label="Contraseña"
								type={state.showPassword ? "text" : "password"}
								InputProps={{
						            endAdornment: 
						             <InputAdornment position="end">
						                <IconButton
						                  aria-label="toggle password visibility"
						                  onClick={handleClickShowPassword}
						                  onMouseDown={handleMouseDownPassword}
						                >
						                  {state.showPassword ? <Visibility /> : <VisibilityOff />}
						                 </IconButton>
					              	</InputAdornment>

						        }}
								helperText={<ErrorMessage name="password"/>}
								error={errors.password && touched.password}
							/>
						</Tooltip>
					</Grid>
					<Grid item sm={12} md={4}>
						<CrsField
							id="passwordRepeat"
							name="passwordRepeat"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.passwordRepeat}
							label="Repetir Contraseña"
							type="password"
							helperText={<ErrorMessage name="passwordRepeat"/>}
							error={errors.passwordRepeat && touched.passwordRepeat}
						/>
					</Grid>
				</Grid>
				<Grid container maxwidth="md" spacing={3}>
					<Grid item sm={12} md={6}>
	                	<SimpleSelect
	                		name="id_pregunta"
	                		value={values.id_pregunta}
	                		onChange={handleChange}
	                		onBlur={handleBlur}
	                		label="Pregunta de seguridad (*)"
		                    items={preguntas}
	                		helpertext={<ErrorMessage name="id_pregunta"/>}
	                		error={errors.id_pregunta && touched.id_pregunta}
	                		/>
					</Grid>
					<Grid item sm={12} md={6}>
						<CrsField
							name="respuesta_seguridad"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.respuesta_seguridad}
							label="Respuesta de seguridad"
							type={state.showResponse ? "text" : "password"}
							InputProps={{
					            endAdornment: 
					             <InputAdornment position="end">
					                <IconButton
					                  aria-label="toggle password visibility"
					                  onClick={handleClickShowResponse}
					                  onMouseDown={handleMouseDownPassword}
					                >
					                  {state.showResponse ? <Visibility /> : <VisibilityOff />}
					                </IconButton>
				              	</InputAdornment>

					        }}
							helperText={<ErrorMessage name="respuesta_seguridad"/>}
							error={errors.respuesta_seguridad && touched.respuesta_seguridad}
						/>
					</Grid>
					<Grid item sm={12}>
                		{ActionsButtons}
                	</Grid>
                </Grid>

                  <ReCAPTCHA
                    sitekey="6LdL76kZAAAAAJncAhyQbdP_nMtyXB74FAVFaZRG"
                    size="invisible"
                  />
				</form>
			)}
		</Formik>
		</Fragment>
	)
}

export default React.memo(FormCreateAccount)