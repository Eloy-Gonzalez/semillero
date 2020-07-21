import React from 'react';
import {  makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Skeleton from 'react-loading-skeleton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import toString from 'lodash/toString';

// @Components
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 750,
	},
	tableWrapper: {
		maxWidth: "calc(100vw - 10px)",
		width: "100%",
		overflowX: 'auto',
	},
}));

function EnhancedTable(props) {
	const {
		columns,
		fieldId,
		isLoading,
		order,
		orderBy,
		page,
		requestSort,
		rows,
		rowsPerPage,
		search,
		selected,
		setPage,
		setRowsPerPage,
		setSelected,
		delClick
	} = props;

	const classes = useStyles();

	const handleRequestSort = (event, property) => {
		const isDesc = orderBy === property && order === 'desc';
		requestSort(isDesc ? 'asc' : 'desc', property)
	}

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map(n => n[fieldId]);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	}

	function handleClick(event, name) {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}
		setSelected(newSelected);
	}

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(+event.target.value);
	}

	function desc(a, b, orderBy) {
	    if (b[orderBy] < a[orderBy]) {
	        return -1;
	    }
	    if (b[orderBy] > a[orderBy]) {
	        return 1;
	    }
	    return 0;
	}

	function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
	}

	function getSorting(order, orderBy) {
		return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
	}

	function buildLoading() {
		let i;
		let loadingList = [];
		const delimiterRows = rowsPerPage < 11 ? rowsPerPage : 5
		
		for (i = 1; i < delimiterRows; i++) {
			loadingList.push((
				<TableRow key={`loading_${i}`}>
					<TableCell padding="checkbox">
						<Skeleton />
					</TableCell>
					{columns.map((headRow, index) => (
						<TableCell key={`${headRow.id}_${index}`}>
							<Skeleton />
						</TableCell>
					))}
				</TableRow>
			))
		}
		return loadingList;
	}

	const isSelected = id => selected.indexOf(id) !== -1;

	let rowsList = rows;

	if(!isEmpty(search, true)) {
		Object.keys(search).forEach(key => {
			if(search[key]){
				rowsList = rowsList.filter(
					row => {
						const searchField = search[key];
						const fieldValue = (isNumber(row[key])) ? toString(row[key]) : row[key];
						return fieldValue.toLowerCase().search(searchField.toLowerCase()) !== -1;
					}
				);
			}
		})
	}

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				{( selected.length ?
					<EnhancedTableToolbar 
						numSelected={selected.length}
						selected={selected}
						click={delClick}
					/> : null
				)}

				<div className={classes.tableWrapper}>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
					>
						<EnhancedTableHead
							columns={columns}
							numSelected={selected.length}
							onRequestSort={handleRequestSort}
							onSelectAllClick={handleSelectAllClick}
							order={order}
							orderBy={orderBy}
							rowCount={rowsList.length}
						/>
						<TableBody>
							{isLoading
								? buildLoading()
								: rowsList.length
									?
										stableSort(rowsList, getSorting(order, orderBy))
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row, index) => {
										const isItemSelected = isSelected(row[fieldId]);
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<TableRow
												hover
												role="checkbox"
												aria-checked={isItemSelected}
												tabIndex={-1}
												key={row[fieldId]}
												selected={isItemSelected}
											>
												<TableCell padding="checkbox">
													<Checkbox
														onClick={event => handleClick(event, row[fieldId])}
														checked={isItemSelected}
														inputProps={{ 'aria-labelledby': labelId }}
													/>
												</TableCell>
												{columns.map((headRow, index) => {
													const rowContent =
														headRow.render
															? headRow.render(row[headRow.id], row)
															: row[headRow.id];

													return (
														<TableCell key={`${headRow.id}_${index}`} {...headRow.rowProps}>
															{rowContent}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})
								: (
										<TableRow>
											<TableCell align="center" colSpan={columns.length + 1}>
												No se han encontrado resultados
											</TableCell>
										</TableRow>
									)
							}
						</TableBody>
					</Table>
				</div>

				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						'aria-label': 'Página anterior',
					}}
					nextIconButtonProps={{
						'aria-label': 'Siguiente página',
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
					labelRowsPerPage="Registros por página:"
					labelDisplayedRows={({ from, to, count }) =>
						`Mostrando del ${from} al ${to} de ${count !== -1 && count} registros`
					}
				/>
			</Paper>
		</div>
	);
}

export default React.memo(EnhancedTable)