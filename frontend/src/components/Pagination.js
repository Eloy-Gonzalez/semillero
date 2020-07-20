// @Vendors
import React, {Fragment} from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import Button from '@material-ui/core/Button'


const BtnPag = styled.div`
    margin: 10px 0 0;
    display: flex;
    align-items: flex-end;
    justify-content:flex-end;
    & button {
    	margin: 0 10px 0 0;
    }
    & button:last-of-type {
    	margin: 0;
    }

    & .active--pagination {
    	color: var(--lightGreen);
    	border-color: var(--lightGreen);
    }
`

function Pagination({ totalPosts, postsPerPage, changePage, actualPage}){
	const pageNumbers = []

	for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
		pageNumbers.push(i)
	}

	return(
		<Fragment>
		<BtnPag>
			{pageNumbers.map( (number) => (
				<Button 
					key={number}
					variant="outlined"
					onClick={() => changePage(number)}
					className={classnames({ 'active--pagination' : actualPage === number })}
					>
					{number}
				</Button>
			))}
		</BtnPag>
		<p style={{display:"block", textAlign: "right"}}>
			Registros pro página {postsPerPage}
		</p>
		</Fragment>
	)
}

export default Pagination