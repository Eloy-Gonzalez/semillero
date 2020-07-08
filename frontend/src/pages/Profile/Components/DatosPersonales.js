// @Vendors
import React, {Fragment} from 'react'
import moment from 'moment'
import 'moment/locale/es'

// @MaterialUI
import CardSimple from 'components/CardSimple'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'

// @Components
import Avatar from 'components/Avatar'

function DatosPersonales({user = [], onEdit,showEdit} = {}) {
	const {
		id_usuario,
		version,
		cedula,
		primer_nombre,
		segundo_nombre,
		primer_apellido,
		segundo_apellido,
		fecha_nacimiento
	} = user

	return (
		<Fragment>
			<h2 style={{color:"var(--darkBlue)"}}>Datos Personales</h2>
			<CardSimple>
				<p style={{display:"flex",flexFlow:"column wrap", alignItems:"center",justifyContent: "center"}}>
					<Avatar width="100px" height="100px" />
					{showEdit && <Tooltip title="Modificar datos">
		              <IconButton aria-label="Editar" onClick={() => onEdit(id_usuario, version)}>
		                <EditIcon/>
		              </IconButton>
		            </Tooltip>}
				</p>
				<p style={{fontWeight:"bold"}}>C.I {cedula}</p>
				<p style={{fontWeight:"bold"}}>
					{`${primer_nombre} ${segundo_nombre} ${primer_apellido} ${segundo_apellido}`}
				</p>
				<p style={{fontWeight:"bold"}}>
					Nacimiento: {moment(fecha_nacimiento,"YYYYMMDD").calendar()}
					&nbsp; | &nbsp;
					Edad: {moment(fecha_nacimiento, "YYYYMMDD").fromNow().replace("hace", "")}
				</p>
			</CardSimple>
		</Fragment>
	)
}

export default React.memo(DatosPersonales)