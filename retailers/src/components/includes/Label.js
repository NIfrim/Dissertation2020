import React from 'react'
import { InputLabel } from '@material-ui/core'

const Label = props => {
  return <InputLabel {...props}>{props.children}</InputLabel>
}

Label.propTypes = {
  ...InputLabel.propTypes
}

export default Label
