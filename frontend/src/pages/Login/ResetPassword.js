// @Vendors
import React, {useState, useEffect, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import jsonwebtoken from 'jsonwebtoken'

// @State
import {updatePasswordSerice} from 'state/auth/auth.services'

// @ActionsTypes
import {REQUEST_SUCCESS, REQUEST_FAILURE} from 'state/app/app.actionTypes'

// @Components
import FormUpdatePassword from './FormUpdatePassword'

function ResetPassword({ match, history }) {
	const dispatch = useDispatch()
	const [state, setState] = useState({
		loading: false,
		username: null,
		token: null,
		expires: null
	})

	const handleSubmit = useCallback( async (values, actions) => {
		setState({...state, loading: true})
		const res = await updatePasswordSerice(values, state.token)
		const {data} = res

		if(data.alert.type === "success") {
			dispatch({ type: REQUEST_SUCCESS, payload: data.alert.message})
			setTimeout(() => history.push("/acceder"), 2000)
		} else {
			dispatch({
		        type: REQUEST_FAILURE,
		        payload: {
		          serverErrors: data.alert.message,
		          statusError: 502
		        }
		    })
		}
		setState({...state, loading: false})
		actions.setSubmitting(false)
	}, [history,dispatch, state])
	
	const verifyToken = useCallback( token => {
		const _TOKEN_ = jsonwebtoken.decode(token)
		const {exp, username} = _TOKEN_
		if(exp < Math.floor(Date.now() / 1000)) {
			setState({ ...state, expires: true})
		} else {
			setState({...state, username, token})
		}
	}, [setState])

	useEffect(() => {
		const {params} = match
		const {token} = params
		verifyToken(token)
	}, [match, verifyToken])

	return (
		<Grid container maxwidth="md" spacing={3} style={{minHeight: "300px"}} justify="center">
			{state.expires && <h1 style={{color: "red"}}>¡El Token ha expirado!</h1>}
			{state.expires === null && 
				<Grid item sm={12} md={5}>
					<h1 style={{color: "var(--lightGreen)"}}>Restablecer contraseña</h1>
					{state.username && <FormUpdatePassword 
						correo={state.username}
						onSubmit={handleSubmit}
						disabledButton={state.loading}
					/>}
				</Grid>
			}
		</Grid>
	)
}

export default withRouter(ResetPassword)