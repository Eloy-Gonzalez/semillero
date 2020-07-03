// @Vendors
import React, {useEffect} from 'react'

// @Material UI
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

function CustomTable({  onLoading, handleDelete }){
	const classes = useStyles()
	const columns = [
		{title: "Nombre", field: "nombre"},
		{title: "Fecha inicio", field: "fecha_desde"},
		{title: "Fecha fin", field: "fecha_hasta"}
	]

	const rows = [
		{ id:1, nombre: "PERIODO i", fecha_desde: "2020-06-10", fecha_hasta:"2020-06-30" },
		{ id:2, nombre: "PERIODO ii", fecha_desde: "2020-06-10", fecha_hasta:"2020-06-30" },
		{ id:3, nombre: "PERIODO iii", fecha_desde: "2020-06-10", fecha_hasta:"2020-06-30" },
		{ id:4, nombre: "PERIODO iiiii", fecha_desde: "2020-06-10", fecha_hasta:"2020-06-30" }
	]

	useEffect(() => {
		columns.map((column) => {
			console.log(column)
		})

	}, [])

	return (
	    <TableContainer component={Paper}>
	      <Table className={classes.table} aria-label="Tabla custom">
	        <TableHead>
	          <TableRow>
	          	{ columns.map((index) => (
	            	<TableCell align="center" key={index.id}>{index.label}</TableCell>
	          	))}
	          </TableRow>
	        </TableHead>
	        <TableBody>
	        {
	          onLoading && 
	          [rows.length].map((ind) => (
	            <TableRow key={ind}>
	                <TableCell component="th" colSpan={columns.length} align="center" scope="row">
	                  Cargando...
	                </TableCell>
	            </TableRow>
	          ))
	        }

	          { !onLoading && rows.length ? rows.map((row) => (
	            <TableRow key={row.id}>
	              <TableCell component="th" scope="row">
	                {row.nombre}
	              </TableCell>
	              <TableCell align="center">{row.descripcion}</TableCell>
	              <TableCell align="center"><a href={row.url_video} target="_blank" rel="noopener noreferrer" style={{color: "#444"}}>{row.url_video}</a></TableCell>
	              <TableCell align="right">
	                <Tooltip title="Eliminar">
	                  <IconButton aria-label="Eliminar" onClick={() => handleDelete(row.id, row.version)}>
	                    <DeleteIcon />
	                  </IconButton>
	                </Tooltip>
	              </TableCell>
	            </TableRow>
	          )) : 
	          	<TableRow>
	              <TableCell component="th" colSpan={columns.length} align="center" scope="row">
	                No ha datos que mostrar
	              </TableCell>
	            </TableRow>}
	        </TableBody>
	      </Table>
	    </TableContainer>
	)
}
export default React.memo(CustomTable)