// @Vendors
import React, [useState, useEffect] from 'react'
import Grid from '@material-ui/core/Grid'

// @Componenets
import FormRecoverPass from './FormRecoverPass'

// @ActionsTypes
import {RECOVER_PASS} from 'state/auth/auth.actionsTypes'

// @ActionsTypes
import {recoverPass} from 'state/auth/auth.actions'

import {checkUserService} from 'state/auth/auth.services'

export default function RecoverPass(props) {

	const [state, setState] = useState({
		pregunta: "",
		showForm: true,
	})

	const handleRecoverPass = useCallback((data, actions) => {
		checkUserService(data).then(res => {
			console.log(res)

		})
		actions.setSubmitting(false)
	}, [dispatch])

	return  (
		<Fragment>
			<h2 style={{color:"var(--lightGreen)"}}>Recuperar contraseña</h2>
			{state.showForm && FormRecoverPass}
		</Fragment>
	)

}