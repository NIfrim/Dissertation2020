import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import {
  updateProductGroup,
  removeProductGroups,
  removeProducts
} from '../../../actions/products';

// Components
import {
  Typography,
  Grid,
  makeStyles,
  Button,
  Checkbox,
  Paper,
  Divider,
  Collapse,
  Box
} from '@material-ui/core';
import clsx from 'clsx';
import ProductGroupForm from './ProductGroupForm';
import { useTheme } from '@material-ui/styles';
import LinkedProductsTable from './LinkedProductsTable';

const useStyles = makeStyles((theme) => ({
  disabled: {
    backgroundColor: theme.palette.common.grey
  }
}));

const ProductGroupCard = ({
  auth: { account },
  checkboxHandler,
  updateProductGroup,
  removeProductGroups,
  groupData
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const [editing, setEditing] = useState(false);

  const { _id, name, description, disabled } = groupData;

  const collapseHandler = () => {
    setEditing(!editing);
  };

  const handleClick = (e) => {
    const { title } = e.currentTarget;

    switch (title) {
      case 'disable':
        updateProductGroup(
          parseInt(account.store._id),
          parseInt(_id),
          {
            name,
            description,
            disabled: true
          },
          [],
          true
        );
        break;

      case 'enable':
        updateProductGroup(
          parseInt(account.store._id),
          parseInt(_id),
          {
            name,
            description,
            disabled: false
          },
          [],
          true
        );
        break;

      case 'remove':
        removeProductGroups(parseInt(account.store._id), [parseInt(_id)]);
        break;

      case 'cancel':
        setEditing(false);
        break;

      default:
        break;
    }
  };

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   const { _id, location, ...rest } = groupData
  //   // Create using the same mutation for update
  //   // @params (accountId, groupData, editing)
  //   updateProductGroup(parseInt(_id), { input: { ...rest } }, true)
  //   setEditing(false)
  // }

  // const handleFormInput = ({ target }) => {
  //   if (Object.keys(groupData.store).includes(target.name)) {
  //     setCardData({
  //       ...groupData,
  //       store: { ...groupData.store, [target.name]: target.value }
  //     })
  //   } else if (Object.keys(groupData.location).includes(target.name)) {
  //     setCardData({
  //       ...groupData,
  //       location: { ...groupData.location, [target.name]: target.value }
  //     })
  //   }
  // }

  return (
    <Paper
      className={clsx('groupDataRow', {
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
        <Checkbox
          name={'accountCheckbox'}
          value={_id}
          onChange={checkboxHandler}
        />
        <Grid item container direction={'row'} justify={'flex-start'}>
          <Box marginLeft={theme.spacing(0.1)}>
            <Typography variant={'body2'}>id: {_id}</Typography>
          </Box>
          <Box marginLeft={theme.spacing(0.3)}>
            <Typography variant={'body2'}>
              name: {!!name ? name : ''}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          container
          direction={'row'}
          wrap={'nowrap'}
          justify={'flex-end'}
        >
          <Button
            variant={'outlined'}
            size={'small'}
            color={'secondary'}
            onClick={collapseHandler}
          >
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
          <Button
            variant={'outlined'}
            size={'small'}
            color={'secondary'}
            onClick={handleClick}
            title={'remove'}
          >
            Remove
          </Button>
        </Grid>
      </Grid>

      <Divider />

      {/* Forms */}
      <Collapse
        className={'cardCollapseSection'}
        in={editing}
        timeout='auto'
        unmountOnExit
      >
        <Grid
          className={'row'}
          container
          direction={'row'}
          wrap={'nowrap'}
          justify={'space-evenly'}
        >
          <ProductGroupForm
            key={`editForm_${_id}`}
            data={groupData}
            setVisible={setEditing}
            editing={true}
          />
        </Grid>

        {/* Table with products */}
        <LinkedProductsTable groupId={_id} />
      </Collapse>
    </Paper>
  );
};

ProductGroupCard.propTypes = {
  auth: PropTypes.object.isRequired,
  updateProductGroup: PropTypes.func.isRequired,
  removeProductGroups: PropTypes.func.isRequired,
  removeProducts: PropTypes.func.isRequired,
  checkboxHandler: PropTypes.func.isRequired,
  groupData: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps, {
  updateProductGroup,
  removeProductGroups,
  removeProducts
})(ProductGroupCard);
