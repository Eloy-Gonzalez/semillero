import React from 'react'
import styled from 'styled-components'

const Wallppaper = styled.div`
	position: fixed;
	top:0;
	left:0;
	right:0;
	bottom:0;
	opacity: 0;
	z-index: -1;
	${
		props => props.show && `
			z-index: 100;
			opacity:.8;
			background: ${props.bgColor}
		`
	}
`

export default React.memo(Wallppaper)