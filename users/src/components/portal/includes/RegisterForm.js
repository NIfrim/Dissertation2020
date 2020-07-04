import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Components
import {
  FormControl,
  InputAdornment,
  Button,
  Typography,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  useTheme
} from '@material-ui/core';

// Redux
import { connect } from 'react-redux';
import { registerUser } from '../../../actions/auth';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
}));

const RegisterForm = ({ device, registerUser }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  const handleSubmit = (formData) => {
    const { passwordConfirmation, ...formInput } = formData;
    const { location, _id, ...deviceInfo } = device;

    registerUser(formInput, deviceInfo);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }}
      validationSchema={validationSchema}
      onSubmit={(formData) => handleSubmit(formData)}
    >
      {(props) => (
        <Form className={classes.root} onSubmit={props.handleSubmit}>
          <FormControl variant={'outlined'} className={'form-field-group'}>
            <InputLabel htmlFor='firstName'>First Name</InputLabel>
            <OutlinedInput
              error={props.errors.firstName && props.touched.firstName}
              id={'firstName'}
              name={'firstName'}
              label={'First Name'}
              type={'text'}
              className={classes.formField}
              onChange={props.handleChange}
              value={props.values.firstName}
              inputProps={{
                className: 'form-field',
                autoCapitalize: 'on',
                style: {
                  color: theme.palette.text.secondary
                }
              }}
              autoComplete={'first-name'}
              autoFocus
              startAdornment={
                <InputAdornment position={'start'}>
                  <Typography
                    variant={'h5'}
                    className={'mdi mdi-account'}
                    color={'textSecondary'}
                  />
                </InputAdornment>
              }
            />
            {props.errors.firstName && props.touched.firstName ? (
              <FormHelperText id='firstName-error'>
                {props.errors.firstName}
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl variant={'outlined'} className={'form-field-group'}>
            <InputLabel htmlFor='lastName'>Last Name</InputLabel>
            <OutlinedInput
              error={props.errors.lastName && props.touched.lastName}
              id={'lastName'}
              name={'lastName'}
              label={'Last Name'}
              type={'text'}
              className={classes.formField}
              onChange={props.handleChange}
              value={props.values.lastName}
              inputProps={{
                className: 'form-field',
                style: {
                  color: theme.palette.text.secondary
                }
              }}
              autoComplete={'last-name'}
              startAdornment={
                <InputAdornment position={'start'}>
                  <Typography
                    variant={'h5'}
                    className={'mdi mdi-account'}
                    color={'textSecondary'}
                  />
                </InputAdornment>
              }
            />
            {props.errors.lastName && props.touched.lastName ? (
              <FormHelperText id='lastName-error'>
                {props.errors.lastName}
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl variant={'outlined'} className={'form-field-group'}>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <OutlinedInput
              error={props.errors.email && props.touched.email}
              id={'email'}
              label={'Email'}
              name={'email'}
              type={'email'}
              className={classes.formField}
              onChange={props.handleChange}
              value={props.values.email}
              inputProps={{
                className: 'form-field',
                style: {
                  color: theme.palette.text.secondary
                }
              }}
              autoComplete={'new-email'}
              startAdornment={
                <InputAdornment position={'start'}>
                  <Typography
                    variant={'h5'}
                    className={'mdi mdi-email'}
                    color={'textSecondary'}
                  />
                </InputAdornment>
              }
            />
            {props.errors.email && props.touched.email ? (
              <FormHelperText id='email-error'>
                {props.errors.email}
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl variant={'outlined'} className={'form-field-group'}>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <OutlinedInput
              error={props.errors.password && props.touched.password}
              id={'password'}
              label={'Password'}
              name={'password'}
              type={passwordVisible ? 'text' : 'password'}
              onChange={props.handleChange}
              className={'form-field-wrapper'}
              value={props.values.password}
              inputProps={{
                className: 'form-field',
                style: {
                  color: theme.palette.text.secondary
                }
              }}
              autoComplete={'new-password'}
              startAdornment={
                <InputAdornment position={'start'}>
                  <Typography
                    variant={'h5'}
                    color={'textSecondary'}
                    className={'mdi mdi-key'}
                  />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position={'end'}>
                  <Typography
                    variant={'h5'}
                    color={'textSecondary'}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className={`mdi ${
                      passwordVisible ? 'mdi-eye-off' : 'mdi-eye'
                    }`}
                  />
                </InputAdornment>
              }
            />
            {props.errors.password && props.touched.password ? (
              <FormHelperText id='password-error'>
                {props.errors.password}
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl variant={'outlined'} className={'form-field-group'}>
            <InputLabel htmlFor='passwordConfirmation'>
              Confirm Password
            </InputLabel>
            <OutlinedInput
              error={
                props.errors.passwordConfirmation &&
                props.touched.passwordConfirmation
              }
              id={'passwordConfirmation'}
              label={'Confirm Password'}
              name={'passwordConfirmation'}
              type={passwordVisible ? 'text' : 'password'}
              onChange={props.handleChange}
              inputProps={{
                className: 'form-field',
                style: {
                  color: theme.palette.text.secondary
                }
              }}
              value={props.values.passwordConfirmation}
              className={'form-field-wrapper'}
              startAdornment={
                <InputAdornment position={'start'}>
                  <Typography
                    variant={'h5'}
                    color={'textSecondary'}
                    className={'mdi mdi-key'}
                  />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position={'end'}>
                  <Typography
                    variant={'h5'}
                    color={'textSecondary'}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className={`mdi ${
                      passwordVisible ? 'mdi-eye-off' : 'mdi-eye'
                    }`}
                  />
                </InputAdornment>
              }
            />
            {props.errors.passwordConfirmation &&
            props.touched.passwordConfirmation ? (
              <FormHelperText id='passwordConfirmation-error'>
                {props.errors.passwordConfirmation}
              </FormHelperText>
            ) : null}
          </FormControl>

          <Button
            variant={'contained'}
            size={'large'}
            color={'primary'}
            type={'submit'}
          >
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max('45', "That's a very long name (max: 45)")
    .required(),
  lastName: Yup.string()
    .max('45', "That's a very long name (max: 45)")
    .required(),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter a valid email.'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .max(20, 'No Longer than 20 characters')
    .required('Please enter a password between 6-20 characters long.'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm the password typed above')
});

RegisterForm.propTypes = {
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => ({
  device: user.device
});

export default connect(mapStateToProps, { registerUser })(RegisterForm);
