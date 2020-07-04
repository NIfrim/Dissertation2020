import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Material Components and dependencies
import {
  makeStyles,
  Typography,
  FormControl,
  Select,
  InputLabel,
  Container
} from '@material-ui/core'

import * as Icons from '@material-ui/icons'

// Components
import AnalyticsCard from '../../../cards/AnalyticsCard'

const useStyles = makeStyles(theme => ({
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  cardsRow: {
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  titleRow: {
    justifyContent: 'space-between'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    float: 'right'
  },
  selectInputRoot: {
    padding: theme.spacing(1)
  },
  selectInput: {
    backgroundColor: theme.palette.common.lightBlue,
    borderRadius: theme.shape.borderRadiusSmall
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

const Overview = ({ title, data }) => {
  const classes = useStyles()

  const [period, setPeriod] = useState(7)

  const handleChange = event => {
    setPeriod(event.target.value)
  }

  return (
    <Container className={classes.columnContainer} maxWidth={'xl'}>
      <div className={`${classes.rowContainer} ${classes.titleRow}`}>
        <Typography variant={'h4'}>{title}</Typography>
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel htmlFor='outlined-age-native-simple'>Period</InputLabel>
          <Select
            native
            value={period}
            onChange={handleChange}
            classes={{ root: classes.selectInputRoot }}
            className={classes.selectInput}
          >
            <option value={7}>Last week</option>
            <option value={365}>Last year</option>
            <option value={30}>Past month</option>
            <option value={90}>Last quarter</option>
          </Select>
        </FormControl>
      </div>
      <div className={`${classes.rowContainer} ${classes.cardsRow}`}>
        {data.map((elem, index) => {
          return <AnalyticsCard key={index} {...elem} />
        })}
      </div>
    </Container>
  )
}

Overview.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
}

export default Overview
