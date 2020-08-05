// @Vendors
import React, {Fragment, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

// @ActionsTypes
import {
	GET_CATEGORIAS,
	UPDATE_FILTERS,
	CREATE_CATEGORIA,
	UPDATE_CATEGORIA,
	DELETE_CATEGORIA
} from 'state/categorias/categorias.actionsTypes'

// @Components
import Table from 'components/Table'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import ActionsButtons from 'components/ActionsButtons'
import FormCategorias from './FormCategorias'

// @Icons
import RefreshIcon from '@material-ui/icons/Refresh'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

// @Actions
import {openModal, openDialogConfirm} from 'state/app/app.actions'

function Categorias(){
	const dispatch = useDispatch()
	const categorias = useSelector(state => state.categoriasReducer.get('categorias'))
	const filters = useSelector( state => state.categoriasReducer.get("filters"))
	const isLoading = useSelector(state => state.appReducer.get('loading'))

	const {rows, count} = categorias
    const {
      order,
      orderBy,
      page,
      rowsPerPage,
      selected,
    } = filters

	const columns = [
		{
			id: 'nombre',
			numeric: false,
			disablePadding: false,
			label: 'Nombre',
			rowProps: {
				component: 'th', scope: 'row'
			}
		},
		{
			id : 'acciones',
			numeric: false,
			disablePadding: true,
			label: null,
			rowProps: {
				component: 'th', scope: 'row',
				align: 'right'
			},
			render: (value, row) => {
				return (
					<div>
						<Tooltip title="Editar">
							<IconButton aria-label="Editar" onClick={() => updateCategoria(row.nombre, row.id, row.version)}>
								<EditIcon/>
							</IconButton>
						</Tooltip>
						<Tooltip title="Eliminar">
							<IconButton aria-label="Eliminar" onClick={() => deleteCategoria(row.id, row.version)}>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					</div>
				)
			}
		}
	]

	function deleteCategoria (id, version) {
		dispatch(openDialogConfirm({
			title:"Eliminar categoría",
			description: "¿Seguro de Eliminar este registro?",
			onConfirm: () => dispatch({type: DELETE_CATEGORIA, payload: {id, version}})
		}))
	}

	function updateCategoria(oldNombre="", id, version) {
		dispatch(openModal(
			<Fragment>
				<h1>Editar categoría</h1>
				<FormCategorias 
				initialValues={{ nombre: oldNombre }}
				onSubmit={ ( nombre ) => {
					dispatch({ type: UPDATE_CATEGORIA, payload: {nombre, id, version}})
				}}
				ActionsButtons={
					<ActionsButtons disableButton={isLoading}/>
				}
				/>
			</Fragment>
		))
	}

	const createCategoria = () => {
		dispatch(openModal(
			<Fragment>
				<h1>Crear nueva categoría</h1>
				<FormCategorias onSubmit={ (payload) => {
					dispatch({ type: CREATE_CATEGORIA, payload})
				}}
				ActionsButtons={
					<ActionsButtons disableButton={isLoading}/>
				}
				/>
			</Fragment>
		))
	}

	useEffect(() => {
  		dispatch({ type: GET_CATEGORIAS})
  	}, [dispatch])

	return (
		<Fragment>
			<h1>Administrar Categorias</h1>
				<div style={{textAlign:"center"}}>
					{
						!isLoading && <Tooltip title="Actualizar tabla">
						<IconButton onClick={() => dispatch({ type: GET_CATEGORIAS })}>
							<RefreshIcon style={{color:"#777"}}/>
						</IconButton>
					</Tooltip> }
					<Tooltip title="Registar nueva categoria">
		            	<IconButton onClick={createCategoria}>
		            		<AddCircleOutlineIcon style={{color: "#777"}}/>
		            	</IconButton>
			        </Tooltip>
				</div>

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
		</Fragment>
	)

}

export default Categorias