import React, {Fragment, useCallback, useState, useEffect, memo} from "react"
import {PieChart, Pie, Cell, Legend} from "recharts"
import CircularProgress from '@material-ui/core/CircularProgress'


function PieChartComponent({ data, dataKey}) {
	const RADIAN = Math.PI / 180
	const [isLoading, setLoading] = useState(true)

	const customizedLabel = useCallback(({cx, cy, midAngle, innerRadius, outerRadius, percent, index, value}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5
		const x = cx + radius * Math.cos(-midAngle * RADIAN)
		const y = cy + radius * Math.sin(-midAngle * RADIAN)
		const px = cx + radius * Math.cos(-midAngle * RADIAN) * 2.5
		const py = cy + radius * Math.sin(-midAngle * RADIAN) * 2.5

		return (
			<Fragment>
				<text 
				x={x}
				y={y}
				fill="white"
				textAnchor="middle"
				verticalanchor="middle"
				>
					{`${(percent * 100).toFixed(2)}%`}
				</text>

				<text
				x={px}
				y={py}
				fill="black"
				textAnchor={x > cx ? "start" : "end"}
				dominantBaseline="middle"
				>
					{value}
				</text>
			</Fragment>
		)
	}, [RADIAN])

	useEffect(() => {
		data && setLoading(false)
	}, [data, setLoading])

	if (isLoading) return <CircularProgress />

	return (
		<PieChart width={400} height={400}>
			<Pie
			data={data}
			cx={500 / 2}
			cy={400 / 2}
			label={customizedLabel}
			outerRadius={500 / 5}
			fill="#8884d8"
			dataKey={dataKey}
			paddingAngle={1.5}
			minAngle={45}
			>
				{data && data.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={entry.color} />
				))}
			</Pie>
			<Legend name="name" align="center" />
		</PieChart>
	)
}

export default memo(PieChartComponent)