// @Vendors
import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'

// @Actions
import {consultarSaime, setUbication, registerNewUser, setProfiles} from 'state/users/users.actions'

// @Selectors
import {selectProfiles, selectUbication, selectRepresentant} from 'state/users/users.selectors'

function NotCeduled({actualVisible, nextPrev, listFormiks, loading, ActionsButtons, dispatch, resetFormData}){
	
	useEffect(() => {
		nextPrev(0)
		resetFormData()
	}, [nextPrev, resetFormData])

	const profiles = useSelector(state => selectProfiles(state))
	const representante = useSelector(state => selectRepresentant(state))
	const ubication = useSelector(state => selectUbication(state))

	const listSubmit = React.useMemo( () => [
		function(values, actions) {
			const {cedula} = values
			dispatch(consultarSaime({cedula, isRepre:true}))
		},
		function(e) {
			e.preventDefault()
			e.stopPropagation()
			nextPrev(2)
		},
		function(values, actions){
			const payload = {...values}
			dispatch(setProfiles(payload))
			nextPrev(3)
		},
		function(values, actions) {
			dispatch(setUbication(values))
			nextPrev(4)
		},
		function(values, actions) {
			const payload = {...representante, ...profiles, ...ubication, ...values, id_pregunta: 1, respuesta_seguridad: 'MUÑECA'}

			dispatch(registerNewUser(payload))
		}
	], [dispatch, nextPrev, profiles, representante, ubication])
	const VisualizedForm = listFormiks[actualVisible]

	return (
        <div className="target">
          <VisualizedForm
          	title={actualVisible === 0 ? "Consultar cedula representante" : actualVisible === 2 && "Datos del participante"}
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

export default React.memo(NotCeduled)