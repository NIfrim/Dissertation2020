import React from 'react'
import { makeStyles, OutlinedInput } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white,
    '& input:invalid + fieldset': {
      borderColor: 'orange'
    }
  }
}))

const TextInput = props => {
  const classes = useStyles()

  return <OutlinedInput classes={{ root: classes.root }} {...props} />
}

TextInput.propTypes = {
  ...OutlinedInput.propTypes
}

export default TextInput
