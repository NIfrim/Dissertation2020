import React, { useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

// Material ui components and dependencies
import {
  makeStyles,
  Card,
  Typography,
  Divider,
  Button,
  IconButton
} from '@material-ui/core'
import { Switch } from '../includes'
import { InteractiveTooltip } from '../includes'

const offerCardStyle = makeStyles(theme => ({
  root: {
    width: 330,
    padding: theme.spacing(2),
    margin: theme.spacing(1)
  },
  hidden: {
    display: 'none !important'
  },
  divider: {
    margin: theme.spacing(1, 0, 1, 0)
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  cardTitleRow: {
    justifyContent: 'flex-start',
    padding: theme.spacing(1),
    width: '100%'
  },
  switch: {
    transform: 'rotate(-90deg)'
  },
  tooltip: {
    padding: 0,
    alignSelf: 'flex-start'
  },
  cardType: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  buttonRoot: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.lightBlue,
    margin: theme.spacing(0.5),
    '&:hover': {
      backgroundColor: theme.palette.common.blue
    }
  },
  buttonContainer: {
    padding: theme.spacing(1)
  }
}))

const OfferTypeCard = ({ type, tooltip, toggleOffer, linkProducts }) => {
  const classes = offerCardStyle()

  const [offerEnabled, setOfferEnabled] = useState(false)

  const handleChange = () => {
    setOfferEnabled(!offerEnabled)
  }

  return (
    <Card classes={{ root: classes.root }} className={classes.columnContainer}>
      <div className={`${classes.rowContainer} ${classes.cardTitleRow}`}>
        <Switch
          className={classes.switch}
          checked={offerEnabled}
          onChange={handleChange}
        />
        <Typography className={classes.cardType} variant={'h5'}>
          {type}
        </Typography>
        <IconButton className={classes.tooltip}>
          <InteractiveTooltip className={classes.tooltip} text={tooltip} />
        </IconButton>
      </div>
      <Divider className={classes.divider} />
      <div
        className={clsx(classes.rowContainer, {
          [classes.hidden]: !offerEnabled
        })}
      >
        <Button classes={{ root: classes.buttonRoot }} variant={'contained'}>
          Link Products
        </Button>
        <Button classes={{ root: classes.buttonRoot }} variant={'contained'}>
          Add Products
        </Button>
      </div>
    </Card>
  )
}

OfferTypeCard.propTypes = {
  type: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  toggleOffer: PropTypes.func,
  linkProducts: PropTypes.func
}

export default OfferTypeCard
