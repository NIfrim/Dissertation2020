import Switch from '@material-ui/core/Switch'
import { withStyles } from '@material-ui/styles'

export default withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    transform: 'rotate(-90deg)'
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.common.green,
        borderColor: theme.palette.common.green
      }
    }
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none'
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white
  },
  checked: {}
}))(Switch)
