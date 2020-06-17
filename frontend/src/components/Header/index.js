// @Vendors
import React from 'react'

// @Styles > component
import './index.scss'
import TopWave from 'statics/images/textures/TopWave'
import WaveCircles from 'statics/images/textures/WaveCircles'
import LogoSemilleros from 'statics/images/logos/juventud.png'

function index() {
    return (
        <header className="header__primary">
           <img src={LogoSemilleros}/>
           <TopWave />
           <WaveCircles />
        </header>
    )
}

export default React.memo(index)