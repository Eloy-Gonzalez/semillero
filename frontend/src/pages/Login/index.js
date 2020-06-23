// @Vendors
import React, {useCallback} from 'react'
import {useDispatch} from 'react-redux';

// Components
import AuthForm from './AuthForm'
import avatar from 'statics/images/logos/avatar_2x.png'

// @ActionsType
import {LOGIN} from 'state/auth/auth.actionsTypes'

// @Styles - component
import './index.scss'

function Login() {
	const dispatch = useDispatch()

	const handleSubmit = useCallback((data, actions) => {
	    const payload = {
	        username: data.username,
	        password: data.password
	    }
    	dispatch({ type: LOGIN, payload })
    	actions.setSubmitting(false);
  	}, [dispatch])

    return (
    	<React.Fragment>
	        <div className="box--login card--box">
	        	<div className="avatar">
	        		<img src={avatar} alt="avatar"/>
	        	</div>      
	            <AuthForm onSubmit={handleSubmit} ActionsButtons={
	            	<button type="submit">
	            		Ingresar
	            	</button>
	            }/>
	            {/*
	            <a href="#" style={{fontSize: "15px", textDecoration:"none", float: "right"}}>Recuperar contraseña</a>*/ }
	        </div>
    	</React.Fragment>
    )
}

export default Login