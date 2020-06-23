import React from 'react'

function LoaderFormData( { messagge = "Cargando"} ){
    return (
	    <div className="loader_form-data">
	        <center style={{margin: '60px 0 0'}}>
	            <h3 className="app--title">{messagge}</h3>
	        </center>
	    </div>    	
    )
}

export default LoaderFormData