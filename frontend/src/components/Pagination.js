// @Vendors
import React from 'react'
import styled from 'styled-components'

import Button from '@material-ui/core/Button'


const BtnPag = styled.div`
    margin: 10px 0 0;
    display: flex;
    flex-flow: column wrap;
    align-items: flex-end;
`

function Pagination({ totalPosts, postsPerPage, changePage }){
	const pageNumbers = []

	for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
		pageNumbers.push(i)
	}

	return(
		<BtnPag>
			{pageNumbers.map( (number) => (
				<span key={number}>
					<Button variant="outlined" onClick={() => changePage(number)}>
						{number}
					</Button>
				</span>
			))}
			<p>Registros pro página {postsPerPage}</p>
		</BtnPag>
	)
}

export default React.memo(Pagination)