// @Vendors
import React, {Fragment, useState, useEffect, useCallback} from 'react'
import {useDispatch,useSelector} from 'react-redux'

// @ActionsTypes
import {GET_PERIODOS} from 'state/periodos/periodos.actionsTypes'

// @Components
import TablePeriodos from './TablePeriodos'
import Pagination from 'components/Pagination'
import FormPeriodos from './FormPeriodos'
import ActionsButtons from 'components/ActionsButtons'

// @Material UI
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

// @Hooks
import usePagination from 'hooks/usePagination'

// @Actions
import {openModal, openDialogConfirm} from 'state/app/app.actions'

// @ActionsTypes
import {
	CREATE_PERIODO,
	UPDATE_PERIODO,
	DELETE_PERIODO
} from 'state/periodos/periodos.actionsTypes'

function Periodos(){
	const dispatch = useDispatch()
	const periodos = useSelector(state => state.periodosReducer.get('periodos'))
	const loading = useSelector(state => state.appReducer.get('loading'))
	const [showForm, setShowForm] = useState(false)
	
	const {
		currentPost,
		postsPerPage,
		setCurrentPage
	} = usePagination({ posts: periodos, postsPerPage: 10})

	const columns = [
		{title: "Nombre"},
		{title: "Fecha de inicio"},
		{title: "Fecha de fin"},
		{title: "Estatus"},
	]

	useEffect(() => {
  		dispatch({type: GET_PERIODOS})
  	}, [])

  	const onView = (id) => {
  		alert(id)
  	}

  	const onEdit = (id) => {
  		const editPeriodo = periodos.filter((prd) => prd.id === id )

  		console.log(editPeriodo)

  		dispatch(openModal(
  			<Fragment>
	  			<h1>Editar periodo</h1>
				<FormPeriodos
					initValues={editPeriodo}
					onSubmit={(values) => {
					console.log(values)
					}}
					ActionsButtons={
						<ActionsButtons disableButton={loading}/>
					}
				/>
  			</Fragment>
		))
  	}
	
	const onDelete = useCallback((id, version) => {
		const payload = {id, version, periodos}
		dispatch(openDialogConfirm({
			title:"Eliminar período",
			description: "¿Seguro de Eliminar este elemento?",
			onConfirm: () => dispatch({type: DELETE_PERIODO, payload})
		}))
	}, [periodos, dispatch])

  	const onCreate = (values) => {
  		console.log(values)
  	}

	return (
		<Fragment>
			<h1>{( showForm ? "Crear Nuevo Período" : "Administrar Periodos")}</h1>
			<IconButton onClick={() => setShowForm(prev => !prev)}>
				{( showForm 
					? <Tooltip title="Regresar">
						<ArrowBackIosIcon/>
					</Tooltip>
		            : <Tooltip title="Registar nuevo período">
		            	<AddCircleOutlineIcon />
		            </Tooltip>
				)}
			</IconButton>
			{(
				showForm 
				?
					<FormPeriodos onSubmit={onCreate} ActionsButtons={
						<ActionsButtons 
		                	actualVisible={0}
		                	totalForms={0}
		                	disabledButton={loading}
	                	/>
					}/>
				:
				<Fragment>
					<TablePeriodos
						columns={columns}
						rows={currentPost}
						onLoading={loading}
						handleView={onView}
						handleEdit={onEdit}
						handleDelete={onDelete}
					/>
					<Pagination 
						totalPosts={periodos.length}
						postsPerPage={postsPerPage}
						changePage={setCurrentPage}
					/> 
				</Fragment>
			)}
		</Fragment>
	)

}

export default React.memo(Periodos)