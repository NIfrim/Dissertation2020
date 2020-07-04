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
import { loginUser } from '../../../actions/auth';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
}));

const LoginForm = ({ loginUser }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  const handleSubmit = (formData) => {
    const { email, password } = formData;

    loginUser(email, password);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(formData) => handleSubmit(formData)}
    >
      {(props) => (
        <Form className={classes.root} onSubmit={props.handleSubmit}>
          <FormControl variant={'outlined'}>
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
              autoComplete={'email'}
              inputProps={{
                className: 'form-field',
                style: {
                  color: theme.palette.text.secondary
                }
              }}
              autoFocus
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
                style: {
                  color: theme.palette.text.secondary
                }
              }}
              autoComplete={'password'}
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

          <Button
            variant={'contained'}
            size={'large'}
            color={'primary'}
            type={'submit'}
          >
            Log In
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter a valid email.'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .max(20, 'No Longer than 20 characters')
    .required('Please enter a password between 6-20 characters long.')
});

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired
};

export default connect(null, { loginUser })(LoginForm);
