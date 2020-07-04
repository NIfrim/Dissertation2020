import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { getStores, updateStore, removeStores } from '../../actions/stores';

// Components
import { InteractiveTooltip } from '../includes';
import { Spinner } from '../layout';
import { StoreInfoForm } from './includes';
import {
  Typography,
  Grid,
  makeStyles,
  Button,
  Input,
  InputAdornment,
  Paper,
  Divider,
  Box,
  Collapse
} from '@material-ui/core';
import StoreCard from './includes';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {}
}));

const Stores = ({ auth: { account }, app: { loading }, stores, getStores, removeStores }) => {
  const classes = useStyles();

  const [hasPermission, setHasPermission] = useState(true);
  const [newStore, setNewStore] = useState(false);
  const [selectedStores, setSelectedStores] = useState([]);

  useEffect(() => {
    if (account) {
      const hasPermission = !!account.scopes.find(elem => elem === 'MANAGE_STORES' || elem === 'VIEW_STORES');
      setHasPermission(hasPermission);
      getStores(account.company._id);
    }
  }, [account, getStores]);

  const handleClick = e => {
    const { title } = e.currentTarget;

    switch (title) {
      case 'newStore':
        setNewStore(!newStore);
        break;

      case 'removeSelected':
        removeStores(selectedStores);
        break;

      default:
        break;
    }
  };

  const handleStoreSelected = ({ target: { value } }) => {
    !selectedStores.find(elem => elem === parseInt(value)) && setSelectedStores([...selectedStores, parseInt(value)]);

    selectedStores.find(elem => elem === parseInt(value)) &&
      setSelectedStores(selectedStores.filter(elem => elem !== parseInt(value)));
  };

  return !hasPermission ? (
    <Redirect to={'/'} />
  ) : (
    // Root container for all rows
    <Grid className={'column rowsContainer'} container direction={'column'}>
      {/* Row container */}
      <Grid className={'row'} item container direction={'column'}>
        <Grid className={'row rowTitle'} container item direction={'row'}>
          <Typography variant={'h4'}>Stores</Typography>
          <InteractiveTooltip text={'Manage Access Groups from this section'} />
        </Grid>
        {/* Row content with container */}
        <Paper className={'row rowContentWrapper'}>
          <Grid className={'rowContent'} container item direction={'column'}>
            {/* Row Action area with buttons and search */}
            <Grid container item direction={'row'} className={'row'} justify={'space-between'}>
              <Box>
                <Button
                  variant={'contained'}
                  color={'primary'}
                  onClick={e => handleClick(e)}
                  type={'button'}
                  title={'newStore'}
                >
                  New Store
                </Button>
                <Button
                  variant={'contained'}
                  color={'primary'}
                  onClick={e => handleClick(e)}
                  type={'button'}
                  title={'removeSelected'}
                >
                  Remove Selected
                </Button>
              </Box>

              <Input
                startAdornment={
                  <InputAdornment className={classes.searchIcon} position={'start'}>
                    <i className={'material-icons'}>search</i>
                  </InputAdornment>
                }
              />
            </Grid>

            <Divider />

            <Collapse className={'newGroupCollapseSection'} in={newStore} timeout='auto' unmountOnExit>
              <Grid className={'row'} container direction={'row'} justify={'space-evenly'} wrap={'nowrap'}>
                <StoreInfoForm key={'newStoreForm'} setVisible={setNewStore} editing={false} />

                <Divider variant={'fullWidth'} flexItem={true} orientation={'vertical'} />
              </Grid>

              <Divider variant={'fullWidth'} />
            </Collapse>

            <Grid className={'column contentDataWrapper'} container direction={'column'}>
              {loading ? (
                <Spinner />
              ) : (
                stores.map(store => {
                  const { location, ...rest } = store;

                  return (
                    <StoreCard
                      key={store._id}
                      checkboxHandler={handleStoreSelected}
                      storeData={{ store: { ...rest }, location }}
                    />
                  );
                })
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

Stores.propTypes = {
  auth: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  stores: PropTypes.array.isRequired,
  removeStores: PropTypes.func.isRequired,
  updateStore: PropTypes.func.isRequired,
  getStores: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, stores, app }) => ({
  auth,
  app,
  stores
});

export default connect(mapStateToProps, {
  getStores,
  updateStore,
  removeStores
})(Stores);
