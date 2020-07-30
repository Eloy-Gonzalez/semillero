import React from 'react'
import Pie from 'components/HighCharts/Pie'

export default function Administrador(){
	const data = [
		{count  : 300, name : "Verificado" , color : "#B2CB08"},
		{count : 250 , name : "En espera" , color : "#273c61"},
		{count : 5 , name : "Rechazado" , color : "#F29100"},
	]

	return (
		<div className="box--login">
			<h1>Bienvenido al Panel del Administrador</h1>
			<Pie data={data} dataKey="count" />
		</div>
	)
}