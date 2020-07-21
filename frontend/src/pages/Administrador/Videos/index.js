// @Vendors
import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

// @ActionsTypes
import {GET_VIDEOS} from 'state/admin/videos/videos.actionsTypes'

// @Components
import TableVideos from './TableVideos'
import Pagination from 'components/Pagination'
import Grid from '@material-ui/core/Grid'

// @Hooks
import usePagination from 'hooks/usePagination'

function Videos(){
	const dispatch = useDispatch()
	const videos = useSelector(state => state.videosReducer.get("videos"))
	const loading = useSelector(state => state.appReducer.get('loading'))

	const {
		currentPage,
		currentPost,
		postsPerPage,
		setCurrentPage
	} = usePagination({ posts: videos.rows, postsPerPage: 5})

	const columns = [
		{title: "Cédula"},
		{title: "Usuario"},
		{title: "Nombre del video"},
		{title: "Hipervínculo"},
		{title: "Estatus"}
	]

	const onView = (data) => {
		console.log(data)
		/*const {
			nombre,
			url_video,
			fecha,
			id_estatus,
			id_periodo,
			descripcion,
			Usuario,
			usuarios_perfil
		} = data
		const {
			cedula,
			fecha_nacimiento,
			primer_nombre,
			primer_apellido,
			segundo_nombre,
			segundo_apellido,
			genero
		} = usuarios_perfil*/

	}

  	const onEdit = (id) => {
  		alert(id)
  	}

  	const onDelete = (id) => {
  		alert(id)
  	}

	useEffect(() => {
		dispatch({ type: GET_VIDEOS })
	}, [dispatch])

	return (
		<Grid container maxwidth="md" spacing={4} justify="center">
			<Grid item sm={12}>
				<h1>Administrar Videos</h1>
				<p>Total {videos.count} registros</p>
			</Grid>
			<Grid item sm={12}>
				<TableVideos
					columns={columns}
					rows={currentPost}
					onLoading={loading}
					handleEdit={onEdit}
					handleDelete={onDelete}
					handleView={onView}
				/>
				<Pagination
					totalPosts={videos.count}
					postsPerPage={postsPerPage}
					changePage={setCurrentPage}
					actualPage={currentPage}
				/>
			</Grid>
		</Grid>
	)
}

export default Videos