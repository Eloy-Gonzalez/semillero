// @Vendors
import React from 'react'

// @Components
import AppFrame from 'components/AppFrame'

function NotFoundPage({ message = "", title = "", codeError = 0, className = "" }){
	return (
		<AppFrame title={title}>
			<div className="page--response">
				<h2 className="app--title">{title}</h2>
				<p className="app--text">{message}</p>
			</div>
		</AppFrame>
	)
}

export default React.memo(NotFoundPage)