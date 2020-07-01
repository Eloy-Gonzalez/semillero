// @Vendors
import React from 'react'
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup'

// @Components
import CrsField from 'components/Form/CrsField'
import Button from '@material-ui/core/Button'

// @React ReCAPTCHA
import ReCAPTCHA from "react-google-recaptcha"

function AuthForm({onSubmit, disabledButton=false}) {
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
              ({errors, touched, values, handleChange, handleBlur, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                 <CrsField
                    id="username"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    label="Correo electrónico"
                    color="primary"
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
                    color="primary"
                    type="password"
                    helperText={<ErrorMessage name="password"/>}
                    error={errors.password && touched.password}
                 />
                  <Button type="submit" variant="outlined" color="primary" disabled={disabledButton}>
                      { disabledButton ? 'Cargando...' : 'Ingresar'}
                  </Button>

                  <ReCAPTCHA
                    sitekey="6LdL76kZAAAAAJncAhyQbdP_nMtyXB74FAVFaZRG"
                    size="invisible"
                  />
                </form>
              )
            }
          </Formik>
        </div>
    )
}

export default React.memo(AuthForm)