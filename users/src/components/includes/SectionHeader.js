import React from 'react';
import PropTypes from 'prop-types';
//Redux
import { connect } from 'react-redux';
//Components
import { Box, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backButton: {
    width: 50,
    height: 50
  }
}));

const SectionHeader = ({ icon, user, title, description }) => {
  const classes = useStyles();

  return (
    <Box
      display={'flex'}
      justifyContent={'flex-start'}
      flexWrap={'nowrap'}
      maxHeight={200}
      p={2}
    >
      <Box alignSelf={'flexStart'}>
        <IconButton
          id={'backIcon'}
          className={classes.backButton}
          onClick={() => window.history.back()}
        >
          <Typography
            variant={'h4'}
            color={'textSecondary'}
            className={'mdi mdi-arrow-left'}
          />
        </IconButton>
      </Box>

      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'flex-start'}
        flexWrap={'nowrap'}
        flexGrow={1}
        flexShrink={1}
      >
        <Box m={1}>
          <Typography variant={'h5'} color={'textSecondary'}>
            {title}
          </Typography>
        </Box>

        <Box m={1}>
          <Typography variant={'body1'} color={'textSecondary'}>
            {description}
          </Typography>
        </Box>
      </Box>

      <Box
        display={'flex'}
        justifyContent={'flex-start'}
        flexWrap={'nowrap'}
        flexShrink={1}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          maxWidth={200}
        >
          {icon ? (
            <img
              src={`${user.avatar}`}
              alt='User avatar'
              width={'100%'}
              id={'userImage'}
            />
          ) : (
            <Typography
              variant={'h2'}
              color={'textSecondary'}
              className={`mdi mdi-${icon}`}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

SectionHeader.propTypes = {
  icon: PropTypes.string,
  user: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(SectionHeader);
