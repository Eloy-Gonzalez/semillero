// @Vendors
import React, {Fragment, useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'

// @ActionsTypes
import {GET_PERIODOS} from 'state/periodos/periodos.actionsTypes'

// @Components
import CustomTable from 'components/CustomTable'

function Periodos(){
	const dispatch = useDispatch()

	useEffect(() => {
  		dispatch({ type: GET_PERIODOS})
  	}, [])

	return (
		<Fragment>
		<h1>PERIODOS</h1>
			<CustomTable />
		</Fragment>
	)

}

export default Periodos