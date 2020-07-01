// @Vendors
import React, {useEffect, useCallback, useMemo, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'


// @Selectors 
import {selectProyects} from 'state/proyects/proyects.selectors'
// @Actions
import {getProyects} from 'state/proyects/proyects.actions'

// @Components
import Pagination from 'components/Pagination'
import SimpleTable from 'components/SimpleTable'
import FormAddProyects from './FormAddProyects'
import ActionsButtons from 'components/ActionsButtons'

// Selectors
import {selectLoading} from 'state/app/app.selectors'

function ProyectsProfiles() {
	const proyects = useSelector(state => selectProyects(state))
	const loading = useSelector(state => selectLoading(state))
	const dispatch = useDispatch()
	
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
		alert(JSON.stringify(values))
		actions.setSubmitting(false)
	}, [])

	const onDelete = useCallback((id) => {
		alert(id)
	}, [])

	return (
		<div>
			<p style={{textAlign:"right"}}>
				Add
			</p>
			<div className="table--data">
				<SimpleTable
					columns={columns}
					rows={proyects}
					handleDelete={onDelete}
				/>
				<Pagination 
					totalPosts={proyects.length}
					postsPerPage={postsPerPage}
					changePage={setCurrentPage}
				/>
			</div>
		</div>
	)

}

export default React.memo(ProyectsProfiles)