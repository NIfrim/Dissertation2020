import React from 'react'
import { makeStyles, Select } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& input:invalid + fieldset': {
      borderColor: 'red'
    }
  }
}))

const Selector = props => {
  const classes = useStyles()

  return (
    <Select classes={{ root: classes.root }} {...props}>
      {props.children}
    </Select>
  )
}

Selector.propTypes = {
  ...Select.propTypes
}

export default Selector
