import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'

// Components

// Theme

const RemoveBtnStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.common.lightOrange
    },
    '&:focus': {
      backgroundColor: theme.palette.common.darkBlue
    },
    color: theme.palette.common.white
  }
}))

const RemoveBtn = ({ text }) => {
  const classes = RemoveBtnStyles()

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

RemoveBtn.propTypes = {
  text: PropTypes.string.isRequired,
}

export default RemoveBtn
