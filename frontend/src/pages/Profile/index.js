// @Vendors
import React, {Fragment} from 'react'
import {useSelector} from 'react-redux'
import moment from 'moment'
import {withRouter} from 'react-router-dom'
import 'moment/locale/es'

// @MaterialUI
import Grid from '@material-ui/core/Grid'
import CardSimple from 'components/CardSimple'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

// @Components 
import Avatar from 'components/Avatar'

// @Selectors
import {
	selectUser,
	selectProfiles,
	selectRepresentant,
	selectUbication
} from 'state/users/users.selectors'

function Profile({ history }) {
	const userAccount = useSelector(state => selectUser(state))
	const userProfile = useSelector(state => selectProfiles(state))
	const userDomicilio = useSelector(state => selectUbication(state))

	const editProfiles = (id, version) => {
		alert(id)
	}
	
	return (
		<Fragment>
			<Grid container maxwidth="md" spacing={4} justify="center" style={{textAlign: "center"}}>
				<Grid item sm={12} md={12} style={{textAlign: "left", padding: "30px 0 0 0"}}>
	              <IconButton 
	                aria-label="Atrás"
	                onClick={() => history.push("/")}
	              >
	                <Tooltip title="Volver A Inicio">
	                  <ArrowBackIosIcon/>
	                </Tooltip>
	              </IconButton>
				</Grid>
				<Grid item sm={12} md={8}>
					<h2 style={{color:"var(--darkBlue)"}}>Datos Personales</h2>
					<CardSimple>
						<p style={{display:"flex",flexFlow:"column wrap", alignItems:"center",justifyContent: "center"}}>
							<Avatar width="100px" height="100px" />
						<Tooltip title="Modificar datos">
		                  <IconButton aria-label="Editar" onClick={() => editProfiles(userProfile.id_usuario, userProfile.version)}>
		                    <EditIcon/>
		                  </IconButton>
		                </Tooltip>
						</p>
						<p style={{fontWeight:"bold"}}>C.I {userProfile.cedula}</p>
						<p style={{fontWeight:"bold"}}>
							{`${userProfile.primer_nombre} ${userProfile.segundo_nombre} ${userProfile.primer_apellido} ${userProfile.segundo_apellido}`}
						</p>
						<p style={{fontWeight:"bold"}}>
							Nacimiento: {moment(userProfile.fecha_nacimiento,"YYYYMMDD").calendar()}
							&nbsp; | &nbsp;
							Edad: {moment(userProfile.fecha_nacimiento, "YYYYMMDD").fromNow().replace("hace", "")}
						</p>
					</CardSimple>
				</Grid>
			</Grid>

			<Grid container maxwidth="md" spacing={4} justify="center" style={{textAlign: "center"}}>
				<Grid item sm={12} md={6}>
					<h2 style={{color:"var(--darkBlue)"}}>Datos Domiciliarios</h2>
					<CardSimple>
						<Tooltip title="Modificar datos">
		                  <IconButton aria-label="Editar" onClick={() => editProfiles(userProfile.id_usuario, userProfile.version)}>
		                    <EditIcon/>
		                  </IconButton>
		                </Tooltip>
				      <Table aria-label="simple table">
				        <TableBody>
				            <TableRow>
				              <TableCell component="th" scope="row">Teléfono de Habitación</TableCell>
				              <TableCell component="th" scope="row">
				                {userDomicilio.telefono_habitacional == "" ? <i style={{color: "red"}}>(No posee)</i> : userDomicilio.telefono_habitacional}
				              </TableCell>
				            </TableRow>
				            <TableRow>
				              <TableCell component="th" scope="row">Teléfono Personal</TableCell>
				              <TableCell component="th" scope="row">{userDomicilio.telefono_personal}</TableCell>
				            </TableRow>
				            <TableRow>
				              <TableCell component="th" scope="row">Estado</TableCell>
				              <TableCell component="th" scope="row">Dtto capital</TableCell>
				            </TableRow>
				            <TableRow>
				              <TableCell component="th" scope="row">Municipio</TableCell>
				              <TableCell component="th" scope="row">Libertador</TableCell>
				            </TableRow>
				            <TableRow>
				              <TableCell component="th" scope="row">Parroquia</TableCell>
				              <TableCell component="th" scope="row">Caricuao</TableCell>
				            </TableRow>
				       </TableBody>
				      </Table>
					</CardSimple>
				</Grid>
				<Grid item sm={12} md={6}>
					<h2 style={{color:"var(--darkBlue)"}}>Datos de Acceso</h2>
					<CardSimple>
						<Tooltip title="Modificar datos">
		                  <IconButton aria-label="Editar" onClick={() => editProfiles(userProfile.id_usuario, userProfile.version)}>
		                    <EditIcon/>
		                  </IconButton>
		                </Tooltip>
					</CardSimple>
				</Grid>
			</Grid>
		</Fragment>
	)
}
export default withRouter(Profile)