// @Vendors
import React, {Suspense, useEffect} from 'react'
import {useSelector} from 'react-redux'

// @ActionsTypes
import {REQUEST_FAILURE} from 'state/app/app.actionTypes'

// @Actions
import {consultarSaime, setUbication, registerNewUser, setProfiles} from 'state/users/users.actions'

// @Material UI
import CircularProgress from '@material-ui/core/CircularProgress'

// @Selectors
import {selectProfiles, selectUbication, selectRepresentant} from 'state/users/users.selectors'

// @Utils
import {compareAge} from "utils/helpers"

function NotCeduled({PreviusStep = "", actualVisible, nextPrev, listFormiks, loading, ActionsButtons, dispatch, resetFormData}){
	
	useEffect(() => {
		nextPrev(0)
		resetFormData()
	}, [nextPrev, resetFormData])

	const profiles = useSelector(state => selectProfiles(state))
	const representante = useSelector(state => selectRepresentant(state))
	const ubication = useSelector(state => selectUbication(state))

	const listSubmit = React.useMemo( () => [
		function(values, actions) {
			const {nacionalidad, cedula} = values
			dispatch(consultarSaime({nacionalidad, cedula, isRepre:true}))
		},
		function(e) {
			e.preventDefault()
			e.stopPropagation()
			nextPrev(2)
		},
		function(values, actions){
			const {fecha_nacimiento} = values
			const payload = {...values}
			
			if(compareAge(fecha_nacimiento, 35)){
				dispatch(setProfiles(payload))
				nextPrev(3)
			} else {
		        dispatch( { type: REQUEST_FAILURE,
		        	payload: {
    		          serverErrors: "Usuarios mayores a 35 años, ¡No participan!", 
    		          statusError: 502 }
		        })
			}
		},
		function(values, actions) {
			dispatch(setUbication(values))
			nextPrev(4)
		},
		function(values, actions) {
			const payload = {...representante, ...profiles, ...ubication, ...values}

			dispatch(registerNewUser(payload))
		}
	], [dispatch, nextPrev, profiles, representante, ubication])
	const VisualizedForm = listFormiks[actualVisible]

	return (
        <div className="target">
        	{PreviusStep}
        	<Suspense fallback={<div style={{textAlign:"center"}}><CircularProgress /></div>}>
	        	<VisualizedForm
	          		title={actualVisible === 0 ? "Cédula del representante" : actualVisible === 2 && "Datos Personales del Participante"}
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

export default React.memo(NotCeduled)