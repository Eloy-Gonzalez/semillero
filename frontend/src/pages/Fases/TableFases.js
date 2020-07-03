import React from 'react'
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
import EditIcon from '@material-ui/icons/Edit'
import ListAltIcon from '@material-ui/icons/ListAlt'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})


function TableFases({ columns = [], rows = [], handleView, handleEdit, handleDelete,  handleSubmit=null, onLoading, pagination =""}) {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Periodos">
        <TableHead>
          <TableRow>
          	{ columns.map((index, value) => (
            	<TableCell align="center" key={value}>{index.title}</TableCell>
          	))}
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          onLoading && 
            <TableRow >
                <TableCell component="th" colSpan={columns.length+1} align="center" scope="row">
                  Cargando...
                </TableCell>
            </TableRow>
        }

          { !onLoading && rows.length ? rows.map((row) => (
            <TableRow key={row.nombre}>
              <TableCell component="th" scope="row">
                {row.nombre}
              </TableCell>

              <TableCell align="center">
                {row.fecha_desde}
              </TableCell>
              
              <TableCell align="center">
                {row.fecha_hasta}
              </TableCell>
              
              <TableCell align="center">
                {row.estado ? "Activo" : "Inactivo"}
              </TableCell>
              
              <TableCell align="right">
                <Tooltip title="Detalles">
                  <IconButton aria-label="Eliminar" onClick={() => handleView(row.id)}>
                    <ListAltIcon/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editar">
                  <IconButton aria-label="Eliminar" onClick={() => handleEdit(row.id)}>
                    <EditIcon/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton aria-label="Eliminar" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>              
            </TableRow>
          )) : 
          	<TableRow>
              <TableCell component="th" colSpan={columns.length+1} align="center" scope="row">
                No ha datos que mostrar
              </TableCell>
            </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default React.memo(TableFases)