import React, { PureComponent, Fragment, Component } from "react"
import { PieChart, Pie, Sector, Cell, Legend } from "recharts"

const RADIAN = Math.PI / 180

class PieChartComponent extends Component {
	renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index,
		value,
	}) => {
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
					textAnchor={x > cx ? "middle" : "middle"}
					verticalanchor={y < cy ? "middle" : "middle"}
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
	}
	render() {
		if (this.props.data == undefined) return null
		return (
			<PieChart width={500} height={500}>
				<Pie
				data={this.props.data}
				cx={500 / 2}
				cy={400 / 2}
				label={this.renderCustomizedLabel.bind()}
				outerRadius={500 / 5}
				fill="#8884d8"
				dataKey={this.props.dataKey}
				paddingAngle={2}
				minAngle={40}
				>
				{this.props.data.map((entry, index) => (
					<Cell
					key={`cell-${index}`}
					fill={entry.color}
					/>
					))}
				</Pie>
				<Legend name="name" align="center"  />
			</PieChart>
			)
	}
}

export default PieChartComponent