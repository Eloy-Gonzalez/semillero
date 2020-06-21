// @Vendors
import React, {useCallback} from 'react'
import {useDispatch} from 'react-redux';

// @Components
import AuthForm from 'pages/Login/AuthForm'

// @ActionsTypes
import {REGISTER} from 'state/users/users.actionsTypes'
import 'pages/Login/index.scss'

function Register() {
  const dispatch = useDispatch()

  const handleSubmit = useCallback((data, actions) => {
    const payload = {
        username: data.email,
        password: data.password
    }

    console.log(payload)
    
    dispatch({ type: REGISTER, payload })
    actions.setSubmitting(false);
  }, [dispatch])

    return (
        <div className="box--login">
            <h3 className="app--title" style={{textAlign:"center", color:"#777", fontSize:"1.3em"}}>Crear cuenta</h3>
            <AuthForm onSubmit={handleSubmit} isNewRecord={false}/>
        </div>
    )
}

export default Register