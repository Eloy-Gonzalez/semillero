// @Vendors
import React from 'react'

// @Components - Forms
import FormUsuariosPerfil from './FormUsuariosPerfil'
import FormSearchCedula from "./FormSearchCedula"

function FormNoCedulado({ searchSaime, onSubmit, ActionsButtons="", isNewRecord}) {	
	return (
		<React.Fragment>
			<FormSearchCedula title="Inidicar cedula del representante" onSubmit={searchSaime}/>
			<FormUsuariosPerfil title="Datos del participante" onSubmit={onSubmit} isNewRecord={isNewRecord}/>
			<FormUsuariosPerfil title="Datos del representante" onSubmit={onSubmit} isNewRecord={isNewRecord}/>
			{ActionsButtons}
		</React.Fragment>
	)
}
export default FormNoCedulado