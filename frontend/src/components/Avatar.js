// @Vendors
import React from 'react'
import styled from 'styled-components'

// @Statics
import avatar from 'statics/images/logos/avatar_2x.png'

const BoxAvatar = styled.div`
	width: 30px;
	height: 30px;
	overflow: hidden;

	img {
		float:left;
		wdith: 100%;
		height: 100%;
		border-radius: 50%;
	}



	${
		props => props.wd &&`
		width: ${props.wd};
	`}
	${props => props.hg &&`
		height: ${props.hg};
	`}
`

export default function Avatar({ width, height}) {
	return (
		<BoxAvatar wd={width} hg={height}>
			<img src={avatar} alt="Avatar"/>
		</BoxAvatar>
	)
}