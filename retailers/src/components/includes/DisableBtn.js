import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'

// Components

// Theme

const DisableBtnStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.lightBlue,
    '&:hover': {
      backgroundColor: theme.palette.common.blue
    },
    '&:focus': {
      backgroundColor: theme.palette.common.darkBlue
    },
    color: theme.palette.common.white
  }
}))

const DisableBtn = ({ text }) => {
  const classes = DisableBtnStyles()

  return (
    <Button
      variant={'contained'}
      size={'small'}
      color={'primary'}
      classes={{ root: classes.root }}
    >
      {text}
    </Button>
  )
}

DisableBtn.propTypes = {
  text: PropTypes.string.isRequired,
}

export default DisableBtn
