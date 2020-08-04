// @Vendors
import React from 'react'
import {
	isEmpty,
	startCase,
	toLower
} from 'lodash'
import moment from 'moment'
import 'moment/locale/es'

// @Material UI
import Grid from '@material-ui/core/Grid'
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	Tooltip
} from '@material-ui/core'

// @Components
import FormUpdateVideo from './FormUpdateVideo'
import Alert from 'components/Alert'

function DetailsVideo({ data }) {
	const status = `${data.value}` ||  "1"
	const {Usuario, nombre, descripcion, fecha, url_video} = data.row
	const {usuarios_perfil, username} = Usuario
	const {cedula, primer_nombre,segundo_nombre, primer_apellido, segundo_apellido} = usuarios_perfil

	const credenciales = startCase(toLower(`${primer_nombre} ${segundo_nombre} ${primer_apellido} ${segundo_apellido}`)) || "No hay Información."

	const onSubmit = React.useCallback((data) => {
		alert()
		console.log(data)
	},[])

	const initialValues = {
		id_estatus: status
	}

	const alertOptions = {
		"1": ["info", "¡Éste video aún no ha sido verificado!"],
		"2": ["success", "Éste video está actualmente Verificado!"],
		"3": ["danger", "Éste video se encuentra <b style='font-weight: bold'>¡Rechazado!</b>"]
	} || "danger"

	return (
		<Grid container spacing={4}>
			<Grid item sm={12}>
				<h1 style={{margin: "0 0 25px"}}>Verificar video</h1>
				<Alert type={alertOptions[status][0]} message={alertOptions[status][1]} />
			</Grid>
			<Grid item sm={12} style={{overflowX:"auto"}}>
				<Table style={{maxWidth: "100%"}} aria-label="simple table" size="small">
					<TableHead>
						<TableRow>
							<TableCell padding="none">Credenciales</TableCell>
							<TableCell padding="none">
								<p className="app--text-second" style={{fontSize:"1.3rem"}}>
									{`Ci.${cedula} - ${credenciales}`}
								</p>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell padding="none">Información de contacto</TableCell>
							<TableCell padding="none" align="left">
								<p className="app--text-second" style={{fontSize:"1.3rem"}}>
									{username}
								</p>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell padding="none">Link del video</TableCell>
							<TableCell padding="none" >
								<p>
									<Tooltip title={isEmpty(descripcion) ? "No hay descripción" : descripcion}>
										<a href={url_video} target="_blank" rel="noopener noreferrer"> {startCase(toLower(nombre))} </a>
									</Tooltip>
								</p>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell padding="none">Subido</TableCell>
							<TableCell padding="none" align="left">
								<p className="app--text-second" style={{fontSize:"1.3rem"}}>
									{moment(fecha,"YYYYMMDD").format("ll")}
								</p>
							</TableCell>
						</TableRow>
					</TableHead>
				</Table>
			</Grid>
			<Grid item sm={12}>
				<FormUpdateVideo
					initialValues={initialValues}
					data={data.row}
					actualValue={status}
					onSubmit={onSubmit}
				/>
			</Grid>
		</Grid>
	)
}

export default React.memo(DetailsVideo)