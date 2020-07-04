import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { sendSupportMessage } from '../../../actions/user';
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

const SupportMessageDialog = ({
  dialogOpen,
  setDialogOpen,
  sendSupportMessage
}) => {
  const classes = useStyles();

  const handleSubmit = () => {
    sendSupportMessage();
    setDialogOpen({ ...dialogOpen, support: false });
  };

  const handleClick = () => {
    setDialogOpen({ ...dialogOpen, support: false });
  };

  return (
    <div>
      <Dialog open={dialogOpen}>
        <DialogTitle id='alert-dialog-title'>
          {'Send us a message if you have any questions.'}
        </DialogTitle>
        <Formik
          initialValues={{
            title: '',
            message: ''
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
                  <InputLabel htmlFor='message' color={'primary'}>
                    Message
                  </InputLabel>
                  <OutlinedInput
                    error={props.errors.message && props.touched.message}
                    id={'message'}
                    name={'message'}
                    label={'Message'}
                    type={'text'}
                    className={classes.formField}
                    onChange={props.handleChange}
                    value={props.values.message}
                    inputProps={{
                      className: 'form-field',
                      autoCapitalize: 'on'
                    }}
                    autoComplete={'new-message'}
                    autoFocus
                    multiline
                  />
                  {props.errors.message && props.touched.message ? (
                    <FormHelperText id='message-error'>
                      {props.errors.message}
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
  message: Yup.string().required(
    'Let us know what you need help with, and we will get in touch with you.'
  )
});

SupportMessageDialog.propTypes = {
  sendSupportMessage: PropTypes.func.isRequired,
  dialogOpen: PropTypes.bool.isRequired
};

export default connect(null, { sendSupportMessage })(SupportMessageDialog);
