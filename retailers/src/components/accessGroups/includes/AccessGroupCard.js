import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { updateAccessGroup, removeAccessGroups } from '../../../actions/accessGroups';

// Components
import { Typography, Grid, makeStyles, Button, Checkbox, Paper, Divider, Collapse } from '@material-ui/core';
import GroupInfoForm from './GroupInfoForm';
import GroupAccessForm from './GroupAccessForm';
import { getScopes } from '../../../utils';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  disabled: {
    backgroundColor: theme.palette.common.grey
  }
}));

const AccessGroup = ({ checkboxHandler, updateAccessGroup, removeAccessGroups, groupData }) => {
  const classes = useStyles();

  const [editing, setEditing] = useState(false);
  const [cardData, setCardData] = useState({ ...groupData, password: '' });

  const { _id, disabled, groupName, role, scopes } = cardData;

  const collapseHandler = () => {
    setEditing(!editing);
  };

  const handleClick = e => {
    const { title } = e.currentTarget;
    const { _id, ...rest } = cardData;

    switch (title) {
      case 'disable':
        setCardData({ ...cardData, disabled: true });
        updateAccessGroup(parseInt(_id), { ...rest, disabled: true }, true);
        break;

      case 'enable':
        setCardData({ ...cardData, disabled: false });
        updateAccessGroup(parseInt(_id), { ...rest, disabled: false }, true);
        break;

      case 'remove':
        removeAccessGroups([parseInt(_id)]);
        break;

      case 'cancel':
        setEditing(false);
        break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { _id, ...rest } = cardData;

    // Create using the same mutation for update
    // @params (accountId, formData, editing, storeId)
    updateAccessGroup(parseInt(_id), rest, true);

    setEditing(false);
  };

  const handleFormInput = ({ target }) => {
    const { checked, value, name } = target;

    if (target.type === 'checkbox') {
      // If checkbox selected and value not added, then add value to scopes array
      checked && !scopes.find(elem => elem === value) && setCardData({ ...cardData, scopes: [...scopes, value] });

      // If checkbos is unselected then remove value from scopes array
      !checked &&
        scopes.find(elem => elem === value) &&
        setCardData({
          ...cardData,
          scopes: scopes.filter(elem => elem !== value)
        });
    } else if (name === 'role') {
      setCardData({ ...cardData, [name]: value, scopes: getScopes(value) });
    } else {
      setCardData({ ...cardData, [name]: value });
    }

    console.log(cardData);
  };

  return (
    <Fragment>
      <Paper
        className={clsx('cardDataRow', {
          [classes.disabled]: disabled
        })}
        elevation={disabled ? 0 : 2}
      >
        <Grid
          className={'dataRow'}
          container
          direction={'row'}
          wrap={'nowrap'}
          alignItems={'center'}
          justify={'space-evenly'}
        >
          <Checkbox name={'accountCheckbox'} value={_id} onClick={e => checkboxHandler(e)} />
          <Grid item container direction={'row'} justify={'space-between'}>
            <Typography variant={'body2'}>id: {_id}</Typography>
            <Typography variant={'body2'}>group: {groupName}</Typography>
            <Typography variant={'body2'}>role: {role}</Typography>
          </Grid>
          <Grid item container direction={'row'} wrap={'nowrap'} justify={'flex-end'}>
            <Button variant={'outlined'} size={'small'} color={'secondary'} onClick={collapseHandler}>
              Edit
            </Button>
            <Button
              variant={disabled ? 'contained' : 'outlined'}
              size={'small'}
              color={'secondary'}
              onClick={handleClick}
              title={disabled ? 'enable' : 'disable'}
            >
              {disabled ? 'Enable' : 'Disable'}
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
            <GroupInfoForm data={cardData} formInputHandler={handleFormInput} editing={true} />

            <Divider variant={'fullWidth'} flexItem={true} orientation={'vertical'} />

            <GroupAccessForm data={cardData} formInputHandler={handleFormInput} />
          </Grid>

          {/* Form actions */}
          <Grid className={'row'} container item direction={'row'} justify={'space-between'}>
            <Button
              variant={'contained'}
              type={'button'}
              size={'medium'}
              color={'secondary'}
              title={'cancel'}
              onClick={handleClick}
            >
              Cancel
            </Button>
            <Button
              variant={'contained'}
              type={'submit'}
              size={'medium'}
              color={'secondary'}
              title={'submit'}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Collapse>
      </Paper>
    </Fragment>
  );
};

AccessGroup.propTypes = {
  updateAccessGroup: PropTypes.func.isRequired,
  removeAccessGroups: PropTypes.func.isRequired,
  checkboxHandler: PropTypes.func.isRequired,
  groupData: PropTypes.object.isRequired
};

export default connect(null, {
  updateAccessGroup,
  removeAccessGroups
})(AccessGroup);
