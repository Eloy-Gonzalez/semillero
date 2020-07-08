// @Vendors
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import jsonwebtoken from 'jsonwebtoken'
import CircularProgress from '@material-ui/core/CircularProgress'

// @ActionsTypes
import {VALIDATE_ACCOUNT} from 'state/auth/auth.actionsTypes'

import {selectLoading} from 'state/app/app.selectors'

function ActivateAccount({match}) {
	const execute = useDispatch()
	const loading = useSelector(state => selectLoading(state))

	useEffect( () => {
		const {params} = match
		const {token} = params
		
		const _TOKEN_ = jsonwebtoken.decode(token)

		if(_TOKEN_) {
			const {id, username} = _TOKEN_
			const payload = { id, username, actualizado_por: id}
			execute({ type: VALIDATE_ACCOUNT, payload})
		}
	}, [])

	return (
		<Grid container maxwidth="md" spacing={3} style={{minHeight: "300px"}} justify="center">
			<Grid item>
				<h1 style={{color: "var(--lightGreen)"}}>Activación de Cuenta</h1>
				<p style={{textAlign:"center"}}>{loading && <CircularProgress />}</p>
			</Grid>
		</Grid>
	)
}

export default withRouter(ActivateAccount)