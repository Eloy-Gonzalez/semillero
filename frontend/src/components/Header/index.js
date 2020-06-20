// @Vendors
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'wouter'

// @Actions
import { logout } from 'state/auth/auth.actions'

// @Styles
import 'statics/styles/grid.scss'
import './index.scss'

// @Components
import TopWave from 'statics/images/textures/TopWave'
import WaveCircles from 'statics/images/textures/WaveCircles'
import LogoSemilleros from 'statics/images/logos/juventud.png'
import Menu from 'components/Menu'

function Header({authenticated = false}) {
    const dispatch = useDispatch()
    const [_, setLocation] = useLocation()

    const closeSession = useCallback(() => {
        dispatch(logout())
        setLocation("/acceder")
    }, [dispatch, setLocation])
    
    return (
        <header className="header__primary container--row">
            <div className="row">
                <Menu authenticated={authenticated} logout={closeSession}/>
                <div className="header__primary-logo">
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
