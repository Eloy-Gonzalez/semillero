// @Vendors
import React, {useCallback} from 'react'
import {useDispatch} from 'react-redux';

// @Components
import AuthForm from 'pages/Login/AuthForm'

// @ActionsTypes
import {REGISTER} from 'state/users/users.actionsTypes'

function Register() {
  const dispatch = useDispatch()

  const handleSubmit = useCallback((data, actions) => {
    const payload = {
        username: data.email,
        password: data.password
    }
    
    dispatch({ type: REGISTER, payload })
    actions.setSubmitting(false);
  }, [dispatch])

    return (
        <div className="box--login">
            <h3 className="app-title">Crear Cuenta Nueva</h3>
        	<div>
        		<AuthForm onSubmit={handleSubmit} />
        	</div>
        </div>
    )
}

export default Register