// @Vendors
import React from 'react'
import  {upperFirst} from 'lodash'

import {Link} from 'react-router-dom'

function ItemMenu({ url, label }) {
    return (
        <li className="item--menu">
            <Link to={url} className="app--text">
                {upperFirst(label)}
            </Link>
        </li>
    )
}

export default React.memo(ItemMenu)