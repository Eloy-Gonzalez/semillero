// @Vendors
import React, {Fragment} from 'react'
import moment from 'moment'
import 'moment/locale/es'

// @MaterialUI
import CardSimple from 'components/CardSimple'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

// @Components

function DatosRepresentante({representant = [], onEdit,showEdit} = {}) {

	const {
		cedula_representante,
		primer_nombre_representante,
		segundo_nombre_representante,
		primer_apellido_representante,
		segundo_apellido_representante,
		fecha_nacimiento_representate
	} = representant
	
	const nombres = `${primer_nombre_representante} ${segundo_nombre_representante}`
	const apellidos = `${primer_apellido_representante} ${segundo_apellido_representante}`

	return (
		<Fragment>
			<h2 style={{color:"var(--darkBlue)"}}>Datos Domiciliarios</h2>
			<CardSimple>
				{showEdit && <Tooltip title="Modificar datos">
                  <IconButton aria-label="Editar">
                    <EditIcon/>
                  </IconButton>
                </Tooltip> }
		      <Table aria-label="simple table">
		        <TableBody>
		            <TableRow>
		              <TableCell component="th" scope="row">Cédula</TableCell>
		              <TableCell component="th" scope="row">{cedula_representante}</TableCell>
		            </TableRow>
		            <TableRow>
		              <TableCell component="th" scope="row">Nombres</TableCell>
		              <TableCell component="th" scope="row">{nombres}</TableCell>
		            </TableRow>
		            <TableRow>
		              <TableCell component="th" scope="row">Apellidos</TableCell>
		              <TableCell component="th" scope="row">{apellidos}</TableCell>
		            </TableRow>
		            <TableRow>
		              <TableCell component="th" scope="row">Fecha de nacimiento</TableCell>
		              <TableCell component="th" scope="row">{moment(fecha_nacimiento_representate,"YYYYMMDD").calendar()}</TableCell>
		            </TableRow>
		       </TableBody>
		      </Table>
			</CardSimple>
		</Fragment>
	)
}

export default React.memo(DatosRepresentante)