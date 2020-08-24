// @Vendors
import React, {useEffect, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'

// @ActionsTypes
import {
	GET_USUARIOS,
	UPDATE_FILTERS
} from 'state/admin/usuarios/usuarios.actionsTypes'
import {
	MODAL_OPEN
} from 'state/app/app.actionTypes'

// @Components
import Table from 'components/Table'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import DetailsUsuario from './DetailsUsuario'

// @Icons
import DoneAllIcon from '@material-ui/icons/DoneAll'
import CancelIcon from '@material-ui/icons/Cancel'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import RefreshIcon from '@material-ui/icons/Refresh'

function Usuarios(){
	const dispatch = useDispatch()
	const usuarios = useSelector(state => state.usuariosReducer.get("usuarios"))
	const filters = useSelector( state => state.usuariosReducer.get("filters"))
	const isLoading = useSelector(state => state.appReducer.get('loading'))

	const changeStatus = useCallback( (value, row) => {
		const payload = <DetailsUsuario loading={isLoading} data={ {value, row} } />
		dispatch({ type: MODAL_OPEN, payload })
	}, [dispatch, isLoading])

	const {rows, count} = usuarios
    const {
      order,
      orderBy,
      page,
      rowsPerPage,
      selected,
    } = filters

    const columns = [
		{
			id: 'row.Usuario',
			numeric: true,
			disablePadding: false,
			label: 'Usuario',
			rowProps: {
				component: 'th', scope: 'row'
			},
			render: (value, row) => {
				const {username} = row
				return <a onClick={() => changeStatus(value, row)} style={{color: "#444"}}>{username}</a>
			}
		},
		{
			numeric: true,
			disablePadding: false,
			label: 'Cédula',
			rowProps: {
				component: 'th', scope: 'row'
			},
			render: (value, row) => {
				let ci; 
				try {
					const {cedula} = row.usuarios_perfil
					ci = cedula
				} catch(err){
					ci = "(Valor no definido)"
				}
				return <span>{ci}</span>
			}
		},
		{
			id: 'nombre',
			numeric: true,
			disablePadding: false,
			label: 'Nombres',
			render: (value, row) => {
				const {primer_nombre, primer_apellido} = row.usuarios_perfil
				return <span> {primer_nombre} {primer_apellido}</span>
			}
		},
		{
			id: 'estatus',
			numeric: false,
			disablePadding: false,
			label: 'Estatus',
			render: (value, row) => {
				let b = '';
				const {borrado} = row
				if (borrado) { b = 'Usuario inactivo' } 
				else { b = 'Usuario activo' }
				return <span>{b}</span>
			}
		}
	]

	useEffect(() => {
		dispatch({ type: GET_USUARIOS })
	}, [dispatch])

	return (
		<Grid container maxwidth="md" spacing={2} justify="center">
			<Grid item sm={12}>
				<h1>Administrar Usuarios</h1>
				{
					!isLoading && 
					<div style={{textAlign:"center"}}>
						<Tooltip title="Actualizar tabla">
							<IconButton onClick={() => dispatch({ type: GET_USUARIOS })}>
								<RefreshIcon style={{color:"#777"}}/>
							</IconButton>
						</Tooltip>
					</div>
				}

        <Table
          isLoading={isLoading}
          fieldId="id"
          columns={columns}
          rows={rows}
          count={count}
          order={order}
          orderBy={orderBy}
          page={page}
          requestSort={ (order, orderBy) => {
          	dispatch({ 
        			type: UPDATE_FILTERS,
        			payload: { ...filters, order, orderBy }
          	})
          }}
          rowsPerPage={rowsPerPage}
          selected={selected}
          setPage={ page => {
          	dispatch({ 
        			type: UPDATE_FILTERS,
        			payload: { ...filters, page }
          	})
          }}
          setRowsPerPage={ rowsPerPage => {
          	dispatch({ 
        			type: UPDATE_FILTERS,
        			payload: { ...filters, rowsPerPage }
          	})
          }}
          setSelected={ selected => {
          	dispatch({ 
        			type: UPDATE_FILTERS,
        			payload: { ...filters, selected }
          	})
          }}
        />
			</Grid>
		</Grid>
	)

}

export default Usuarios