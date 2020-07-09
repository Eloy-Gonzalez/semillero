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

const useStyles = makeStyles({
  table: {
    maxWidth: "100%"
  },
})


function SimpleTable({ columns = [], rows = [], handleDelete, handleSubmit=null, onLoading}) {
  const classes = useStyles()

  return (
    <React.Fragment>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Tabla simple">
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
    </React.Fragment>
  )
}

export default React.memo(SimpleTable)