// @Vendors
import React, {useState, useCallback, useEffect, Fragment} from 'react'
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup'

// @Components
import CrsField from 'components/Form/CrsField'
import SimpleSelect from 'components/Form/SimpleSelect'

// @Services
import {getQuestions} from 'utils/helpers'


function FormCreateAccount({ title = "Datos de Acceso", ActionsButtons = "", onSubmit}) {
	const [preguntas, setPreguntas] = useState([])
	const initialValues = {
		username: '',
		password: '',
		passwordRepeat: '',
		id_pregunta: '',
		respuesta_seguridad: ''
	}

	const AccountSchema = Yup.object().shape({
		username: Yup.string().email("¡Ingrese un correo válido!").required("¡Campo requerido!"),
		password: Yup.string().min(6, "¡Mínimo 6 caractéres!").max(255, "¡Máximo 255 caractéres!").required("¡Campo requerido!"),
		passwordRepeat: Yup.string().oneOf([Yup.ref("password"),null], '¡Las contraseñas no coinciden!').required("¡Campo requerido!"),
		id_pregunta: Yup.string().required("¡Campo requerido!"),
		respuesta_seguridad: Yup.string().min(30, "¡Debes ingresar 30 o más caractéres!").required("¡Campo requerido!")
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
					<div className="grid--form-data" style={{marginBottom:"40px"}}>
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
						<CrsField 
							id="password"
							name="password"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
							label="Contraseña"
							type="password"
							helperText={<ErrorMessage name="password"/>}
							error={errors.password && touched.password}
						/>
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
					</div>
                	<SimpleSelect
                		name="id_pregunta"
                		value={values.id_pregunta}
                		onChange={handleChange}
                		onBlur={handleBlur}
                		label="Pregunta de seguridad (*)"
                		style={{minWidth: "260px"}}
	                    items={preguntas}
                		helpertext={<ErrorMessage name="id_pregunta"/>}
                		error={errors.id_pregunta && touched.id_pregunta}
                		/>
					<CrsField
						name="respuesta_seguridad"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.respuesta_seguridad}
						label="Respuesta de seguridad"
						type="password"
						helperText={<ErrorMessage name="respuesta_seguridad"/>}
						error={errors.respuesta_seguridad && touched.respuesta_seguridad}
					/>
                	{ActionsButtons}
				</form>
			)}
		</Formik>
		</Fragment>
	)
}

export default React.memo(FormCreateAccount)