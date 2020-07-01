// @Vendors
import React, {useEffect, useCallback, useMemo, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

// @Material UI
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

// @Selectors 
import {selectProyects} from 'state/proyects/proyects.selectors'

// @Actions
import {getProyects, createProyectAction, deleteProyectAction} from 'state/proyects/proyects.actions'
import {openModal, closeModal} from 'state/app/app.actions'

// @Components
import Pagination from 'components/Pagination'
import SimpleTable from 'components/SimpleTable'
import FormAddProyects from './FormAddProyects'
import ActionsButtons from 'components/ActionsButtons'
import MaterialModal from 'components/Modal'

// Selectors
import {selectLoading, selectModal} from 'state/app/app.selectors'

function ProyectsProfiles() {
	const dispatch = useDispatch()
	const proyects = useSelector(state => selectProyects(state))
	const loading = useSelector(state => selectLoading(state))
	const modal = useSelector(state => selectModal(state))
	
	useEffect(() => {
		dispatch(getProyects())
	}, [dispatch])

	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage] = useState(5)
	
	// Get Index of Posts
	const indexOfLastPost = currentPage * postsPerPage
	const indexOfFirstPost = indexOfLastPost - postsPerPage
	const currentPost = proyects.slice(indexOfFirstPost, indexOfLastPost)

	const columns = useMemo(() => [
		{id:0, label: "Nombre"},
		{id:1, label: "Descripción"},
		{id:2, label:"Hipervínculo"}
	], [])

	const onSubmit = useCallback((values, actions) => {
		dispatch(createProyectAction(values))
	}, [dispatch])

	const onDelete = useCallback((id) => {
		dispatch(deleteProyectAction(id))
	}, [dispatch])

	const createProyect = useCallback(() => {
		dispatch(openModal(
			<FormAddProyects 
				onSubmit={onSubmit}
				ActionsButtons={<ActionsButtons disableButton={loading}/>}
			/>)
		)
	}, [dispatch, loading, onSubmit])

	return (
		<div>
			<p style={{textAlign:"right"}}>
				<Tooltip title="Registrar nuevo video">
					<IconButton aria-label="Crear nuevo" onClick={createProyect}>
	                    <AddCircleOutlineIcon />
	                 </IconButton>
                </Tooltip>
			</p>
			<div className="table--data">
				<SimpleTable
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
			</div>
			<MaterialModal open={modal.open} handleClose={() => dispatch(closeModal())} >
				{modal.description}
			</MaterialModal>
		</div>
	)

}

export default React.memo(ProyectsProfiles)