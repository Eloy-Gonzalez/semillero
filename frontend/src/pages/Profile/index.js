// @Vendors
import React, {Fragment, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'

// @MaterialUI
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

// @Components 
import DatosPersonales from './Components/DatosPersonales'
import DatosDomicilio from './Components/DatosDomicilio'
import DatosDeAcceso from './Components/DatosDeAcceso'
import DatosRepresentante from './Components/DatosRepresentante'

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
	const userRepresentante = useSelector(state => selectRepresentant(state))

	const editProfiles = useCallback((id, version) => {
		alert(id)
	}, [])

	const editUbication = useCallback((id, version) => {
		alert(id)
	}, [])
	
	const editAccount = useCallback((id, version) => {
		alert(id)
	}, [])

	const editRepresentant = useCallback((id, version) => {
		alert(id)
	}, [])

	return (
		<Fragment>
			<Grid container maxwidth="md" spacing={4} justify="center" style={{textAlign: "center"}}>
				<Grid item sm={12} style={{textAlign: "left", padding: "30px 0 0 0"}}>
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
					<DatosPersonales 
						user={userProfile}
						onEdit={editProfiles}
						showEdit={false}
					/>
				</Grid>
			</Grid>

			<Grid container maxwidth="md" spacing={4} justify="center" style={{textAlign: "center"}}>
				<Grid item sm={12} md={6}>
					<DatosDomicilio
						ubication={userDomicilio}
						onEdit={editUbication}
						showEdit={true}
					/>
				</Grid>
				<Grid item sm={12} md={6}>
					<DatosDeAcceso
						account={userAccount}
						onEdit={editAccount}
						showEdit={true}
					/>
				</Grid>
				<Grid item sm={12} md={6}></Grid>
				{userRepresentante && <Grid item sm={12} md={6}>
					<DatosRepresentante
						representant={userRepresentante}
						onEdit={editRepresentant}
						showEdit={false}
					/>
				</Grid>}
			</Grid>
		</Fragment>
	)
}
export default withRouter(Profile)