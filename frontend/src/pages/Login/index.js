// @Vendors
import React, {useCallback} from 'react'
import {useDispatch} from 'react-redux';

// Components
import AuthForm from './AuthForm'

// @ActionsType
import {LOGIN} from 'state/auth/auth.actionsTypes'

// @Styles - component
import './index.scss'

function Login() {
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
    	<React.Fragment>
	        <div className="box--login">
	            <h3 className="app-title">Iniciar Sesión</h3>
	            <AuthForm onSubmit={handleSubmit} />
	        </div>
    	</React.Fragment>
    )
}

export default Login