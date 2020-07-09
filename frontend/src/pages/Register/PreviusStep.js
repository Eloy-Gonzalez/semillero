import React from 'react'
import styled from 'styled-components'

const WrapperCircles = styled.div`
	width: 90%;
	margin: 0 auto 30px;
`
const Circles = styled.ul`
	list-style:none;
	justify-content:center;
	align-items:center;
	flex-flow:column wrap;
	margin:0;
	padding:0;
	display:grid;
	gap:20px;

	@media (min-width: 720px) {
		display:flex;
		flex-flow:row wrap;
	}
`
const Circle = styled.li`
	margin: 0 1rem;
    border: solid 2px #999;
    width: 90px;
    height: 90px;
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    align-items:center;
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
    font-size: 18px;
    color: #444;
    border-radius:50%;
    opacity: .5;
    transition: .4s linear;
`
const Separe = styled.div`
	width: 40px;
	height: 3px;
	background: #999;
	border-radius: 5px;
	opacity: .5;
	position: relative;
	transition: .4s linear;
	display:none;

	@media (min-width: 720px) {
		display:block;
	}

	&::after {
	    content: "";
	    position: absolute;
	    width: 5px;
	    height: 5px;
	    border-radius: 50%;
	    border: solid 2px #999;
	    z-index: 2;
	    top: -2.5px;
	    right: -9px;

	    ${props => props.textColor && `
	    	border-color: #c1dd56;
	    `}
	}
`


function PreviusStep({ actualVisible = 0, items }) {
	const StepCircle = ({ text, separe, ...res}) => (
		<React.Fragment>
			<Circle {...res}>
				{text}
			</Circle>
			{separe}
		</React.Fragment>
	)

	return (
		<WrapperCircles>
			<Circles>
				{ items.length && items.map( (item, index) => (
					<StepCircle 
						key={index}
						style={{
							transform: actualVisible===index && "scale(1.2) translateX(5px)",
							opacity: actualVisible===index && "1",
							borderColor: actualVisible === index && "#c1dd56",
							textColor: actualVisible === index && "#89a031"
						}}
						text={item}
						separe={
							index !== items.length-1 && 
							<Separe
								style={{ 
									background: actualVisible === index && "#c1dd56",
									opacity: actualVisible === index && "1" }}
								textColor={actualVisible === index}/>
						}
						disabled={index !== actualVisible}
					/>
				))}
			</Circles>
		</WrapperCircles>
	)
}

export default React.memo(PreviusStep, (prevProps, nextProps) => (prevProps.previtems === nextProps.items))