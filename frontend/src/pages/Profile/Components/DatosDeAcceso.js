// @Vendors
import React, {Fragment} from 'react'

// @MaterialUI
import CardSimple from 'components/CardSimple'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'

function DatosPersonales({ account = [], onEdit, showEdit } = {}) {
	const {
		id_usuario,
		version,
		username
	} = account

	return (
		<Fragment>
			<h2 style={{color:"var(--darkBlue)"}}>Datos de Acceso</h2>
			<CardSimple>
				{showEdit &&  <Tooltip title="Modificar datos">
                  <IconButton aria-label="Editar" onClick={() => onEdit(id_usuario, version)}>
                    <EditIcon/>
                  </IconButton>
                </Tooltip>
            	}
            	<p style={{fontWeight:"bold"}}>Correo electónico: &nbsp; {username}</p>
            	<p style={{fontWeight:"bold"}}>Contraseña: &nbsp; *******</p>
			</CardSimple>
		</Fragment>
	)
}

export default React.memo(DatosPersonales)