import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Components
import { Spinner } from '../layout';
import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  PersonalInfoForm,
  PrivacyAndNotificationsForm,
  ChangePasswordForm,
  ExtraSecurityForm,
  AccessibilityForm
} from './includes';
import { SectionHeader } from '../includes';
import AccountControl from './includes/AccountControl';
import CustomRowCard from '../includes/CustomRowCard';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.common.mainBackground,
    height: '100%'
  },
  headerRow: {
    backgroundColor: theme.palette.secondary.main
  }
}));

const Account = ({ app }) => {
  const classes = useStyles();
  const { loading } = app;

  return loading ? (
    <Spinner />
  ) : (
    <Box className={classes.main}>
      <Box
        className={classes.headerRow}
        display={'flex'}
        flexWrap={'nowrap'}
        flexDirection={'column'}
        alignItems={'stretch'}
        zIndex={-1}
      >
        <Container maxWidth={'lg'}>
          <SectionHeader
            title={'Account Settings'}
            description={
              'Manage personal information, notifications, privacy, and general app settings.'
            }
          />
        </Container>
      </Box>

      <Box>
        <Container maxWidth={'lg'}>
          <Box mt={1} mb={1}>
            <CustomRowCard
              icon={'account'}
              name={'personal'}
              title={'Personal Information'}
              description={'Update your name, email, and mobile number.'}
            >
              <Box p={2}>
                <PersonalInfoForm />
              </Box>
            </CustomRowCard>
          </Box>

          <Box mt={1} mb={1}>
            <CustomRowCard
              icon={'bell'}
              name={'privacy'}
              title={'Privacy & Notifications'}
              description={
                'Set how you want to get notified, and how much we can get to know you.'
              }
            >
              <Box p={2}>
                <PrivacyAndNotificationsForm />
              </Box>
            </CustomRowCard>
          </Box>

          <Box mt={1} mb={1}>
            <CustomRowCard
              icon={'shield-account'}
              name={'security'}
              title={'Security'}
              description={
                'Change your password and other settings to make your experience more secure.'
              }
            >
              <Box p={2}>
                <ChangePasswordForm />
                <ExtraSecurityForm />
              </Box>
            </CustomRowCard>
          </Box>

          <Box mt={1} mb={1}>
            <CustomRowCard
              icon={'pencil-ruler'}
              name={'accessibility'}
              title={'Accessibility'}
              description={
                'Change interface settings like color-blind mode, or enlarged font.'
              }
            >
              <AccessibilityForm />
            </CustomRowCard>
          </Box>

          <Box mt={1} mb={1}>
            <CustomRowCard
              icon={'wrench'}
              name={'accountControl'}
              title={'Account Control'}
              description={
                'Deactivate or Delete your account. Both options require password confirmation.'
              }
            >
              <AccountControl />
            </CustomRowCard>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

Account.propTypes = {
  app: PropTypes.object.isRequired
};

const mapStateToProps = ({ app }) => ({
  app
});

export default connect(mapStateToProps)(Account);
