import React from 'react';
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
  FormHelperText
} from '@material-ui/core';

// Redux
import { connect } from 'react-redux';
import { updateUserDetails } from '../../../actions/user';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
}));

const PersonalInfoForm = ({ user, updateUserDetails }) => {
  const classes = useStyles();

  const handleSubmit = (formData) => {
    updateUserDetails(formData);
  };

  return (
    <Formik
      initialValues={{
        firstName: user.firstName ? user.firstName : '',
        lastName: user.lastName ? user.lastName : '',
        email: user.email ? user.email : '',
        mobile: user.mobile ? user.mobile : ''
      }}
      validationSchema={validationSchema}
      onSubmit={(formData) => handleSubmit(formData)}
    >
      {(props) => (
        <Form className={classes.root} onSubmit={props.handleSubmit}>
          <FormControl variant={'outlined'} className={'form-field-group'}>
            <InputLabel htmlFor='firstName' color={'primary'}>
              First Name
            </InputLabel>
            <OutlinedInput
              error={props.errors.firstName && props.touched.firstName}
              id={'firstName'}
              name={'firstName'}
              label={'First Name'}
              type={'text'}
              className={classes.formField}
              onChange={props.handleChange}
              value={props.values.firstName}
              inputProps={{ className: 'form-field', autoCapitalize: 'on' }}
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
            <InputLabel htmlFor='lastName' color={'primary'}>
              Last Name
            </InputLabel>
            <OutlinedInput
              error={props.errors.lastName && props.touched.lastName}
              id={'lastName'}
              name={'lastName'}
              label={'Last Name'}
              type={'text'}
              className={classes.formField}
              onChange={props.handleChange}
              value={props.values.lastName}
              inputProps={{ className: 'form-field' }}
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
            <InputLabel htmlFor='email' color={'primary'}>
              Email
            </InputLabel>
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
                className: 'form-field'
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
            <InputLabel htmlFor='mobile' color={'primary'}>
              Mobile
            </InputLabel>
            <OutlinedInput
              error={props.errors.mobile && props.touched.mobile}
              id={'mobile'}
              name={'mobile'}
              label={'Mobile'}
              type={'text'}
              className={classes.formField}
              onChange={props.handleChange}
              value={props.values.mobile}
              inputProps={{ className: 'form-field' }}
              autoComplete={'new-mobile'}
              startAdornment={
                <InputAdornment position={'start'}>
                  <Typography
                    variant={'h5'}
                    className={'mdi mdi-phone'}
                    color={'textSecondary'}
                  />
                </InputAdornment>
              }
            />
            {props.errors.mobile && props.touched.mobile ? (
              <FormHelperText id='mobile-error'>
                {props.errors.mobile}
              </FormHelperText>
            ) : null}
          </FormControl>

          <Button
            variant={'contained'}
            size={'large'}
            color={'primary'}
            type={'submit'}
          >
            Update
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max('45', "That's a very long name (max: 45)")
    .required(),
  lastName: Yup.string()
    .max('45', "That's a very long name (max: 45)")
    .required(),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter a valid email'),
  mobile: Yup.string().matches(phoneRegExp, 'Please enter a valid phone number')
});

PersonalInfoForm.propTypes = {
  updateUserDetails: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps, { updateUserDetails })(
  PersonalInfoForm
);
