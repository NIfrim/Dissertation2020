import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'

// Components

// Theme

const editBtnStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.green,
    '&:hover': {
      backgroundColor: theme.palette.common.lightGreen
    },
    '&:focus': {
      backgroundColor: theme.palette.common.darkBlue
    },
    color: theme.palette.common.white
  }
}))

const EditBtn = ({ text, collapseHandle }) => {
  const classes = editBtnStyles()

  return (
    <Button
      variant={'contained'}
      size={'small'}
      color={'primary'}
      classes={{ root: classes.root }}
      onClick={() => collapseHandle()}
    >
      {text}
    </Button>
  )
}

EditBtn.propTypes = {
  text: PropTypes.string.isRequired,
  collapseHandle: PropTypes.func.isRequired
}

export default EditBtn
