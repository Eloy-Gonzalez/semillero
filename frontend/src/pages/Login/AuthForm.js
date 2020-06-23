// @Vendors
import React from 'react'
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup'

// @Components
import CrsField from 'components/Form/CrsField'

function AuthForm( { onSubmit, ActionsButtons=""} ) {
  const initialValues = {
    username: '',
    password: ''
  }

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
    .email('¡Introduzca un correo válido!')
    .required('¡Campo requerido!'),
    password: Yup.string()
    .min(5, '¡La contraseña debe tener como mínimo 5 carácteres!')
    .max(255, '¡La contraseña tener como máximo 255 carácteres!')
    .required('¡Campo requerido!')
  })
  
  return (
        <div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={SignupSchema}
          >
            {
              ({values, handleChange, handleBlur, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                 <CrsField
                    id="username"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    margin="dense"
                    label="username"
                    color="primary"
                    helperText={<ErrorMessage name="username"/>}
                 />
                 <CrsField 
                    id="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    margin="dense"
                    label="Contraseña"
                    variant="filled"
                    color="primary"
                    type="password"
                    helperText={<ErrorMessage name="password"/>}
                 />
                 {ActionsButtons}
                </form>
              )
            }
          </Formik>
        </div>
    )
}

export default React.memo(AuthForm)