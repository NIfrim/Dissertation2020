import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Components
import {
  FormControl,
  Button,
  Typography,
  FormHelperText,
  Box,
  useTheme
} from '@material-ui/core';

// Redux
import { connect } from 'react-redux';
import { updateAccountSettings } from '../../../actions/user';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
}));

const PrivacyAndNotificationsForm = ({ user, updateAccountSettings }) => {
  const classes = useStyles();
  const theme = useTheme();

  const handleSubmit = (formData) => {
    const { _id, ...rest } = user.account;

    updateAccountSettings({
      ...rest,
      ...formData,
      appMode: formData.appMode ? 'full' : 'privacy'
    });
  };

  return (
    <Formik
      initialValues={{
        appMode: user.account.appMode === 'full',
        shareLocation: user.account.shareLocation,
        smsNotifications: user.account.smsNotifications,
        emailNotifications: user.account.emailNotifications
      }}
      validationSchema={validationSchema}
      onSubmit={(formData) => handleSubmit(formData)}
    >
      {(props) => (
        <Form className={classes.root} onSubmit={props.handleSubmit}>
          <Box>
            <Typography variant={'h5'} color={'textSecondary'}>
              Privacy
            </Typography>
            <Typography variant={'body2'} color={'textSecondary'}>
              Settings on how much we can learn about you as a person.
            </Typography>
          </Box>

          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  size={'small'}
                  checked={props.values.appMode}
                  onChange={props.handleChange}
                  name={'appMode'}
                />
              }
              label={
                <Typography variant={'body2'}>
                  I want a personalized offline shopping experience.
                </Typography>
              }
            />
            {props.errors.appMode && props.touched.appMode ? (
              <FormHelperText id='appMode-error'>
                {props.errors.appMode}
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  size={'small'}
                  checked={props.values.shareLocation}
                  onChange={props.handleChange}
                  name={'shareLocation'}
                />
              }
              label={
                <Typography variant={'body2'}>
                  I want promotions which are tailored for me.
                </Typography>
              }
            />
            {props.errors.shareLocation && props.touched.shareLocation ? (
              <FormHelperText id='shareLocation-error'>
                {props.errors.shareLocation}
              </FormHelperText>
            ) : null}
          </FormControl>

          <Box>
            <Typography variant={'h5'} color={'textSecondary'}>
              Notifications
            </Typography>
            <Typography variant={'body2'} color={'textSecondary'}>
              Personalize the way you receive notifications.
            </Typography>
          </Box>

          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  size={'small'}
                  checked={props.values.smsNotifications}
                  onChange={props.handleChange}
                  name={'smsNotifications'}
                />
              }
              label={
                <Typography variant={'body2'}>Send offers by sms.</Typography>
              }
            />
            {props.errors.smsNotifications && props.touched.smsNotifications ? (
              <FormHelperText id='smsNotifications-error'>
                {props.errors.smsNotifications}
              </FormHelperText>
            ) : !user.mobile ? (
              <FormHelperText
                style={{
                  color: theme.palette.common.error
                }}
                id='smsNotifications-error'
              >
                {'Mobile number needs to be added before setting this.'}
              </FormHelperText>
            ) : null}
          </FormControl>

          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  size={'small'}
                  checked={props.values.emailNotifications}
                  onChange={props.handleChange}
                  name={'emailNotifications'}
                />
              }
              label={
                <Typography variant={'body2'}>Send offers by email.</Typography>
              }
            />
            {props.errors.emailNotifications &&
            props.touched.emailNotifications ? (
              <FormHelperText id='emailNotifications-error'>
                {props.errors.emailNotifications}
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

const validationSchema = Yup.object().shape({
  appMode: Yup.boolean(),
  shareLocation: Yup.boolean(),
  smsNotifications: Yup.boolean(),
  emailNotifications: Yup.boolean()
});

PrivacyAndNotificationsForm.propTypes = {
  updateAccountSettings: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps, { updateAccountSettings })(
  PrivacyAndNotificationsForm
);
