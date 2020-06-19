// @Vendors
import React from 'react'
import  {upperFirst} from 'lodash'

import {Link} from 'wouter'

function ItemMenu({ url, label, onClick }) {
    return (
        <li className="item--menu">
            <Link href={url} className="app--text" onClick={onClick}>
                {upperFirst(label)}
            </Link>
        </li>
    )
}

export default React.memo(ItemMenu)