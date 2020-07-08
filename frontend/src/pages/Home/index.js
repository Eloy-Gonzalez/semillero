// @Vendors
import React from 'react'

// @Components
import ProyectsProfiles from './ProyectsProfiles'
import Grid from '@material-ui/core/Grid';

export default function Home() {
    return (
    	<Grid container maxwidth="md" spacing={3}>
			<Grid item sm={12} style={{textAlign: "center"}}>
				<h1 className="app-title">Comienza a subir tus Videos</h1>
				<ProyectsProfiles/>
			</Grid>
		</Grid>
    )
}