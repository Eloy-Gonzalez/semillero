// @Vendors
import React from 'react'

import Button from '@material-ui/core/Button'

function Pagination({ totalPosts, postsPerPage, changePage }){
	const pageNumbers = []

	for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
		pageNumbers.push(i)
	}

	return(
		<div className="pagination--post">
			{pageNumbers.map( (number) => (
				<span key={number}>
					<Button onClick={() => changePage(number)}>
						{number}
					</Button>
				</span>
			))}
			<p>Registros pro página {postsPerPage}</p>
		</div>
	)
}

export default React.memo(Pagination)