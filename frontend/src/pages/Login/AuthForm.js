// @Vendors
import React, {useState, useCallback}from 'react'
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup'

// @Components
import CrsField from 'components/Form/CrsField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'

// @React ReCAPTCHA
import ReCAPTCHA from "react-google-recaptcha"

const initial = {
  username: '',
  password: ''
}

const passwordRegex = RegExp("^[a-zA-Z0-9!#$%&/_.,]+$")

function AuthForm({ initialValues = initial, onSubmit, disabledButton=false}) {
  const [state, setState] = useState({
    showPassword: false
  })

  const handleClickShowPassword = useCallback(() => {
    setState(prev => ({showPassword: !prev.showPassword }))
  }, [setState])

  const handleMouseDownPassword = useCallback((event) => {
      event.preventDefault()
    },[])

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
    .email('¡Introduzca un correo válido!')
    .required('¡Campo requerido!'),
    password: Yup.string()
    .min(5, '¡La contraseña debe tener como mínimo 5 carácteres!')
    .max(255, '¡La contraseña tener como máximo 255 carácteres!')
    .required('¡Campo requerido!')
    .matches(passwordRegex, "¡Introduzca una contraseña válidá!")
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
                    autoFocus={true}
                 />
                <CrsField
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    label="Contraseña"
                    color="primary"
                    helperText={<ErrorMessage name="password"/>}
                    error={errors.password && touched.password}
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
                  />
                  <Button type="submit" variant="outlined" color="primary" disabled={disabledButton}>
                      Ingresar
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