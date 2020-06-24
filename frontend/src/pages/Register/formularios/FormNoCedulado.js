// @Vendors
import React from 'react'

// @Components - Forms
import FormSearchCedula from "./FormSearchCedula"

function FormNoCedulado({ searchSaime, onSubmit, ActionsButtons=""}) {	
	return (
		<React.Fragment>
			<FormSearchCedula title="Inidicar cedula del representante" onSubmit={searchSaime} nextForm={2} ActionsButtons={ActionsButtons}/>
		</React.Fragment>
	)
}
export default React.memo(FormNoCedulado)