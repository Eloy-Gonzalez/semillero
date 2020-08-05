// @Vendors
import React, {Fragment,useEffect, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import 	{
	startCase,
	toLower
} from 'lodash'

// @Material UI
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

// @Icons
import RefreshIcon from '@material-ui/icons/Refresh' 
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import CancelIcon from '@material-ui/icons/Cancel'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import DeleteIcon from '@material-ui/icons/Delete'

// @Actions
import {getProyects, createProyectAction, deleteProyectAction} from 'state/proyects/proyects.actions'
import {openModal, openDialogConfirm} from 'state/app/app.actions'

// @AtionsTypes
import  {
	GET_PROYECTS,
	UPDATE_FILTERS
} from 'state/proyects/proyects.actionsTypes'

// @Components
import FormAddProyects from './FormAddProyects'
import ActionsButtons from 'components/ActionsButtons'
import Table from 'components/Table'

function ProyectsProfiles() {
	const dispatch = useDispatch()
	const proyects = useSelector(state => state.proyectsReducer.get("proyects"))
	const filters = useSelector(state => state.proyectsReducer.get("filters"))
	const isLoading = useSelector(state => state.appReducer.get("loading"))

    const {
      order,
      orderBy,
      page,
      rowsPerPage,
      selected,
    } = filters 


	const onSubmit = useCallback((values, actions) => {
		dispatch(createProyectAction(values))
	}, [dispatch])

	const onDelete = useCallback((id, version) => {
		const payload = {id, version, proyects}

		dispatch(openDialogConfirm({
			title:"Eliminar video",
			description: "¿Seguro de Eliminar este elemento?",
			onConfirm: () => dispatch(deleteProyectAction(payload))
		}))
	}, [proyects, dispatch])	

	const createProyect = useCallback(() => {
		dispatch(openModal(
			<FormAddProyects 
				onSubmit={onSubmit}
				ActionsButtons={<ActionsButtons disableButton={isLoading}/>}
			/>)
		)
	}, [dispatch, isLoading, onSubmit])

	const columns = [
		{ 
			id: 'nombre',
			numeric: true,
			disablePadding: false,
			label: 'Video',
			rowProps: {
				component: 'th', scope: 'row'
			},
			render: (value, row) => {
				return <a href={row.url_video} target="_blank" rel="noopener noreferrer" style={{color: "#444"}}> {startCase(toLower(value))} </a>
			}
		},
		{ 
			id: 'descripcion',
			numeric: true,
			disablePadding: false,
			label: 'Descripción',
			render: (value) => {
				return <span>{startCase(toLower(value))}</span>
			}
		},
		{
			id: 'id_estatus',
			numeric: true,
			disablePadding: true,
			label: "Estado",
			render: (value, row) => {
				const title = value === 1 
				? "En revisión..."
				: value === 2 
					? "¡Verificado!" : "¡Rechazado!"

				return (
					<div style={{ display:"flex",alignItems:"center" }}>
						<Tooltip title={title}>
							{(
								value === 1 
								? <AccessTimeIcon/>
								: value === 2 ? <DoneAllIcon style={{color:"#39a838"}}/>
								: <CancelIcon style={{color: "#ca626c"}}/>
							)}
						</Tooltip>
						<IconButton onClick={() => onDelete(row.id, row.version)}>
							<Tooltip title="Eliminar este video">
								<DeleteIcon/>
							</Tooltip>
						</IconButton>
					</div>
				)
			}
		}
	] 

	useEffect(() => {
		dispatch(getProyects())
	}, [dispatch])
	return (
		<Fragment>
			<p style={{textAlign:"center"}}>
				<Tooltip title="Recargar tabla">
					<IconButton 
						aria-label="Recargar tabla"
						onClick={() => dispatch({ type: GET_PROYECTS})}
					>
						<RefreshIcon />
	                 </IconButton>
                </Tooltip>
				<Tooltip title="Registrar nuevo video">
					<IconButton 
						aria-label="Crear nuevo"
						onClick={createProyect}
					>
	                    <AddCircleOutlineIcon />
	                 </IconButton>
                </Tooltip>
			</p>

	            <Table
	              isLoading={isLoading}
	              fieldId="id"
	              columns={columns}
	              rows={proyects}
	              count={proyects.length}
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

export default ProyectsProfiles