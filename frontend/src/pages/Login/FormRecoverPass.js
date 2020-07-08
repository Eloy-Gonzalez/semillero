// @Vendors
import React from 'react'
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup'

// @Components
import CrsField from 'components/Form/CrsField'
import Button from '@material-ui/core/Button'

// @React ReCAPTCHA
import ReCAPTCHA from "react-google-recaptcha"

function FormRecoverPass({onSubmit, disabledButton=false}) {
  const initialValues = {
    username: ''
  }

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
    .email('¡Introduzca un correo válido!')
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
                    label="Correo electrónico (*)"
                    color="primary"
                    type="username"
                    helperText={<ErrorMessage name="username"/>}
                    error={errors.username && touched.username}
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

export default React.memo(FormRecoverPass)