import React from 'react';

// Components
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.palette.primary.main,
    overflowY: 'hidden'
  },

  logoWrapper: {
    padding: theme.spacing(3)
  },

  logo: {
    width: '40%',
    height: 'auto'
  }
}));

function Header() {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      direction={'column'}
      justify={'flex-start'}
      alignItems={'stretch'}
      wrap={'nowrap'}
    >
      <Grid container item className={classes.logoWrapper} justify={'center'}>
        <img
          className={classes.logo}
          src='/img/logo/VLogo.png'
          alt='Discounter logo'
        />
      </Grid>
      <Grid
        container
        item
        className={'flex-1'}
        justify={'center'}
        alignItems={'center'}
      >
        <Typography variant={'h4'} align={'center'}>
          Customize your offline shopping experience
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Header;
