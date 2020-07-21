// @Vendors
import React, {Fragment, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

// @ActionsTypes
import {GET_CATEGORIAS} from 'state/categorias/categorias.actionsTypes'

// @Components
import TableCategorias from './TableCategorias'
import Pagination from 'components/Pagination'

// @Hooks
import usePagination from 'hooks/usePagination'

function Categorias(){
	const dispatch = useDispatch()
	const categorias = useSelector(state => state.categoriasReducer.get('categorias'))
	const loading = useSelector(state => state.appReducer.get('loading'))

	const {
		currentPage,
		currentPost,
		postsPerPage,
		setCurrentPage
	} = usePagination({ posts: categorias.rows, postsPerPage: 5})

	const columns = [
		{title: "Nombre"}
	]

	useEffect(() => {
  		dispatch({ type: GET_CATEGORIAS})
  	}, [dispatch])

  	const onEdit = (id) => {
  		alert(id)
  	}

  	const onDelete = (id) => {
  		alert(id)
  	}

	return (
		<Fragment>
			<h1>Administrar Categorias</h1>
			<p>Total {categorias.count} registros</p>
			<TableCategorias
				columns={columns}
				rows={currentPost}
				onLoading={loading}
				handleEdit={onEdit}
				handleDelete={onDelete}
			/>
			<Pagination 
				totalPosts={categorias.count}
				postsPerPage={postsPerPage}
				changePage={setCurrentPage}
				actualPage={currentPage}
			/>
		</Fragment>
	)

}

export default Categorias