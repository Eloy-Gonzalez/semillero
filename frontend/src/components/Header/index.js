// @Vendors
import React, { useCallback, useEffect } from 'react'

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
    
    const stopVideo = useCallback(() => {
        setTimeout( () => refVideo.current.pause() , 12500)
    }, [])

    useEffect(() => {
        //refVideo.current.play()
        //stopVideo()
    }, [stopVideo])

    return (
        <header className="header__primary container--row">
            <div className="row">
                <Menu user={user} logout={onLogout}/>
                <div className="header__primary-logo">
                    { user.isAuthenticated ? 
                        <img src={LogoSemilleros} alt="Semilleros de Jóvenes Científicos"/> :
                        <video ref={refVideo} style={{transition: 'all .3s cubic-bezier(0.83, 0.22, 0.35, 1.04)', float:'left', width:'100%', transform:'scale(1)'}}>
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