// @Vendors
import React from 'react'

function DetailsVideo({ data }){
	console.log(data.value)
	console.log(data.row)

	const {nombre, url_video, Usuario} = data.row
	
	return (
		<React.Fragment>
			<h1>Verificar video</h1>
    		<p style={{color: "var(--darkBlue)"}}>{nombre}</p>
    		<ul>
    			<p>Cambiar estatus a:</p>
    			<li>¡Verificado!</li>
    			<li>En espera...</li>
    			<li>¡Rechazado!</li>
    		</ul>

		</React.Fragment>
	)
}

export default React.memo(DetailsVideo)