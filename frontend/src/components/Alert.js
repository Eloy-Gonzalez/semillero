// @Vendors
import React from 'react'
import clsx from 'clsx'
import marked from 'marked'

// @Material UI
import {makeStyles} from "@material-ui/core/styles"
import IconButton from '@material-ui/core/IconButton'

// @Icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import CloseIcon from '@material-ui/icons/Close'

// @Styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "30px 1fr 40px",
    alignItems: "center",
    opacity: ".8",
    padding: "10px",
    boxSizing: "border-box",
    borderRadius: "5px",
    "& * ": {
    	margin: "0"
    }
  },
  info: {
    color: "rgb(40 86 167)",
    border: "solid 1px rgb(0 126 255)",
    background: "rgb(0 102 255 / 41%)",
    "& p": {
      fontSize: 20,
    	color: "rgb(10 51 124)",
    	fontWeight: "normal"
    }
  },
  danger: {
    background: "rgb(251 29 29 / 31%)",
    border: "solid 1px rgb(251 29 29 / 76%)",
    color: "rgb(255 21 21 / 76%)",
    "& p": {
      fontSize: 20,
    	color: "red",
    	fontWeight: "normal"
    }
  },
  warning: {
    color: "rgb(255 174 0 / 86%)",
    border: "solid 1px rgb(228 255 0)",
    background: "rgb(255 188 0 / 28%)",
    "& p": {
      fontSize: 20,
    	color: "rgb(167 114 0)",
    	fontWeight: "normal"
    }
  },
  success: {
    color: "rgb(26 124 0 / 86%)",
    border: "solid 1px rgb(72 173 48)",
    background: "rgb(27 255 0 / 28%)",
    "& p": {
      fontSize: 20,
    	color: "rgb(17 83 0)",
    	fontWeight: "normal"
    }
  },
  icon: {
  	fontSize: 22,
  	opacity: 0.9
	},
}));

const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	danger: ErrorIcon,
	info: InfoIcon,
}

export default function Alert({ type="info", message, ...rest}) {
	const classes = useStyles()
	const Icon = variantIcon[type] || InfoIcon
  const Root = React.useRef()

	return (
		<div ref={Root} className={clsx(classes.root, classes[type])} {...rest}>
			<div>
				<span id="client-snackbar" className={classes.message}>
					<Icon className={clsx(classes.icon)} />
				</span>
			</div>
			<div dangerouslySetInnerHTML={{ __html: marked(message) }} />
      <div>
        <IconButton onClick={() => Root.current.remove()}>
          <CloseIcon className={clsx(classes.icon)}/>
        </IconButton>
      </div>
		</div>
	)
}