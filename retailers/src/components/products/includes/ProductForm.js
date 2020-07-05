import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Button
} from '@material-ui/core';
import { updateProduct } from '../../../actions/products';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
}));

const ProductForm = ({ groupId, productData, updateProduct }) => {
  const classes = useStyles();

  const handleSubmit = (formData) => {
    const productId = parseInt(productData._id);
    updateProduct(groupId, productId, { ...formData });
  };

  return (
    <Box>
      <Formik
        initialValues={{
          name: productData.name,
          brand: productData.brand,
          price: parseFloat(productData.price),
          stock: parseInt(productData.stock),
          shortDescription: productData.shortDescription,
          longDescription: productData.longDescription
        }}
        validationSchema={validationSchema}
        onSubmit={(formData) => handleSubmit(formData)}
      >
        {(props) => (
          <Form className={classes.root} onSubmit={props.handleSubmit}>
            <FormControl variant={'outlined'} className={'form-field-group'}>
              <InputLabel htmlFor='name' color={'primary'}>
                Name
              </InputLabel>
              <OutlinedInput
                error={props.errors.name && props.touched.name}
                id={'name'}
                name={'name'}
                label={'Name'}
                type={'text'}
                className={classes.formField}
                onChange={props.handleChange}
                value={props.values.name}
                inputProps={{ className: 'form-field', autoCapitalize: 'on' }}
                autoComplete={'new-name'}
                autoFocus
              />
              {props.errors.name && props.touched.name ? (
                <FormHelperText id='name-error'>
                  {props.errors.name}
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl variant={'outlined'} className={'form-field-group'}>
              <InputLabel htmlFor='brand' color={'primary'}>
                Brand
              </InputLabel>
              <OutlinedInput
                error={props.errors.brand && props.touched.brand}
                id={'brand'}
                name={'brand'}
                label={'Brand'}
                type={'text'}
                className={classes.formField}
                onChange={props.handleChange}
                value={props.values.brand}
                inputProps={{ className: 'form-field', autoCapitalize: 'on' }}
                autoComplete={'new-brand'}
              />
              {props.errors.brand && props.touched.brand ? (
                <FormHelperText id='brand-error'>
                  {props.errors.brand}
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl variant={'outlined'} className={'form-field-group'}>
              <InputLabel htmlFor='price' color={'primary'}>
                Price
              </InputLabel>
              <OutlinedInput
                error={props.errors.price && props.touched.price}
                id={'price'}
                name={'price'}
                label={'Price'}
                type={'number'}
                className={classes.formField}
                onChange={props.handleChange}
                value={props.values.price}
                inputProps={{ className: 'form-field', step: 0.01 }}
                autoComplete={'new-price'}
              />
              {props.errors.price && props.touched.price ? (
                <FormHelperText id='price-error'>
                  {props.errors.price}
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl variant={'outlined'} className={'form-field-group'}>
              <InputLabel htmlFor='stock' color={'primary'}>
                Stock
              </InputLabel>
              <OutlinedInput
                error={props.errors.stock && props.touched.stock}
                id={'stock'}
                name={'stock'}
                label={'Stock'}
                type={'number'}
                className={classes.formField}
                onChange={props.handleChange}
                value={props.values.stock}
                inputProps={{ className: 'form-field', step: 1 }}
                autoComplete={'new-stock'}
              />
              {props.errors.stock && props.touched.stock ? (
                <FormHelperText id='stock-error'>
                  {props.errors.stock}
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl variant={'outlined'} className={'form-field-group'}>
              <InputLabel htmlFor='shortDescription' color={'primary'}>
                Short Description
              </InputLabel>
              <OutlinedInput
                error={
                  props.errors.shortDescription &&
                  props.touched.shortDescription
                }
                id={'shortDescription'}
                name={'shortDescription'}
                label={'Short Description'}
                type={'text'}
                multiline
                className={classes.formField}
                onChange={props.handleChange}
                value={props.values.shortDescription}
                inputProps={{ className: 'form-field', autoCapitalize: 'on' }}
                autoComplete={'new-shortDescription'}
              />
              {props.errors.shortDescription &&
              props.touched.shortDescription ? (
                <FormHelperText id='shortDescription-error'>
                  {props.errors.shortDescription}
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl variant={'outlined'} className={'form-field-group'}>
              <InputLabel htmlFor='longDescription' color={'primary'}>
                Long Description
              </InputLabel>
              <OutlinedInput
                error={
                  props.errors.longDescription && props.touched.longDescription
                }
                id={'longDescription'}
                name={'longDescription'}
                label={'Long Description'}
                type={'text'}
                multiline
                className={classes.formField}
                onChange={props.handleChange}
                value={props.values.longDescription}
                inputProps={{ className: 'form-field', autoCapitalize: 'on' }}
                autoComplete={'new-longDescription'}
              />
              {props.errors.longDescription && props.touched.longDescription ? (
                <FormHelperText id='longDescription-error'>
                  {props.errors.longDescription}
                </FormHelperText>
              ) : null}
            </FormControl>

            <Button
              variant={'contained'}
              size={'large'}
              color={'primary'}
              type={'submit'}
            >
              Update
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max('100', "That's a very long name (max: 100 chars)")
    .required('Please enter a product name (max: 100 chars)'),
  brand: Yup.string()
    .max('45', "That's a very long brand name (max: 45 chars)")
    .required('Please enter a brand name (max: 45 chars)'),
  price: Yup.number().required('Please enter a price'),
  stock: Yup.number().required('Please enter the amount in stock.'),
  shortDescription: Yup.string()
    .max('255', 'Too long for a short description (max: 255 chars)')
    .required('Please enter a short description (max: 255 chars)'),
  longDescription: Yup.string()
    .max('1000', 'Too long for a description (max: 1000 chars)')
    .required('Please enter a long description (max: 1000 chars)')
});

ProductForm.propTypes = {
  groupId: PropTypes.number.isRequired,
  productData: PropTypes.object.isRequired,
  updateProduct: PropTypes.func.isRequired
};

export default connect(null, { updateProduct })(ProductForm);
