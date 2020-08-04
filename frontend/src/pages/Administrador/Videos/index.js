// @Vendors
import React, {useEffect, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import moment from 'moment'
import 'moment/locale/es'

// @ActionsTypes
import {
	GET_VIDEOS,
	UPDATE_FILTERS
} from 'state/admin/videos/videos.actionsTypes'
import {
	MODAL_OPEN
} from 'state/app/app.actionTypes'

// @Components
import Table from 'components/Table'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import DetailsVideo from './DetailsVideo'

// @Icons
import DoneAllIcon from '@material-ui/icons/DoneAll'
import CancelIcon from '@material-ui/icons/Cancel'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import RefreshIcon from '@material-ui/icons/Refresh'

function Videos(){
	const dispatch = useDispatch()
	const videos = useSelector(state => state.videosReducer.get("videos"))
	const filters = useSelector( state => state.videosReducer.get("filters"))
	const isLoading = useSelector(state => state.appReducer.get('loading'))

	const {rows} = videos
    const {
      order,
      orderBy,
      page,
      rowsPerPage,
      selected,
    } = filters

    const changeState = useCallback( (value, row) => {
    	const payload = <DetailsVideo data={ {value, row} } />
    	dispatch({ type: MODAL_OPEN, payload })
    }, [dispatch])

	const columns = [
		{
			id: 'row.Usuario.usuarios_perfil',
			numeric: true,
			disablePadding: false,
			label: 'Cédula',
			rowProps: {
				component: 'th', scope: 'row'
			},
			render: (value, row) => {
				const {cedula} = row.Usuario.usuarios_perfil
				return <span>{cedula}</span>
			}
		},
		{ 
			id: 'nombre',
			numeric: true,
			disablePadding: false,
			label: 'Video',
			render: (value, row) => {
				return <a href={row.url_video} target="_blank" rel="noopener noreferrer" style={{color: "#444"}}> {value} </a>
			}
		},
		{
			id: 'fecha',
			numeric: true,
			disablePadding: false,
			label: 'Fecha de Subida',
			render: value => value ? moment(value).format("DD/MM/YYYY") : '-'
		},
		{
			id: 'id_estatus',
			numeric: true,
			disablePadding: true,
			label: "Estado",
			render: (value, row) => {
				
				const title = 
				value === 1 
				? "En espera..."
				: value === 2 ? "¡Aprobado!"
				: "¡Rechazado!"


				return <IconButton onClick={() => changeState(value, row)}>
					<Tooltip title={title}>
						{(
							value === 1 
							? <AccessTimeIcon/>
							: value === 2 ? <DoneAllIcon style={{color:"#39a838"}}/>
							: <CancelIcon style={{color: "#ca626c"}}/>
						)}
					</Tooltip>
				</IconButton>
			}
		}
	]

	useEffect(() => {
		dispatch({ type: GET_VIDEOS })
	}, [dispatch])

	return (
		<Grid container maxwidth="md" spacing={2} justify="center">
			<Grid item sm={12}>
				<h1>Administrar Videos</h1>
				<Tooltip title="Recargar datos">
					<IconButton onClick={() => dispatch({ type: GET_VIDEOS })}>
						<RefreshIcon style={{color:"#777"}}/>
					</IconButton>
				</Tooltip>

	            <Table
	              isLoading={isLoading}
	              fieldId="id"
	              columns={columns}
	              rows={rows}
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
			</Grid>
		</Grid>
	)
}

export default Videos