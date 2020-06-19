// @Vendors
import React from 'react'
import  {upperFirst} from 'lodash'

import {Link} from 'wouter'

function ItemMenu({ url, label }) {
    return (
        <li className="item--menu">
            <Link href={url}>
                {upperFirst(label)}
            </Link>
        </li>
    )
}

export default React.memo(ItemMenu)