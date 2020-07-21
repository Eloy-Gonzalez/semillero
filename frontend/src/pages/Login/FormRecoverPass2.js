// @Vendors
import React, {useState, useCallback} from 'react'
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup'

// @Components
import CrsField from 'components/Form/CrsField'
import Button from '@material-ui/core/Button'
import CardSimple from 'components/CardSimple'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'

// @React ReCAPTCHA
import ReCAPTCHA from "react-google-recaptcha"

function FormRecoverPass2({pregunta, onSubmit, disabledButton=false}) {
  const [state, setState] = useState({
    showResponse: false,
  })

  const handleClickshowResponse = useCallback(() => {
    setState({ ...state, showResponse: !state.showResponse })
  },[setState, state])

  const handleMouseDownPassword = useCallback((event) => {
      event.preventDefault()
  },[])

  const initialValues = {
    respuesta: ''
  }

  const SignupSchema = Yup.object().shape({
    respuesta: Yup.string()
    .required('¡Campo requerido!')
  })
  
  return (
        <div>
          <CardSimple>
            {pregunta}
          </CardSimple>
          <br/>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={SignupSchema}
          >
            {
              ({errors, touched, values, handleChange, handleBlur, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                 <CrsField
                    name="respuesta"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.respuesta}
                    label="Ingrese su respuesta (*)"
                    color="primary"
                    type={state.showResponse ? "text": "password"}
                    helperText={<ErrorMessage name="respuesta"/>}
                    error={errors.respuesta && touched.respuesta}
                    autoFocus={true}
                    InputProps={{
                        endAdornment: 
                         <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickshowResponse}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {state.showResponse ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>

                    }}
                 />
                  <Button type="submit" variant="outlined" color="primary" disabled={disabledButton}>
                      { disabledButton ? 'Cargando...' : 'Aceptar'}
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

export default React.memo(FormRecoverPass2)