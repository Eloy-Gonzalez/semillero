import React from 'react'
import styled from 'styled-components'

const HeaderStyled = styled.div`
	box-shadow: 0px 3px 10px 0px #999;
	grid-column: 2;
	background: var(--lightGreen);
	padding: 20px;
	box-sizing:border-box;
	display:flex;
	justify-content: flex-end;

	@media(max-wdith: 720px) {
		grid-column: 1 / 2;
	}
`

export default function Header({menu}) {
	return (
		<HeaderStyled>
			{menu}
		</HeaderStyled>
	)

}