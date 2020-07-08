// @Vendors
import React, {Fragment} from 'react'
import {lowerCase,upperFirst} from 'lodash'

// @MaterialUI
import CardSimple from 'components/CardSimple'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

function DatosDomicilio({ubication = [], onEdit,showEdit} = {}) {

	const {
		id_usuario,
		version,
		telefono_habitacional,
		telefono_personal,
		direccion_habitacional,
		parroquia: paq
	} = ubication

	if(paq ===  undefined || paq.municipio === undefined || paq.municipio.estado === undefined){
		return <p>Cargando...</p>
	}

	return (
		<Fragment>
			<h2 style={{color:"var(--darkBlue)"}}>Datos Domiciliarios</h2>
			<CardSimple>
				{showEdit && <Tooltip title="Modificar datos">
                  <IconButton aria-label="Editar" onClick={() => onEdit(id_usuario, version)}>
                    <EditIcon/>
                  </IconButton>
                </Tooltip> }
		      <Table aria-label="simple table">
		        <TableBody>
		            <TableRow>
		              <TableCell component="th" scope="row">Teléfono Personal</TableCell>
		              <TableCell component="th" scope="row">{telefono_personal}</TableCell>
		            </TableRow>
		            <TableRow>
		              <TableCell component="th" scope="row">Teléfono de Habitación</TableCell>
		              <TableCell component="th" scope="row">
		                {telefono_habitacional === "" ? <i style={{color: "#d65b5b"}}>(No posee)</i> : telefono_habitacional}
		              </TableCell>
		            </TableRow>
		            <TableRow>
		              <TableCell component="th" scope="row">Estado</TableCell>
		              <TableCell component="th" scope="row">{paq.municipio.estado ? upperFirst(lowerCase(paq.municipio.estado.nombre)) : "Cargando..."}</TableCell>
		            </TableRow>
		            <TableRow>
		              <TableCell component="th" scope="row">Municipio</TableCell>
		              <TableCell component="th" scope="row">{paq.municipio.nombre ? upperFirst(lowerCase(paq.municipio.nombre)) : "Cargando..."}</TableCell>
		            </TableRow>
		            <TableRow>
		              <TableCell component="th" scope="row">Parroquia</TableCell>
		              <TableCell component="th" scope="row">{paq.nombre ? upperFirst(lowerCase(paq.nombre)) : "Cargando..."}</TableCell>
		            </TableRow>
		            <TableRow>
		              <TableCell component="th" scope="row">Dirección de Habitación</TableCell>
		              <TableCell component="th" scope="row">{direccion_habitacional ? upperFirst(lowerCase(direccion_habitacional)) : "Cargando..."}</TableCell>
		            </TableRow>
		       </TableBody>
		      </Table>
			</CardSimple>
		</Fragment>
	)
}

export default React.memo(DatosDomicilio)