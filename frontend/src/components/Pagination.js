// @Vendors
import React from 'react'

function Pagination({ totalPost, postPerPage, changePage }){
	const pageNumbers = []

	for(let i = 0; i <= Math.ceil(totalPost / postPerPage); i++){
		pageNumbers.push(i)
	}

	return(
		<div className="pagination--post">
			{pageNumbers.map((number) => (
				<li key={number}>
					<a onClick={() => changePage(number)} href="!#">{number}</a>
				</li>
			))}
		</div>
	)
}

export default React.memo(Pagination)