// @Vendors
import React from 'react'

// @Styles
import './index.scss'
import bubbleTexture from 'statics/images/logos/footer_bubble.svg'

function index() {
    return (
        <footer className="footer__primary">
            <div className="top__wave-footer">
                <img src={bubbleTexture} alt="Texture bubble"/>
            </div>
            <div className="content-footer container--row">
                <p className="app--text">&copy; Copyright 2020 | MINCYT | Oficina de Tecnologías de la Información y la Comunicación <br/> RIF: 20013038-5</p>
            </div>
        </footer>
    )
}
export default index