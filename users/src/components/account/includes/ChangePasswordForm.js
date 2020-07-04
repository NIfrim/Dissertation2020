import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Yup from 'yup';
// Components
import {
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { updateUserPassword } from '../../../actions/user';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
}));

const ChangePasswordForm = ({ updateUserPassword }) => {
  const classes = useStyles();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (formData) => {
    const { code, newPassword } = formData;

    updateUserPassword(code, newPassword);
  };

  return (
    <Box>
      <Typography variant={'h5'} color={'textSecondary'}>
        Change Password
      </Typography>
      <Typography variant={'body2'} color={'textSecondary'}>
        Reset password by requesting an authorization code which is then used to
        set the new password.
      </Typography>
      <Formik
        onSubmit={(formData) => handleSubmit(formData)}
        initialValues={{ code: '', newPassword: '', passwordConfirmation: '' }}
        validationSchema={validationSchema}
      >
        {(props) => (
          <Form className={classes.root} onSubmit={props.handleSubmit}>
            <FormControl variant={'outlined'} className={'form-field-group'}>
              <InputLabel htmlFor='code'>Code</InputLabel>
              <OutlinedInput
                error={props.errors.code && props.touched.code}
                id={'code'}
                label={'code'}
                name={'code'}
                type={'text'}
                className={classes.formField}
                onChange={props.handleChange}
                value={props.values.code}
                inputProps={{
                  className: 'form-field'
                }}
                autoComplete={'reset-code'}
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
              {props.errors.code && props.touched.code ? (
                <FormHelperText id='code-error'>
                  {props.errors.code}
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl variant={'outlined'} className={'form-field-group'}>
              <InputLabel htmlFor='newPassword'>New Password</InputLabel>
              <OutlinedInput
                error={props.errors.newPassword && props.touched.newPassword}
                id={'newPassword'}
                label={'newPassword'}
                name={'newPassword'}
                type={passwordVisible ? 'text' : 'password'}
                onChange={props.handleChange}
                className={'form-field-wrapper'}
                value={props.values.newPassword}
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
              {props.errors.newPassword && props.touched.newPassword ? (
                <FormHelperText id='newPassword-error'>
                  {props.errors.newPassword}
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

            <Grid container justify={'space-between'} alignItems={'center'}>
              <Button
                variant={'contained'}
                size={'large'}
                color={'primary'}
                type={'button'}
                onClick={() => props.setFieldValue('code', '123456', true)}
              >
                Get Code
              </Button>

              <Button
                variant={'contained'}
                size={'large'}
                color={'primary'}
                type={'submit'}
              >
                Confirm
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .length(6, 'The code length does not match required size.')
    .required(
      'Error: Request a code by email, and use the received code to set new password.'
    ),
  newPassword: Yup.string()
    .min(6, 'Minimum 6 characters')
    .max(20, 'No Longer than 20 characters')
    .required('Please enter a password between 6-20 characters long.'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Please confirm the password typed above')
});

ChangePasswordForm.propTypes = {
  updateUserPassword: PropTypes.func.isRequired
};

export default connect(null, { updateUserPassword })(ChangePasswordForm);
