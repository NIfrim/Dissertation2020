import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Redux
import { updateProductGroup } from '../../../actions/products';

// Components
import {
  Typography,
  Grid,
  makeStyles,
  FormControl,
  FormHelperText,
  Box,
  Button,
  Divider
} from '@material-ui/core';
import { TextInput, Label, InteractiveTooltip } from '../../includes';
import { CustomDropzone } from '../../includes';

const useStyles = makeStyles((theme) => ({
  modalHeader: {
    display: 'flex',
    flexDirection: 'row'
  }
}));

const ProductGroupForm = ({
  data,
  auth: { account },
  setVisible,
  updateProductGroup,
  editing = false
}) => {
  const classes = useStyles();

  const initValues = {
    _id: '',
    name: '',
    description: '',
    disabled: false,
    files: []
  };

  const [formData, setFormData] = useState(data ? data : initValues);
  const { _id, name, description, files, disabled } = formData;

  const handleFormInput = (e) => {
    if (!!e.target) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      // Adding files through the dropzone returns undefined for target
      // so it has to be handled separately
      setFormData({ ...formData, files: e });
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
    // @params (storeId = null, groupId = null, productGroup = {}, files = [], editing = false)
    !editing
      ? updateProductGroup(
          parseInt(account.store._id),
          null,
          { name, description, disabled },
          files,
          false
        )
      : updateProductGroup(
          parseInt(account.store._id),
          parseInt(_id),
          { name, description, disabled },
          files,
          true
        );

    // Reset and close form
    if (formData.name && !editing) {
      setFormData(initValues);
      setVisible(false);
    }
  };

  return (
    <Grid className={'column'} container item>
      <Box className={'column formHeader'}>
        <Typography className={classes.formTitle} variant={'h5'}>
          Product Group Information
        </Typography>
        <Typography variant={'body2'}>
          Create a product group to store your products. These can then be
          linked to promotions, so we recommmend creating the product groups for
          the related promotion groups.
        </Typography>
      </Box>

      <form>
        {/* GROUP NAME */}
        <FormControl
          className={'row formRow'}
          fullWidth
          variant={'outlined'}
          margin={'dense'}
        >
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
        <FormControl
          className={'row formRow'}
          fullWidth
          variant={'outlined'}
          margin={'dense'}
        >
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
          />
        </FormControl>

        <Divider
          variant={'fullWidth'}
          flexItem={true}
          orientation={'vertical'}
        />
        <Box display={'flex'} flexDirection={'column'}>
          <Box display={'flex'} alignItems={'flex-start'} p={1}>
            <InteractiveTooltip
              text={
                'The products file should contain 7 columns (name, brand, categories, price, stock, shortDescription, longDescription). The categories should be values separated by "/"'
              }
            />
            <Typography variant={'h5'}>Add products using a file:</Typography>
          </Box>
          <CustomDropzone onChange={(files) => handleFormInput(files)} />
        </Box>

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

ProductGroupForm.propTypes = {
  data: PropTypes.object,
  setVisible: PropTypes.func.isRequired,
  updateProductGroup: PropTypes.func.isRequired,
  editing: PropTypes.bool
};

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps, { updateProductGroup })(
  ProductGroupForm
);
