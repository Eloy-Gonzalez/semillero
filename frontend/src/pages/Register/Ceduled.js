// @Vendors
import React, {Suspense, useEffect} from 'react'
import {useSelector} from 'react-redux'

// @Actions
import {consultarSaime, setUbication, registerNewUser} from 'state/users/users.actions'

// @Material UI
import CircularProgress from '@material-ui/core/CircularProgress'

// @Selectors
import {selectProfiles, selectUbication} from 'state/users/users.selectors'

function Ceduled({PreviusStep = "", actualVisible, nextPrev, listFormiks, loading, ActionsButtons, dispatch, resetFormData	}){
	
	useEffect(() => {
		nextPrev(0)
		resetFormData()
	}, [nextPrev, resetFormData])

	const profiles = useSelector(state => selectProfiles(state))
	const ubication = useSelector(state => selectUbication(state))
	
	const listSubmit = React.useMemo( () => [
		function(values, actions) {
			const {nacionalidad, cedula} = values
			dispatch(consultarSaime({nacionalidad,cedula}))
		},
		function(e, nextForm) {
			e.preventDefault()
			e.stopPropagation()
			nextPrev(2)
		},
		function(values, actions) {
			dispatch(setUbication(values))
			nextPrev(3)
		},
		function(values, actions) {
			const payload = {...profiles, ...ubication, ...values}
			dispatch(registerNewUser(payload))
		}
	], [dispatch, nextPrev, profiles, ubication])
	const VisualizedForm = listFormiks[actualVisible]

	return (
        <div className="target">
        	{PreviusStep}
        	<Suspense fallback={<div style={{textAlign:"center"}}><CircularProgress /></div>}>
	        	<VisualizedForm
	            	title={actualVisible === 0 ? "Cédula del participante" : actualVisible === 2 && "Datos Personales"}
	            	onSubmit={listSubmit[actualVisible]}
	            	ActionsButtons={
	              		<ActionsButtons 
	                	actualVisible={actualVisible}
	                	totalForms={(listFormiks.length -1)}
	                	nextPrev={nextPrev}
	                	disabledButton={loading}
	              	/>}
	          	/>
          	</Suspense>
        </div>
	)
}

export default React.memo(Ceduled)