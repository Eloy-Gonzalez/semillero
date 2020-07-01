// @Vendors
import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux';

// Components
import AuthForm from './AuthForm'
import avatar from 'statics/images/logos/avatar_2x.png'

// @Actions
import {login} from 'state/auth/auth.actions'

// @Selectors
import {selectLoading} from 'state/app/app.selectors' 

// @Styles - component
import './index.scss'

function Login() {
	const dispatch = useDispatch()
	const loading = useSelector(state => selectLoading(state))

	const handleSubmit = useCallback((data, actions) => {
	    const payload = {
	        username: data.username,
	        password: data.password
	    }
    	dispatch(login(payload))
    	actions.setSubmitting(false)
  	}, [dispatch])

    return (
    	<React.Fragment>
	        <div className="box--login card--box" style={{textAlign: "center"}}>
	        	<div className="avatar">
	        		<img src={avatar} alt="avatar"/>
	        	</div>    
	        	<p style={{fontSize: "30px",fontWeight: "bold",color: "#2C395E"}}>Iniciar Sesión</p>  
	            <AuthForm onSubmit={handleSubmit} disabledButton={loading}/>
	        </div>
    	</React.Fragment>
    )
}

export default Login