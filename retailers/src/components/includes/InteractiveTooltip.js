import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'

const tooltipStyle = makeStyles(theme => ({
  icon: {
    fontSize: 18,
    color: theme.palette.common.blue,
    cursor: 'pointer',
    height: 16
  }
}))

const InteractiveTooltip = ({ text }) => {
  const classes = tooltipStyle()

  return (
    <Tooltip title={text} interactive>
      <i className={`material-icons ${classes.icon}`}>info</i>
    </Tooltip>
  )
}

InteractiveTooltip.propTypes = {
  text: PropTypes.string.isRequired
}

export default InteractiveTooltip
