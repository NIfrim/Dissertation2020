import React from 'react'

// Components
import { Typography, Box } from '@material-ui/core'

const Dashboard = props => {
  return (
    <Box display={'flex'} height={'100%'} justifyContent={'center'} alignItems={'center'}>
      <Typography variant={'h2'}>Welcome</Typography>
    </Box>
  )
}

export default Dashboard
