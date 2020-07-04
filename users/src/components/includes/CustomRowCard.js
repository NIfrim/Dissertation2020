import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Collapse,
  Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// Redux
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light
  },
  collapseBtn: {
    width: 50,
    height: 50
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    padding: theme.spacing(1),
    paddingBottom: `${theme.spacing(1)}px !important`
  }
}));

const CustomRowCard = ({ icon, title, description, children }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen(!open);
  };

  return (
    <Card classes={{ root: classes.root }}>
      <CardActionArea onClick={handleClick}>
        <CardContent className={classes.cardDetails}>
          <Box alignSelf={'center'} mr={1}>
            <Typography
              variant={'h3'}
              color={'textSecondary'}
              className={`mdi mdi-${icon}`}
            />
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'flex-start'}
            flexGrow={1}
            flexShrink={1}
          >
            <Typography variant={'h5'} color={'textSecondary'}>
              {title}
            </Typography>
            <Typography variant={'body2'} color={'textSecondary'}>
              {description}
            </Typography>
          </Box>

          <Box
            className={classes.collapseBtn}
            display={'flex'}
            justifyContent={'flex-end'}
            alignItems={'center'}
          >
            <Typography
              variant={'h6'}
              color={'textSecondary'}
              align={'right'}
              className={`mdi mdi-arrow-${open ? 'up' : 'down'}`}
            />
          </Box>
        </CardContent>
      </CardActionArea>
      <Collapse in={open} timeout='auto' mountOnEnter unmountOnExit>
        <CardContent id={'cardContent'}>{children}</CardContent>
      </Collapse>
    </Card>
  );
};

CustomRowCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(CustomRowCard);
