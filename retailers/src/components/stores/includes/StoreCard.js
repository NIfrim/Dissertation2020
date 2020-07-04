import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { updateStore, removeStores } from '../../../actions/stores';

// Components
import { Typography, Grid, makeStyles, Button, Checkbox, Paper, Divider, Collapse, Box } from '@material-ui/core';
import clsx from 'clsx';
import { StoreInfoForm } from '.';
import { useTheme } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  disabled: {
    backgroundColor: theme.palette.common.grey
  }
}));

const StoreCard = ({ auth, checkboxHandler, updateStore, removeStores, storeData }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [editing, setEditing] = useState(false);
  const [cardData, setCardData] = useState({ ...storeData });

  const { store, location } = cardData;

  const collapseHandler = () => {
    setEditing(!editing);
  };

  const handleClick = e => {
    const { title } = e.currentTarget;

    switch (title) {
      case 'disable':
        updateStore(parseInt(store._id), { store: { ...store, disabled: true }, location }, true);
        break;

      case 'enable':
        updateStore(parseInt(store._id), { store: { ...store, disabled: false }, location }, true);
        break;

      case 'remove':
        removeStores([parseInt(store._id)]);
        break;

      case 'cancel':
        setEditing(false);
        break;

      default:
        break;
    }
  };

  const handleFormInput = ({ target }) => {
    if (Object.keys(cardData.store).includes(target.name)) {
      setCardData({
        ...cardData,
        store: { ...cardData.store, [target.name]: target.value }
      });
    } else if (Object.keys(cardData.location).includes(target.name)) {
      setCardData({
        ...cardData,
        location: { ...cardData.location, [target.name]: target.value }
      });
    }
  };

  return (
    <Fragment>
      <Paper
        className={clsx('cardDataRow', {
          [classes.disabled]: store.disabled
        })}
        elevation={store.disabled ? 0 : 2}
      >
        <Grid
          className={'dataRow'}
          container
          direction={'row'}
          wrap={'nowrap'}
          alignItems={'center'}
          justify={'space-evenly'}
        >
          <Checkbox name={'accountCheckbox'} value={store._id} onChange={checkboxHandler} />
          <Grid item container direction={'row'} justify={'flex-start'}>
            <Box marginLeft={theme.spacing(0.1)}>
              <Typography variant={'body2'}>id: {store._id}</Typography>
            </Box>
            <Box marginLeft={theme.spacing(0.3)}>
              <Typography variant={'body2'}>name: {store.name}</Typography>
            </Box>
            <Box marginLeft={theme.spacing(0.3)}>
              <Typography variant={'body2'}>city: {location.city}</Typography>
            </Box>
          </Grid>
          <Grid item container direction={'row'} wrap={'nowrap'} justify={'flex-end'}>
            <Button variant={'outlined'} size={'small'} color={'secondary'} onClick={collapseHandler}>
              Edit
            </Button>
            <Button
              variant={store.disabled ? 'contained' : 'outlined'}
              size={'small'}
              color={'secondary'}
              onClick={handleClick}
              title={store.disabled ? 'enable' : 'disable'}
            >
              {store.disabled ? 'Enable' : 'Disable'}
            </Button>
            <Button variant={'outlined'} size={'small'} color={'secondary'} onClick={handleClick} title={'remove'}>
              Remove
            </Button>
          </Grid>
        </Grid>

        <Divider />

        {/* Forms */}
        <Collapse className={'cardCollapseSection'} in={editing} timeout='auto' unmountOnExit>
          <Grid className={'row'} container direction={'row'} wrap={'nowrap'} justify={'space-evenly'}>
            <StoreInfoForm
              key={`editForm_${store._id}`}
              data={cardData}
              formInputHandler={handleFormInput}
              setVisible={setEditing}
              editing={true}
            />

            <Divider variant={'fullWidth'} flexItem={true} orientation={'vertical'} />
          </Grid>
        </Collapse>
      </Paper>
    </Fragment>
  );
};

StoreCard.propTypes = {
  auth: PropTypes.object.isRequired,
  updateStore: PropTypes.func.isRequired,
  removeStores: PropTypes.func.isRequired,
  checkboxHandler: PropTypes.func.isRequired,
  storeData: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps, {
  updateStore,
  removeStores
})(StoreCard);
