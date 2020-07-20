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
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress'

import 'moment/locale/es'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})


function TablePeriodos({ columns = [], rows = [], handleView, handleEdit, handleDelete,  handleSubmit=null, onLoading, pagination =""}) {
  const classes = useStyles()

  return (
    <React.Fragment>
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
                  <CircularProgress/>
                </TableCell>
            </TableRow>
        }

          { !onLoading && rows.length ? rows.map((row) => (
            <TableRow key={row.nombre}>
              <TableCell component="th" scope="row">
                {row.nombre}
              </TableCell>

              <TableCell align="center">
                {moment(row.fecha_desde).format("DD [de] MMMM YYYY")}
              </TableCell>
              
              <TableCell align="center">
                {moment(row.fecha_hasta).format("DD [de] MMMM YYYY")}
              </TableCell>
              
              <TableCell align="center">
                {row.estado ? <i style={{color: "green"}}>Activo</i> : <i style={{color: "red"}}>Inactivo</i>}
              </TableCell>
              
              <TableCell align="right">
                <Tooltip title="Detalles">
                  <IconButton aria-label="Ver" onClick={() => handleView(row.id)}>
                    <ListAltIcon/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editar">
                  <IconButton aria-label="Editar" onClick={() => handleEdit(row.id, row.version)}>
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
          !onLoading && 
          	<TableRow>
              <TableCell component="th" colSpan={columns.length+1} align="center" scope="row">
                No ha datos que mostrar
              </TableCell>
            </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  )
}

export default React.memo(TablePeriodos)