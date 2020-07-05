import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Yup from 'yup';
// Components
import {
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  FormHelperText
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { updateAccountSettings } from '../../../actions/user';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
}));

const AccessibilityForm = ({ account, updateAccountSettings }) => {
  const classes = useStyles();

  const handleSubmit = (formData) => {
    const { _id, ...accountInfo } = account;

    updateAccountSettings({
      ...accountInfo,
      ...formData
    });
  };

  return (
    <Box mt={2}>
      <Formik
        onSubmit={(formData) => handleSubmit(formData)}
        initialValues={{
          theme: account.theme,
          fontScale: account.fontScale
        }}
        validationSchema={validationSchema}
      >
        {(props) => (
          <Form className={classes.root} onSubmit={props.handleSubmit}>
            <Typography variant={'h5'} color={'textSecondary'}>
              Colour Theme
            </Typography>
            <FormControl component={'fieldset'} className={'form-field-group'}>
              <FormLabel component='legend'>
                Select a theme based on your specific requirements, each theme
                has it's positives and negatives.
              </FormLabel>
              <RadioGroup
                name={'theme'}
                value={props.values.theme}
                onChange={props.handleChange}
              >
                <FormControlLabel
                  value='light'
                  control={<Radio size={'small'} />}
                  label={
                    <Box mb={1} mt={1}>
                      <Typography variant={'body2'}>
                        Light theme (Increases visibility under direct sunlight,
                        has higher battery consumption.)
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value='dark'
                  control={<Radio size={'small'} />}
                  label={
                    <Box mb={1} mt={1}>
                      <Typography variant={'body2'}>
                        Dark theme (Helps reduce battery consumption and eye
                        strain, poor visibility under direct sunlight)
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value='colour-blind'
                  control={<Radio size={'small'} />}
                  label={
                    <Box mb={1} mt={1}>
                      <Typography variant={'body2'}>
                        Colour blind theme (Uses high contrast colours to make
                        it easier to read text.)
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>
              {props.errors.theme && props.touched.theme ? (
                <FormHelperText id='theme-error'>
                  {props.errors.theme}
                </FormHelperText>
              ) : null}
            </FormControl>

            <Typography variant={'h5'} color={'textSecondary'}>
              Adjust Font Size
            </Typography>
            <Typography variant={'body2'} color={'textSecondary'}>
              Increase font-scale for better readability.
            </Typography>
            <FormControl variant={'outlined'} className={'form-field-group'}>
              <InputLabel htmlFor={'fontScale'}>Font Scale</InputLabel>
              <Select
                id='fontScale'
                value={props.values.fontScale}
                onChange={(event) =>
                  props.setFieldValue('fontScale', event.target.value)
                }
                label={'Font Scale'}
              >
                <MenuItem value={1.0}>Normal</MenuItem>
                <MenuItem value={1.1}>Medium</MenuItem>
                <MenuItem value={1.2}>Large</MenuItem>
              </Select>
              {props.errors.fontScale && props.touched.fontScale ? (
                <FormHelperText id='fontScale-error'>
                  {props.errors.fontScale}
                </FormHelperText>
              ) : null}
            </FormControl>

            <Button
              variant={'contained'}
              size={'large'}
              color={'primary'}
              type={'submit'}
            >
              Confirm
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const validationSchema = Yup.object().shape({
  theme: Yup.mixed()
    .oneOf(
      ['dark', 'light', 'colour-blind'],
      'Theme can only be one of [dark, light, colour-blind]'
    )
    .required('Please select one of the options'),
  fontScale: Yup.mixed()
    .oneOf(
      [1.0, 1.1, 1.2],
      'Font scale can only be one of [1 - Normal, 1.1 - Medium, 1.2 - Large]'
    )
    .required('Please select a value from the list.')
});

AccessibilityForm.propTypes = {
  updateAccountSettings: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired
};

const mapStateToProps = ({ user }) => ({
  account: user.account
});

export default connect(mapStateToProps, { updateAccountSettings })(
  AccessibilityForm
);
