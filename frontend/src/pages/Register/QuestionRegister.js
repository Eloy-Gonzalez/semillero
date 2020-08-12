// @Vendors
import React from 'react'
import styled from 'styled-components'

// @Material UI
import PortraitIcon from '@material-ui/icons/Portrait'
import SubtitlesIcon from '@material-ui/icons/Subtitles'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const BoxIcon = styled.div`
    min-width: 130px;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 3px 10px;
    box-sizing: border-box;
    margin: 0 20px 0 0;
    transition: .3s cubic-bezier(0.83, 0.22, 0.35, 1.04);
    text-align:center;
    
    &:last-of-type {
        margin:0;
    }

    &:hover {
    	cursor:pointer;
    	transform: translateY(-5px);
    	box-shadow: 0px 3px 10px 1px #868686;
    }

    .subtitles--icon {
        font-size: 80px;
        color: #29aff4;
    }
`
function QuestionRegister({dispatch, actions}) {
	return (
		<Wrapper>
			<BoxIcon onClick={() => dispatch(actions[1])}>
				<SubtitlesIcon className="subtitles--icon"/>
				<p className="app--text-second" style={{margin: 0}}>Usuario cedulado</p>
			</BoxIcon>
			<BoxIcon onClick={() => dispatch(actions[0])}>
				<PortraitIcon className="subtitles--icon"/>
				<p className="app--text-second" style={{margin: 0}}>Usuario no cedulado</p>
			</BoxIcon>
		</Wrapper>
	)
}

export default React.memo(QuestionRegister)