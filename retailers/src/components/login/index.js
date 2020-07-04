import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

// Redux
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { loginAccount, getAllCompanies } from '../../actions/auth'

import { Redirect } from 'react-router-dom'

import {
  Button,
  CssBaseline,
  FormControl,
  Typography,
  Container,
  Avatar,
  MenuItem,
  FormHelperText
} from '@material-ui/core'

import { Selector, TextInput, Label } from '../includes'

import { Spinner } from '../layout'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const LogIn = ({ auth, app, loginAccount, getAllCompanies }) => {
  const classes = useStyles()

  useEffect(() => {
    getAllCompanies()
  }, [getAllCompanies])

  const [formData, setFormData] = useState({
    companyId: '',
    username: '',
    password: ''
  })

  const { companyId, username, password } = formData

  const changeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = event => {
    loginAccount({ ...formData }, 'stores')
  }

  // Redirect if authenticated
  if (auth.account) {
    return <Redirect to={'/stores'} />
  }

  return app.loading ? (
    <Spinner />
  ) : (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <i className={'material-icons'}>lock</i>
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <FormControl variant='outlined' fullWidth margin={'normal'}>
            <Label id={'companyLabel'} htmlFor={'company'}>
              Company
            </Label>
            <Selector
              labelId='companyLabel'
              id='company'
              value={companyId}
              name={'companyId'}
              labelWidth={70}
              onChange={changeHandler}
            >
              <MenuItem value=''>
                <em>Select Company</em>
              </MenuItem>
              {auth.companies.map(company => (
                <MenuItem key={company._id} value={company._id}>
                  {company.name}
                </MenuItem>
              ))}
            </Selector>
            {!companyId.length > 0 ? <FormHelperText error>*required</FormHelperText> : ''}
          </FormControl>

          <FormControl fullWidth margin={'normal'} variant={'outlined'}>
            <Label htmlFor={'username'} title={'Username'}>
              Username
            </Label>
            <TextInput
              id={'username'}
              type={'text'}
              name={'username'}
              onChange={changeHandler}
              labelWidth={80}
              required={true}
            />
            {!username.length > 0 ? <FormHelperText error>*required</FormHelperText> : ''}
          </FormControl>

          <FormControl fullWidth margin={'normal'} variant={'outlined'}>
            <Label htmlFor={'password'}>Password</Label>
            <TextInput
              id={'password'}
              type={'password'}
              name={'password'}
              onChange={changeHandler}
              labelWidth={80}
              required={true}
            />
            {!password.length > 0 ? <FormHelperText error>*required</FormHelperText> : ''}
          </FormControl>

          <Button
            type='button'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={submitHandler}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  )
}

LogIn.propTypes = {
  loginAccount: PropTypes.func.isRequired,
  account: PropTypes.object,
  app: PropTypes.object.isRequired,
  getAllCompanies: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth, app }) => ({
  auth,
  app
})

export default connect(mapStateToProps, {
  setAlert,
  loginAccount,
  getAllCompanies
})(LogIn)
