// @Vendors
import React, {Fragment,useEffect, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'

// @Material UI
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

// @Selectors 
import {selectProyects} from 'state/proyects/proyects.selectors'

// @Actions
import {getProyects, createProyectAction, deleteProyectAction} from 'state/proyects/proyects.actions'
import {openModal, openDialogConfirm} from 'state/app/app.actions'

// @Selectors
import {selectLoading} from 'state/app/app.selectors'

// @Components
import Pagination from 'components/Pagination'
import TableProyects from './TableProyects'
import FormAddProyects from './FormAddProyects'
import ActionsButtons from 'components/ActionsButtons'

// @Hooks
import usePagination from 'hooks/usePagination'

function ProyectsProfiles() {
	const dispatch = useDispatch()
	const proyects = useSelector(state => selectProyects(state))
	const loading = useSelector(state => selectLoading(state))
	const {
		currentPost,
		postsPerPage,
		setCurrentPage
	} = usePagination({ posts: proyects})

	useEffect(() => {
		dispatch(getProyects())
	}, [dispatch])

	const columns = [
		{label: "Nombre"},
		{label: "Descripción"},
		{label:"Hipervínculo"},
		{label:"Estatus"}
	]

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
				ActionsButtons={<ActionsButtons disableButton={loading}/>}
			/>)
		)
	}, [dispatch, loading, onSubmit])

	return (
		<Fragment>
			<p style={{textAlign:"right"}}>
				<span style={{fontSize:"1.2em"}}>Nuevo video</span>
				<Tooltip title="Registrar nuevo video">
					<IconButton 
						aria-label="Crear nuevo"
						onClick={createProyect}
					>
	                    <AddCircleOutlineIcon />
	                 </IconButton>
                </Tooltip>
			</p>
			<TableProyects
				columns={columns}
				rows={currentPost}
				handleDelete={onDelete}
				onLoading={loading}
			/>
			<Pagination 
				totalPosts={proyects.length}
				postsPerPage={postsPerPage}
				changePage={setCurrentPage}
			/>
		</Fragment>
	)
}

export default ProyectsProfiles