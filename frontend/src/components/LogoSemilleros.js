// @Vendors
import React from 'react'

// @Statics > Logos
import Image from 'statics/images/logos/juventud.png'

export default function LogoSemilleros({ alt = "Semilleros Científicos"}) {
	return <img src={Image} alt={alt}/>
}