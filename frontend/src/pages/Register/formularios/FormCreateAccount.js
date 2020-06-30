// @Vendors
import React, {memo} from 'react'
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup'

// @Components
import CrsField from 'components/Form/CrsField'



function FormCreateAccount({ ActionsButtons, title=""}) {
	const initialValues = {
    	username: '',
    	password: '',
    	passwordRepeat: '',
  	}}
  	const AccountSchema = {
  		username: Yup.string().email("¡Ingrese un correo válido!").required("¡Campo requerido!"),
  		password: Yup.string().min(6, "¡Mínimo 6 caractéres!").max(255, "¡Máximo 255 caractéres!").required("¡Campo requerido!"),
  		passwordRepeat: Yup.string().oneOf([Yup.ref("password"),null], '¡Las contraseñas no coinciden!')
  	}

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={AccountSchema}
		>
			{
				({errors, touched, values, handleChange, handleBlur, handleSubmit}) => (
				<form onSubmit={handleSubmit}>
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
						label="Contraseña"
						type="passwordRepeat"
						helperText={<ErrorMessage name="passwordRepeat"/>}
						error={errors.passwordRepeat && touched.passwordRepeat}
					/>
				</form>
			)}
		</Formik>
	)
}

export default memo(FormCreateAccount)