// @Vendors
import React, { useEffect } from 'react'

// @Styles
import 'statics/styles/grid.scss'
import './index.scss'

// @Components
import TopWave from 'statics/images/textures/TopWave'
import WaveCircles from 'statics/images/textures/WaveCircles'
import LogoSemilleros from 'statics/images/logos/juventud.png'
import VideoSemilleros from 'statics/videos/tapaSemilleros.mp4'
import Menu from 'components/Menu'

function Header({user={}, onLogout= () => console.log("Login first")}) {
    const refVideo = React.useRef()

    useEffect(() => {
        if(!user.isAuthenticated){
          refVideo.current.play()
        }
    }, [ user.isAuthenticated])

    return (
        <header className="header__primary container--row">
            <div className="row">
                <Menu user={user} logout={onLogout}/>
                <div className="header__primary-logo">
                    { user.isAuthenticated ? 
                        <img src={LogoSemilleros} alt="Semilleros de Jóvenes Científicos"/> :
                        <video ref={refVideo} style={{float:'left', width:'100%'}} loop={true}>
                            <source src={VideoSemilleros} type="video/mp4"/>
                        </video>
                    }
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