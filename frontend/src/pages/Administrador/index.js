import React from 'react'
import Pie from 'components/HighCharts/Pie'

export default function Administrador(){
	const objects = [
		{count  : 300, name : "Verificado" , color : "#B2CB08"},
		{count : 250 , name : "En espera" , color : "#F29100"},
		{count : 5 , name : "Rechazado" , color : "#D65B5B"},
	]

	return (
		<div className="box--login">
			<h1>Bienvenido al Panel del Administrador</h1>
			<div>
				<Pie 
					data={objects}
					dataKey="count"
					color = "color"
				/>
			</div>
		</div>
	)
}