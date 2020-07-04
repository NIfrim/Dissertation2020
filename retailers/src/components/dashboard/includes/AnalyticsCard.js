import React, { useState } from 'react'
import PropTypes from 'prop-types'

// React Components
import { Link } from 'react-router-dom'

// Colours
import * as Colours from '@material-ui/core/colors'

// Material Components
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core'

const cardStyles = makeStyles(theme => ({
  root: {
    width: 180,
    height: 210,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  cardActionArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
}))

const AnalyticsCard = ({ icon, subtitle, href, data }) => {
  const classes = cardStyles()
  const { name, colour } = icon

  const [period, setPeriod] = useState('week')

  return (
    <Card classes={{ root: classes.root }}>
      <CardActionArea className={classes.cardActionArea}>
        <i className={'material-icons'} style={{ color: { colour } }}>
          {name}
        </i>
        <CardContent>
          <Typography variant={'h4'}>{data[period]}</Typography>
          <Typography variant={'body1'}>{subtitle}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <i className={'material-icons'}>arrow_drop_up</i>
        <Typography variant={'body2'}>3.2%</Typography>
        <Link to={href} variant={'body2'}>
          See More
        </Link>
      </CardActions>
    </Card>
  )
}

AnalyticsCard.propTypes = {
  icon: PropTypes.object.isRequired,
  subtitle: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
}

export default AnalyticsCard
