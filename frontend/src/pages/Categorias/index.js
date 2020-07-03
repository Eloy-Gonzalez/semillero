// @Vendors
import React, {Fragment, useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

// @ActionsTypes
import {GET_PERIODOS} from 'state/periodos/periodos.actionsTypes'

// @Components
import TablePeriodos from './TablePeriodos'
import Pagination from 'components/Pagination'
// @Hooks
import usePagination from 'hooks/usePagination'

function Periodos(){
	const dispatch = useDispatch()
	const periodos = useSelector(state => state.periodosReducer.get('periodos'))
	const loading = useSelector(state => state.appReducer.get('loading'))
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
  		dispatch({ type: GET_PERIODOS})
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
			<h1>Administrar Categorias</h1>
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
	)

}

export default Periodos