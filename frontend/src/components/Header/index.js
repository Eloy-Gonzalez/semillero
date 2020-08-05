// @Vendors
import React from 'react'

// @Styles
import 'statics/styles/grid.scss'
import './index.scss'

// @Components
import TopWave from 'statics/images/textures/TopWave'
import WaveCircles from 'statics/images/textures/WaveCircles'
import LogoSemilleros from 'statics/images/logos/juventud.png'
//import VideoSemilleros from 'statics/videos/tapaSemilleros.mp4'
import MenuC from 'components/Menu'

function Header({user={}, onLogout= () => console.log("Login first")}) {

    return (
        <header className="header__primary container--row">
            <div className="row">
                <MenuC user={user} logout={onLogout}/>
                <div className="header__primary-logo" style={{margin:"40px 0 0"}}>
                    <img src={LogoSemilleros} alt="Semilleros de Jóvenes Científicos"/>
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

export default React.memo(Header)