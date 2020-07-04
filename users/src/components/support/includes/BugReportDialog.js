import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { sendBugReport } from '../../../actions/user';
import { Form, Formik } from 'formik';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput
} from '@material-ui/core';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  dialogContentWrapper: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const BugReportDialog = ({ dialogOpen, setDialogOpen, sendBugReport }) => {
  const classes = useStyles();

  const handleSubmit = () => {
    sendBugReport();
    setDialogOpen({ ...dialogOpen, bugReport: false });
  };

  const handleClick = () => {
    setDialogOpen({ ...dialogOpen, bugReport: false });
  };

  return (
    <div>
      <Dialog open={dialogOpen}>
        <DialogTitle id='alert-dialog-title'>
          {'Thank you for helping us improve!'}
        </DialogTitle>
        <Formik
          initialValues={{
            title: '',
            location: '',
            description: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(formData) => handleSubmit(formData)}
        >
          {(props) => (
            <Form className={classes.root} onSubmit={props.handleSubmit}>
              <DialogContent classes={{ root: classes.dialogContentWrapper }}>
                <FormControl
                  variant={'outlined'}
                  className={'form-field-group'}
                >
                  <InputLabel htmlFor='title' color={'primary'}>
                    Title
                  </InputLabel>
                  <OutlinedInput
                    error={props.errors.title && props.touched.title}
                    id={'title'}
                    name={'title'}
                    label={'Title'}
                    type={'text'}
                    className={classes.formField}
                    onChange={props.handleChange}
                    value={props.values.title}
                    inputProps={{
                      className: 'form-field',
                      autoCapitalize: 'on'
                    }}
                    autoComplete={'new-title'}
                    autoFocus
                  />
                  {props.errors.title && props.touched.title ? (
                    <FormHelperText id='title-error'>
                      {props.errors.title}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl
                  variant={'outlined'}
                  className={'form-field-group'}
                >
                  <InputLabel htmlFor='location' color={'primary'}>
                    Where
                  </InputLabel>
                  <OutlinedInput
                    error={props.errors.location && props.touched.location}
                    id={'location'}
                    name={'location'}
                    label={'Section'}
                    type={'text'}
                    className={classes.formField}
                    onChange={props.handleChange}
                    value={props.values.location}
                    inputProps={{
                      className: 'form-field',
                      autoCapitalize: 'on'
                    }}
                    autoComplete={'new-location'}
                    autoFocus
                  />
                  {props.errors.location && props.touched.location ? (
                    <FormHelperText id='location-error'>
                      {props.errors.location}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl
                  variant={'outlined'}
                  className={'form-field-group'}
                >
                  <InputLabel htmlFor='description' color={'primary'}>
                    Message
                  </InputLabel>
                  <OutlinedInput
                    error={
                      props.errors.description && props.touched.description
                    }
                    id={'description'}
                    name={'description'}
                    label={'description'}
                    type={'text'}
                    className={classes.formField}
                    onChange={props.handleChange}
                    value={props.values.description}
                    inputProps={{
                      className: 'form-field',
                      autoCapitalize: 'on'
                    }}
                    autoComplete={'new-description'}
                    autoFocus
                    multiline
                  />
                  {props.errors.description && props.touched.description ? (
                    <FormHelperText id='description-error'>
                      {props.errors.description}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button
                  id={'cancel'}
                  onClick={handleClick}
                  variant={'outlined'}
                >
                  Cancel
                </Button>
                <Button
                  variant={'contained'}
                  size={'large'}
                  color={'primary'}
                  type={'submit'}
                >
                  Send
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .max('45', 'Title is too long (max: 45)')
    .required('Please enter a title to provide some context.'),
  location: Yup.string()
    .max('45', 'Location is too long (max: 45)')
    .required('In what section of the app did the error occur?'),
  description: Yup.string().required(
    'A detailed summary of where and how the error occurred.'
  )
});

BugReportDialog.propTypes = {
  sendBugReport: PropTypes.func.isRequired,
  dialogOpen: PropTypes.bool.isRequired
};

export default connect(null, { sendBugReport })(BugReportDialog);
