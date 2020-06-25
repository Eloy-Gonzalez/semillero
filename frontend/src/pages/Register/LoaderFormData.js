import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import './index'

function LoaderFormData( { messagge = "Cargando"} ){
    return (
	    <div className="loader_form-data">
            <div style={{textAlign:"center"}}><CircularProgress /></div>
	    </div>    	
    )
}

export default LoaderFormData