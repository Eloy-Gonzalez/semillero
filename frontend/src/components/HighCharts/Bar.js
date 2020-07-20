import React, { PureComponent } from "react";
import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	LabelList,
} from "recharts";

function getRandomColor() {
	var letters = "0123456789ABCDEF";
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

const renderCustomizedLabel = (fill, index) => {
	return (props) => {
		const { x, y, width, value } = props;

		return (
			<g>
				<rect height={30} x={x} y={y - 30} fill="#fff" />
				<text
					x={x + width + 20}
					y={y + 10}
					fill={fill}
					textAnchor="middle"
					dominantBaseline="middle"
					key={index}
				>
					{value}
				</text>
			</g>
			);
	};
};

export default class Bar extends PureComponent {
	render() {
		if (this.props.data == undefined) return null;
		return (
			<BarChart
				width={1200 / 2 - 150}
				height={1000}
				data={this.props.data}
				layout="vertical"
				key={this.props.keys}
			>
				<CartesianGrid strokeDasharray="10 10" key={this.props.keys} />
				<XAxis type="number" domain={[0, "dataMax + 500"]} />
				<YAxis width={150} type="category" dataKey={this.props.AxisName} />
				<Tooltip />
			<Legend />
			{Object.keys(this.props.bar).map((index) => (
				<Bar
					key={index}
					dataKey={this.props.bar[index].name}
					fill={this.props.bar[index].color}
					name={this.props.name[index]}
				>
					<LabelList
						key={index}
						content={renderCustomizedLabel(
							this.props.bar[index].color,
							index
							)}
					/>
				</Bar>
				))}
			</BarChart>
			);
	}
}