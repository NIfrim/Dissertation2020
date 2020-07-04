import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { getAccessGroups, updateAccessGroup, removeAccessGroups } from '../../actions/accessGroups';

// Components
import { InteractiveTooltip } from '../includes';
import { Spinner } from '../layout';
import { GroupAccessForm, GroupInfoForm } from './includes';
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
import AccessGroupCard from './includes/AccessGroupCard';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {}
}));

const AccessGroups = ({
  auth: { account },
  app: { errors, loading },
  accessGroups,
  getAccessGroups,
  updateAccessGroup,
  removeAccessGroups
}) => {
  const classes = useStyles();

  const initValues = {
    role: '',
    type: '',
    username: '',
    groupName: '',
    password: '',
    scopes: []
  };

  const [newGroup, setNewGroup] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [formData, setFormData] = useState(initValues);
  const { role, type, username, groupName, password, scopes } = formData;

  useEffect(() => {
    if (account) {
      if (!account.scopes.find(elem => elem === 'MANAGE_ACCESS_GROUPS' || 'MANAGE_STORE_ACCESS_GROUPS')) {
        return <Redirect to={'/'} />;
      }
      getAccessGroups(account.type, account.company._id, account.store && account.store._id);
    }
  }, [account, getAccessGroups]);

  const handleFormInput = ({ target }) => {
    if (target.type === 'checkbox') {
      const { checked, value } = target;

      // If checkbox selected and value not added, then add value to scopes array
      checked &&
        !scopes.find(elem => elem === target.value) &&
        setFormData({ ...formData, scopes: [...scopes, value] });

      // If checkbos is unselected then remove value from scopes array
      !checked &&
        scopes.find(elem => elem === target.value) &&
        setFormData({
          ...formData,
          scopes: scopes.filter(elem => elem !== value)
        });
    } else {
      setFormData({ ...formData, [target.name]: target.value });
    }
  };

  const handleClick = e => {
    const { title } = e.currentTarget;

    switch (title) {
      case 'newGroup':
        setNewGroup(!newGroup);
        break;

      case 'cancel':
        setNewGroup(false);
        setFormData(initValues);
        break;

      case 'removeSelected':
        removeAccessGroups(selectedGroups);
        break;

      default:
        break;
    }
  };

  const handleSubmitNew = e => {
    e.preventDefault();
    // Create using the same mutation for update
    // @params (accountId, formData, edit, storeId)
    const storeId = account.store ? parseInt(account.store._id) : null;
    updateAccessGroup(null, { ...formData, disabled: false }, false, storeId);

    if (groupName && type && username && password && role) {
      setFormData(initValues);
      setNewGroup(false);
    }
  };

  const handleGroupSelected = ({ target: { value } }) => {
    !selectedGroups.find(elem => elem === value) && setSelectedGroups([...selectedGroups, parseInt(value)]);

    selectedGroups.find(elem => elem === parseInt(value)) &&
      setSelectedGroups(selectedGroups.filter(elem => elem !== value));
  };

  return (
    // Root container for all rows
    <Grid className={'column rowsContainer'} container direction={'column'}>
      {/* Row container */}
      <Grid className={'row'} item container direction={'column'}>
        <Grid className={'row rowTitle'} container item direction={'row'}>
          <Typography variant={'h4'}>Access Groups</Typography>
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
                  title={'newGroup'}
                >
                  New Group
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

            <Collapse className={'newGroupCollapseSection'} in={newGroup} timeout='auto' unmountOnExit>
              <form onSubmit={handleSubmitNew}>
                <Grid className={'row'} container direction={'row'} justify={'space-evenly'} wrap={'nowrap'}>
                  <GroupInfoForm data={formData} formInputHandler={handleFormInput} editing={false} />

                  <Divider variant={'fullWidth'} flexItem={true} orientation={'vertical'} />

                  <GroupAccessForm data={formData} formInputHandler={handleFormInput} />
                </Grid>

                <Divider variant={'fullWidth'} />

                {/* Form actions */}
                <Grid className={'row'} container item direction={'row'} justify={'space-between'}>
                  <Button
                    variant={'contained'}
                    type={'button'}
                    size={'medium'}
                    color={'secondary'}
                    title={'cancel'}
                    onClick={e => handleClick(e)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant={'contained'}
                    type={'submit'}
                    size={'medium'}
                    color={'secondary'}
                    title={'submit'}
                    onClick={handleSubmitNew}
                  >
                    Submit
                  </Button>
                </Grid>
              </form>
            </Collapse>

            <Grid className={'column contentDataWrapper'} container direction={'column'}>
              {loading ? (
                <Spinner />
              ) : (
                accessGroups.map(accessGroup => (
                  <AccessGroupCard
                    key={accessGroup._id}
                    checkboxHandler={handleGroupSelected}
                    groupData={accessGroup}
                  />
                ))
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

AccessGroups.propTypes = {
  auth: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  accessGroups: PropTypes.array.isRequired,
  removeAccessGroups: PropTypes.func.isRequired,
  getAccessGroups: PropTypes.func.isRequired,
  updateAccessGroup: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, accessGroups, app }) => ({
  auth,
  app,
  accessGroups
});

export default connect(mapStateToProps, {
  getAccessGroups,
  updateAccessGroup,
  removeAccessGroups
})(AccessGroups);
