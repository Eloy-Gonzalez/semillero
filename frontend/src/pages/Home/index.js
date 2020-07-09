// @Vendors
import React from 'react'

// @Components
import ProyectsProfiles from './ProyectsProfiles'
import Grid from '@material-ui/core/Grid';

export default function Home() {
    return (
    	<Grid container spacing={3} justify="center">
			<Grid item sm={12} style={{textAlign: "center", overflow: "auto"}}>
				<h1 className="app-title">Comienza a subir tus Videos</h1>
				<ProyectsProfiles />
			</Grid>
		</Grid>
    )
}