import React, {useCallback} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'

import {LOGIN} from 'state/auth/auth.actionsTypes'
import {useDispatch} from 'react-redux';


const initialValues = {
  email: '',
  password: ''
}

const SignupSchema = Yup.object().shape({
  email: Yup.string()
  .email('Introduzca un correo válido')
  .required('Campo requerido'),
  password: Yup.string()
  .min(5, 'La contraseña debe contar con mínimo 10 carácteres!')
  .required('Campo requerido')
});

function LoginForm() {
  const dispatch = useDispatch()

  const handleSubmit = useCallback((data, actions) => {
    const payload = {
        username: data.email,
        password: data.password
    }
    
    dispatch({ type: LOGIN, payload })
    actions.setSubmitting(false);
  }, [dispatch])

  return (
        <div>        
        <Formik
          initialValues={initialValues}
          onSubmit={ (values, actions) => handleSubmit(values, actions)}
          validationSchema={SignupSchema}
        >
          {
            formik => (
              <Form>
                <div className="form--group">
                  <Field type="email" name="email" placeholder="Correo"/>
                  <ErrorMessage name="email" />
                </div>

                <div className="form--group">
                  <Field type="password" name="password" placeholder="Contraseña"/>
                  <ErrorMessage name="password" />
                </div>

                <div className="form--group">
                  <button type="submit" disabled={!formik.isValid}>Aceptar</button>
                </div>
              </Form>
            )
          }
        </Formik>
      </div>
    )
}


export default React.memo(LoginForm)