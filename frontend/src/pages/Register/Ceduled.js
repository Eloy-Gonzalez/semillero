// @Vendors
import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'

// @Actions
import {consultarSaime, setUbication, registerNewUser} from 'state/users/users.actions'

// @Selectors
import {selectProfiles, selectUbication} from 'state/users/users.selectors'

function Ceduled({actualVisible, nextPrev, listFormiks, loading, ActionsButtons, dispatch, resetFormData	}){
	
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
			const payload = {...profiles, ...ubication, ...values, id_pregunta: 1, respuesta_seguridad: 'MUÑECA'}
			dispatch(registerNewUser(payload))
		}
	], [dispatch, nextPrev, profiles, ubication])
	const VisualizedForm = listFormiks[actualVisible]

	return (
        <div className="target">
          <VisualizedForm
            onSubmit={listSubmit[actualVisible]}
            ActionsButtons={
              <ActionsButtons 
                actualVisible={actualVisible}
                totalForms={(listFormiks.length -1)}
                nextPrev={nextPrev}
                disabledButton={loading}
              />}
          />
        </div>
	)
}

export default React.memo(Ceduled)