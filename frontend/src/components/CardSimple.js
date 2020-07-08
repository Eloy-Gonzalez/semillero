import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: "100%"
  },
  /*bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },*/
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

export default function SimpleCard({ title, children, cardActions = "", TitleAction}) {
  const classes = useStyles()
  // const bull = <span className={classes.bullet}>•</span>

  return (
    <Card className={classes.root}>
      <CardContent>
        {children}
      </CardContent>
    	<CardActions>
      	{cardActions !== "" && cardActions}
    	</CardActions>
    </Card>
  )
}