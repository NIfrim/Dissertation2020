import React from 'react';
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
import { updateAccountSettings } from '../../../actions/user';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
}));

const ExtraSecurityForm = ({ account, updateAccountSettings }) => {
  const classes = useStyles();

  const handleSubmit = (formData) => {
    const { _id, ...accountInfo } = account;

    updateAccountSettings({
      ...accountInfo,
      ...formData
    });
  };

  return (
    <Box mt={2}>
      <Typography variant={'h5'} color={'textSecondary'}>
        Extra Security
      </Typography>
      <Typography variant={'body2'} color={'textSecondary'}>
        Gin extra security via two-factor authentication, and by having a backup
        email.
      </Typography>
      <Formik
        onSubmit={(formData) => handleSubmit(formData)}
        initialValues={{
          twoFactorAuth: account.twoFactorAuth,
          backupEmail: account.backupEmail ? account.backupEmail : ''
        }}
        validationSchema={validationSchema}
      >
        {(props) => (
          <Form className={classes.root} onSubmit={props.handleSubmit}>
            <FormControl className={'form-field-group'}>
              <FormControlLabel
                control={
                  <Checkbox
                    size={'small'}
                    checked={props.values.twoFactorAuth}
                    onChange={props.handleChange}
                    name={'twoFactorAuth'}
                  />
                }
                label={
                  <Typography variant={'body2'}>
                    Enable two-factor authentication which will require for
                    mobile confirmation if trying to log in from a new device.
                  </Typography>
                }
              />
              {props.errors.twoFactorAuth && props.touched.twoFactorAuth ? (
                <FormHelperText id='twoFactorAuth-error'>
                  {props.errors.twoFactorAuth}
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl variant={'outlined'} className={'form-field-group'}>
              <InputLabel htmlFor='backupEmail'>Backup Email</InputLabel>
              <OutlinedInput
                error={props.errors.backupEmail && props.touched.backupEmail}
                id={'backupEmail'}
                label={'Backup Email'}
                name={'backupEmail'}
                type={'email'}
                onChange={props.handleChange}
                value={props.values.backupEmail}
                className={'form-field-wrapper'}
                startAdornment={
                  <InputAdornment position={'start'}>
                    <Typography
                      variant={'h5'}
                      color={'textSecondary'}
                      className={'mdi mdi-email'}
                    />
                  </InputAdornment>
                }
              />
              {props.errors.backupEmail && props.touched.backupEmail ? (
                <FormHelperText id='backupEmail-error'>
                  {props.errors.backupEmail}
                </FormHelperText>
              ) : null}
            </FormControl>

            <Button
              variant={'contained'}
              size={'large'}
              color={'primary'}
              type={'submit'}
            >
              Confirm
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const validationSchema = Yup.object().shape({
  twoFactorAuth: Yup.boolean(),
  backupEmail: Yup.string()
    .email('Invalid email')
    .required('Please enter a valid email')
});

ExtraSecurityForm.propTypes = {
  updateAccountSettings: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired
};

const mapStateToProps = ({ user }) => ({
  account: user.account
});

export default connect(mapStateToProps, { updateAccountSettings })(
  ExtraSecurityForm
);
