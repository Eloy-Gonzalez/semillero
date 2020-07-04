// @Vendors
import React, {Fragment, useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

// @ActionsTypes
import {GET_FASES} from 'state/fases/fases.actionsTypes'

// @Components
import TableFases from './TableFases'
import Pagination from 'components/Pagination'

// @Hooks
import usePagination from 'hooks/usePagination'

function Fases(){
	const dispatch = useDispatch()
	const fases = useSelector(state => state.fasesReducer.get('fases'))
	const loading = useSelector(state => state.appReducer.get('loading'))
	const {
		currentPost,
		postsPerPage,
		setCurrentPage
	} = usePagination({ posts: fases, postsPerPage: 10})

	const columns = [
		{title: "Nombre"},
		{title: "Fecha de inicio"},
		{title: "Fecha de fin"},
		{title: "Estatus"},
	]

	useEffect(() => {
  		dispatch({ type: GET_FASES})
  	}, [])

  	const onView = (id) => {
  		alert(id)
  	}

  	const onEdit = (id) => {
  		alert(id)
  	}

  	const onDelete = (id) => {
  		alert(id)
  	}

	return (
		<Fragment>
			<h1>Administrar Fases</h1>
			<TableFases
				columns={columns}
				rows={currentPost}
				onLoading={loading}
				handleView={onView}
				handleEdit={onEdit}
				handleDelete={onDelete}
			/>
			<Pagination 
				totalPosts={fases.length}
				postsPerPage={postsPerPage}
				changePage={setCurrentPage}
			/>
		</Fragment>
	)

}

export default Fases