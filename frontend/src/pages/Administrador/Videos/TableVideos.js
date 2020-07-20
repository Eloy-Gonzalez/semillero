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
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})


function TableVideos({ columns = [], rows = [], handleEdit, handleDelete,  handleSubmit=null, onLoading, pagination ="", handleView}) {
  const classes = useStyles()

  return (
    <React.Fragment>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Videos">
        <TableHead>
          <TableRow>
          	{ columns.map((index, value) => (
            	<TableCell align="left" key={value}>{index.title}</TableCell>
          	))}
            <TableCell align="center" style={{minWidth: "145px"}}>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          onLoading && 
            <TableRow >
                <TableCell component="th" colSpan={columns.length+1} align="center" scope="row">
                  <CircularProgress />
                </TableCell>
            </TableRow>
        }

          { !onLoading && rows.length ? rows.map((row, position) => (
            <TableRow key={position}>
              <TableCell component="th" scope="row">
                {row.Usuario.usuarios_perfil.cedula}
              </TableCell>
              <TableCell component="th" scope="row">
                {`${row.Usuario.usuarios_perfil.primer_nombre} ${row.Usuario.usuarios_perfil.primer_apellido}`}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.nombre}
              </TableCell>
              <TableCell component="th" scope="row">
                <a href={row.url_video} target="_blank" rel="noopener noreferrer" style={{color: "#444"}}>{row.url_video}</a>
              </TableCell>
              <TableCell align="center">
                  <i style={{
                    color: row.id_estatus === 1 ? "#ffbc01"
                    : rows.id_estatus === 2 ? "#778e1f"
                    : "#d65b5b"
                  }}>
                    {
                      row.id_estatus === 1 ? "En revisión..."
                      : rows.id_estatus === 2 ? "Aprobado"
                      : "Rechazado" }
                  </i>
              </TableCell>

              <TableCell align="right">
                <Tooltip title="Detalles">
                  <IconButton aria-label="Detalles" onClick={() => handleView(row)}>
                    <AssignmentIndIcon/>
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

export default React.memo(TableVideos)