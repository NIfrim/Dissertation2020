import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Redux
import { getCoordinates } from '../../../actions/map';
import { updateStore } from '../../../actions/stores';

// Components
import {
  Typography,
  Grid,
  makeStyles,
  FormControl,
  FormHelperText,
  Box,
  IconButton,
  Button
} from '@material-ui/core';
import { TextInput, Label } from '../../includes';
import { ErrorBoundary } from '../../layout';
import MapDialog from './MapDialog';

const useStyles = makeStyles((theme) => ({
  modalHeader: {
    display: 'flex',
    flexDirection: 'row'
  }
}));

const StoreInfoForm = ({
  data,
  app: { loading },
  map,
  setVisible,
  updateStore,
  editing = false
}) => {
  const classes = useStyles();

  const initValues = {
    store: {
      name: '',
      disabled: false
    },
    location: {
      _id: '',
      country: '',
      city: '',
      street: '',
      number: '',
      postcode: '',
      latitude: 0.0,
      longitude: 0.0
    },
    account: {
      disabled: false,
      username: '',
      password: '',
      groupName: 'Store Super',
      type: 'STORE_ACCOUNT',
      role: 'STORE_SUPER',
      scopes: [
        'MANAGE_STORE_ACCESS_GROUPS',
        'MANAGE_PRODUCTS',
        'MANAGE_PROMOTIONS',
        'MANAGE_STORE_DETAILS'
      ]
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState(initValues);

  const {
    locationId,
    country,
    number,
    city,
    street,
    postcode,
    latitude,
    longitude
  } = map;

  // eslint-disable-next-line
  useEffect(() => {
    // Update the location using the map data
    if (!map.loading && locationId === formData.location._id) {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          country,
          number,
          city,
          street,
          postcode,
          latitude,
          longitude
        }
      });
    }
    // eslint-disable-next-line
  }, [map.loading]);

  useEffect(() => {
    console.log(data);
    if (editing) setFormData({ ...formData, ...data });
    // eslint-disable-next-line
  }, []);

  const handleFormInput = ({ target }) => {
    if (Object.keys(formData.store).includes(target.name)) {
      setFormData({
        ...formData,
        store: { ...formData.store, [target.name]: target.value }
      });
    } else if (Object.keys(formData.location).includes(target.name)) {
      setFormData({
        ...formData,
        location: { ...formData.location, [target.name]: target.value }
      });
    } else if (Object.keys(formData.account).includes(target.name)) {
      setFormData({
        ...formData,
        account: { ...formData.account, [target.name]: target.value }
      });
    }
  };

  const handleClick = (e) => {
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Create using the same mutation for update
    // @params (storeId, formData, editing)
    !editing
      ? updateStore(null, { ...formData })
      : updateStore(
          formData.store._id,
          {
            store: { ...formData.store },
            location: { ...formData.location }
          },
          true
        );

    // Reset and close form
    if (
      (!editing &&
        formData.store.name &&
        formData.location.city &&
        formData.location.street &&
        formData.location.postcode &&
        formData.location.latitude &&
        formData.location.longitude &&
        formData.account.username &&
        formData.account.password) ||
      (editing &&
        formData.store.name &&
        formData.location.city &&
        formData.location.street &&
        formData.location.postcode &&
        formData.location.latitude &&
        formData.location.longitude)
    ) {
      setFormData(initValues);
      setVisible(false);
    }
  };

  return (
    <Grid className={'column'} container item>
      <Box className={'column formHeader'}>
        <Typography className={classes.formTitle} variant={'h5'}>
          Store Information
        </Typography>
        <Typography variant={'body2'}>
          Add the main access details from here. Location can also be picked
          through the provided picker.
        </Typography>
      </Box>

      <form>
        {/* STORE NAME FIELD */}
        <FormControl
          className={'row formRow'}
          fullWidth
          variant={'outlined'}
          margin={'dense'}
        >
          <Label htmlFor={'storeName'}>Store Name</Label>
          <TextInput
            id={'storeName'}
            type={'text'}
            name={'name'}
            onChange={handleFormInput}
            labelWidth={90}
            value={formData.store ? formData.store.name : ''}
            autoComplete={'store-name'}
            required
          />

          <FormHelperText error hidden={formData.store.name !== ''}>
            *required, descriptive
          </FormHelperText>
        </FormControl>

        {/* STORE ACCOUNT USERNAME */}
        {!editing ? (
          <FormControl
            className={'row formRow'}
            fullWidth
            variant={'outlined'}
            margin={'dense'}
          >
            <Label htmlFor={'username'}>Account Username</Label>
            <TextInput
              id={'username'}
              type={'text'}
              name={'username'}
              onChange={handleFormInput}
              labelWidth={170}
              value={formData.account.username ? formData.account.username : ''}
              autoComplete={'new-username'}
              required
            />

            <FormHelperText error hidden={formData.account.username !== ''}>
              *required, descriptive, no space
            </FormHelperText>
          </FormControl>
        ) : (
          ''
        )}

        {!editing ? (
          <ErrorBoundary>
            <FormControl
              className={'row formRow'}
              fullWidth
              variant={'outlined'}
              margin={'dense'}
            >
              <Label htmlFor={'password'}>Account Password</Label>
              <TextInput
                id={'password'}
                type={passwordVisible ? 'text' : 'password'}
                name={'password'}
                onChange={handleFormInput}
                labelWidth={170}
                value={
                  !!formData.account.password ? formData.account.password : ''
                }
                endAdornment={
                  <IconButton
                    onClick={(e) => setPasswordVisible(!passwordVisible)}
                    size={'small'}
                  >
                    <i className={'material-icons'}>
                      {passwordVisible ? 'visibility_off' : 'visibility'}
                    </i>
                  </IconButton>
                }
                autoComplete={'new-password'}
                required
              />
              <FormHelperText
                error
                hidden={
                  !!formData.account.password &&
                  formData.account.password !== ''
                }
              >
                *required
              </FormHelperText>
            </FormControl>
          </ErrorBoundary>
        ) : (
          ''
        )}

        {formData.location && !loading ? (
          <Fragment>
            <FormControl
              className={'row formRow'}
              fullWidth
              variant={'outlined'}
              margin={'dense'}
              disabled
            >
              <Label htmlFor={'country'}>Country</Label>
              <TextInput
                id={'country'}
                type={'text'}
                name={'country'}
                onChange={handleFormInput}
                label={'Country'}
                value={formData.location.country}
                autoComplete={'country'}
                required
              />
            </FormControl>
            <FormControl
              className={'row formRow'}
              fullWidth
              variant={'outlined'}
              margin={'dense'}
              disabled
            >
              <Label htmlFor={'city'}>City</Label>
              <TextInput
                id={'city'}
                type={'text'}
                name={'city'}
                onChange={handleFormInput}
                label={'City'}
                value={formData.location.city}
                autoComplete={'city'}
                required
              />
            </FormControl>
            <Grid container direction={'row'}>
              <FormControl
                className={'row formRow'}
                fullWidth
                variant={'outlined'}
                margin={'dense'}
                disabled
              >
                <Label htmlFor={'number'}>Number</Label>
                <TextInput
                  id={'number'}
                  type={'text'}
                  name={'number'}
                  label={'Number'}
                  value={formData.location.number}
                  autoComplete={'new-number'}
                  required
                />
              </FormControl>

              <FormControl
                className={'row formRow'}
                fullWidth
                variant={'outlined'}
                margin={'dense'}
                disabled
              >
                <Label htmlFor={'street'}>Road</Label>
                <TextInput
                  id={'street'}
                  type={'text'}
                  name={'street'}
                  label={'Road'}
                  value={formData.location.street}
                  autoComplete={'street'}
                  required
                />
              </FormControl>
            </Grid>
            <FormControl
              className={'row formRow'}
              fullWidth
              variant={'outlined'}
              margin={'dense'}
              disabled
            >
              <Label htmlFor={'postcode'}>Postcode</Label>
              <TextInput
                id={'postcode'}
                type={'text'}
                name={'postcode'}
                label={'Postcode'}
                value={formData.location.postcode}
                autoComplete={'postcode'}
                required
              />
            </FormControl>{' '}
          </Fragment>
        ) : (
          ''
        )}

        {/* STORE LOCATION PICKER */}
        <MapDialog location={data ? formData.location : map} />

        {/* Form Actions */}
        <Grid
          className={'row'}
          container
          item
          direction={'row'}
          justify={'space-between'}
        >
          <Button
            variant={'contained'}
            type={'button'}
            size={'medium'}
            color={'secondary'}
            title={'cancel'}
            onClick={(e) => handleClick(e)}
          >
            Cancel
          </Button>
          <Button
            variant={'contained'}
            type={'submit'}
            size={'medium'}
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

StoreInfoForm.propTypes = {
  data: PropTypes.object,
  app: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  setVisible: PropTypes.func.isRequired,
  getCoordinates: PropTypes.func.isRequired,
  updateStore: PropTypes.func.isRequired,
  editing: PropTypes.bool
};

const mapStateToProps = ({ app, map }) => ({
  app,
  map
});

export default connect(mapStateToProps, { getCoordinates, updateStore })(
  StoreInfoForm
);
