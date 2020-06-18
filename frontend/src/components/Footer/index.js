// @Vendors
import React from 'react'

// @Styles
import './index.scss'
import bubbleTexture from 'statics/images/logos/footer_bubble.svg'

function index() {
    return (
        <footer className="footer__primary">
            <div class="top__wave-footer">
                <img src={bubbleTexture} alt="Texture bubble"/>
            </div>
            <div className="content-footer container--row">
                <p className="app--text">&copy; Copyright 2020 | MINCYT | Oficinas de Tecnologías y Comunicación</p>
            </div>
        </footer>
    )
}
export default index