import React from 'react'
import {Formik} from 'formik';
import * as Yup from 'yup'

import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

const initialValues = {
  email: '',
  password: ''
}

const SignupSchema = Yup.object().shape({
  email: Yup.string()
  .email('Introduzca un correo válido')
  .required('Campo requerido'),
  password: Yup.string()
  .min(5, 'La contraseña debe contar con mínimo 5 carácteres!')
  .required('Campo requerido')
});

function AuthForm( { onSubmit, isNewRecord = true } ) {
  return (
        <div>        
        <Formik
          initialValues={initialValues}
          onSubmit={ (values, actions) => onSubmit(values, actions)}
          validationSchema={SignupSchema}
        >
          {
            ({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <FormGroup>
                    <TextField
                      id="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      margin="dense"
                      label="Email"
                      variant="filled"
                      color="primary"
                      helperText={errors.email && touched.email && errors.email}
                    />
                </FormGroup>

                <FormGroup>
                    <TextField
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
                      helperText={errors.password && touched.password && errors.password}
                    />
                </FormGroup>

                <FormGroup style={{display:'block', textAlign:'center'}}>
                  <Button type="submit" variant="outlined" color="primary">
                    {isNewRecord ? 'Ingresar' : 'Aceptar'}
                  </Button>
                </FormGroup>
              </form>
            )
          }
        </Formik>
        </div>
    )
}

export default React.memo(AuthForm)