// @Vendors
import React from 'react'

// @Styles
import 'statics/styles/grid.scss'
import './index.scss'

// @Components
import TopWave from 'statics/images/textures/TopWave'
import WaveCircles from 'statics/images/textures/WaveCircles'
import LogoSemilleros from 'statics/images/logos/juventud.png'
import Menu from 'components/Menu'

function index() {
    return (
        <header className="header__primary container--row">
            <div className="row">
                <Menu />
                <div className="header__primary-logo">
                    <img src={LogoSemilleros}/>
                </div>
                <div className="top--wave">
                    <TopWave />
                </div>
                <div className="wave--cirlces">
                    <WaveCircles />
                </div>
            </div>
        </header>
    )
}

export default index