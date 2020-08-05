// @Vendors
import React from 'react'

// @Material UI
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	breadscrumb: {
		background: "#f7f7f7",
		padding: "5px 15px",
		boxSizing: "border-box",
		borderRadius: "5px",
		fontFamily: "var(--font-text)",
		fontSize: "20px",
		aligItems: "center",
		opacity: ".8",


		"& a": {
			color: "#1c7fc0",
			textDecoration: "none",
			"& svg": {
				verticalAlign: "sub",
				color: "#3e99d4"
			},
		},

		"& p": {
			margin: "0",
			opacity: ".8",
			color: "#444"
		}
	}
}))

function CrsBreadcumbs({ children }) {
	const classes = useStyles()
	return (
		<Breadcrumbs aria-label="Breadcrumb" className={classes.breadscrumb}>
			{children}
		</Breadcrumbs>
	)
}

export default React.memo(CrsBreadcumbs)