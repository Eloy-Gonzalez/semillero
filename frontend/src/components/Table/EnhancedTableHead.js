import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
//import Checkbox from '@material-ui/core/Checkbox';

class EnhancedTableHead extends Component {
	createSortHandler = property => event => {
		const { onRequestSort } = this.props;
		onRequestSort(event, property);
	};

	render() {
		const {
			//onSelectAllClick,
			order,
			orderBy,
			//numSelected,
			//rowCount,
			columns
		} = this.props;

		return (
			<TableHead>
				<TableRow>
					{/*<TableCell padding="checkbox">
						<Checkbox
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={numSelected === rowCount}
							onChange={onSelectAllClick}
							inputProps={{ 'aria-label': 'Select all desserts' }}
						/>
					</TableCell>*/}
					{columns.map(headRow => (
						<TableCell
							key={headRow.id}
							align={headRow.numeric ? 'left' : 'left'}
							padding={headRow.disablePadding ? 'none' : 'default'}
							sortDirection={orderBy === headRow.id ? order : false}
						>
							<TableSortLabel
								active={orderBy === headRow.id}
								direction={order}
								onClick={this.createSortHandler(headRow.id)}
							>
								{headRow.label}
							</TableSortLabel>
						</TableCell>
					))}
				</TableRow>
			</TableHead>
		);
	}
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;