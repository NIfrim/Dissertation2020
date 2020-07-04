import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { updatePromoGroup } from '../../../actions/promotions';
import { Grid, Box, Typography, FormControl, FormHelperText, Button } from '@material-ui/core';
import { Label, TextInput } from '../../includes';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  modalHeader: {
    display: 'flex',
    flexDirection: 'row'
  }
}));

const PromotionGroupForm = props => {
  const { data, type, setVisible, updatePromoGroup, editing } = props;

  const classes = useStyles();

  const initValues = {
    _id: '',
    name: '',
    description: '',
    category: type,
    disabled: false
  };

  const [formData, setFormData] = useState({
    _id: data && data._id ? data._id : '',
    name: data && data.name ? data.name : '',
    description: data && data.description ? data.description : '',
    category: data && data.category ? data.category : type,
    disabled: data && data.disabled ? data.disabled : false
  });
  const { name, description } = formData;

  const handleFormInput = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = e => {
    const { title } = e.currentTarget;

    switch (title) {
      case 'cancel':
        setVisible(false);
        setFormData(initValues);
        break;

      default:
        break;
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    const { _id, ...rest } = formData;
    // Create using the same mutation for update
    // @params (input = {}, editing = false, groupId = -1)
    editing ? updatePromoGroup(rest, true, parseInt(_id)) : updatePromoGroup(rest);

    // // Reset and close form
    // setFormData(initValues)
    // setVisible(false)
  };

  return (
    <Grid className={clsx('column', classes.root)} container item>
      <Box className={'column formHeader'}>
        <Typography className={classes.formTitle} variant={'h6'}>
          Group Information
        </Typography>
      </Box>

      <form>
        {/* GROUP NAME */}
        <FormControl className={'row formRow'} fullWidth variant={'outlined'} margin={'dense'}>
          <Label htmlFor={'name'}>Group Name</Label>
          <TextInput
            id={'name'}
            type={'text'}
            name={'name'}
            onChange={handleFormInput}
            labelWidth={90}
            value={name}
            autoComplete={'name'}
            required
          />
          <FormHelperText error hidden={name !== ''}>
            *required, descriptive
          </FormHelperText>
        </FormControl>

        {/* GROUP DESCRIPTION */}
        <FormControl className={'row formRow'} fullWidth variant={'outlined'} margin={'dense'}>
          <Label htmlFor={'description'}>Description</Label>
          <TextInput
            id={'description'}
            multiline
            type={'text'}
            name={'description'}
            onChange={handleFormInput}
            labelWidth={100}
            value={description}
            autoComplete={'description'}
            required
          />
          <FormHelperText error hidden={description !== ''}>
            *required, descriptive
          </FormHelperText>
        </FormControl>

        {/* Form Actions */}
        <Grid className={'row'} container item direction={'row'} justify={'space-between'}>
          <Button
            variant={'outlined'}
            type={'button'}
            size={'small'}
            color={'secondary'}
            title={'cancel'}
            onClick={handleClick}
          >
            Cancel
          </Button>
          <Button
            variant={'outlined'}
            type={'submit'}
            size={'small'}
            color={'secondary'}
            title={'submit'}
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

PromotionGroupForm.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  setVisible: PropTypes.func.isRequired,
  updatePromoGroup: PropTypes.func.isRequired,
  editing: PropTypes.bool
};

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps, { updatePromoGroup })(PromotionGroupForm);
