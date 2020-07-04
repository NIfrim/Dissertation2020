import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Box, TextareaAutosize, Typography } from '@material-ui/core'
import clsx from 'clsx'

// Components

// Theme
const formStyles = makeStyles(theme => ({
  columnContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    width: '100%',
    margin: theme.spacing(1, 0, 1, 0)
  },
  title: {
    display: 'flex',
    justifyContent: 'center'
  },
  label: {
    width: 100
  },
  input: {
    borderRadius: theme.shape.borderRadius,
    borderStyle: 'none',
    backgroundColor: theme.palette.common.yellowish,
    padding: theme.spacing(1.5),
    minWidth: 200
  }
}))

const Form = ({ inputsWithLabels }) => {
  const classes = formStyles()

  const { title } = inputsWithLabels[0]

  return (
    <Fragment>
      <Box className={classes.title}>
        <Typography variant={'h5'}>{title}</Typography>
      </Box>

      <form className={classes.columnContainer}>
        {inputsWithLabels
          ? inputsWithLabels.map((elem, index) => (
              <Box key={index} className={classes.rowContainer}>
                {elem.label ? (
                  <label className={classes.label}>{elem.label.value}</label>
                ) : (
                  ''
                )}

                {elem.input && elem.input.type === 'area' ? (
                  <TextareaAutosize
                    className={clsx(classes.input, classes.inputArea)}
                    rowsMin={4}
                    aria-label={elem.input.id}
                    id={elem.input.id}
                    name={elem.input.name}
                    value={elem.input.value}
                    placeholder={elem.input.placeholder}
                    required={elem.input.required}
                  />
                ) : (
                  ''
                )}

                {elem.input && elem.input.type !== 'area' ? (
                  <input
                    className={clsx(classes.input, classes.inputField)}
                    type={elem.input.type}
                    id={elem.input.id}
                    name={elem.input.name}
                    value={elem.input.value}
                    placeholder={elem.input.placeholder}
                    required={elem.input.required}
                  />
                ) : (
                  ''
                )}
              </Box>
            ))
          : ''}
      </form>
    </Fragment>
  )
}

Form.propTypes = {
  inputsWithLabels: PropTypes.array.isRequired
}

export default Form
