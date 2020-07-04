import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

// Components
import {
  Typography,
  Grid,
  makeStyles,
  FormControl,
  FormHelperText,
  MenuItem,
  Box,
  IconButton
} from '@material-ui/core'
import { TextInput, Label, Selector } from '../../includes'

const useStyles = makeStyles(theme => {})

const GroupInfoForm = ({ data, formInputHandler, editing }) => {
  const classes = useStyles()

  const [passwordVisible, setPasswordVisible] = useState(false);

  const { groupName, username, type, password } = data
  const types = ['STORE_ACCOUNT', 'COMPANY_ACCOUNT']

  return (
    <Grid className={'column'} container item>
      <Box className={'column formHeader'}>
        <Typography className={classes.formTitle} variant={'h5'}>
          Group Information
        </Typography>
        <Typography variant={'body2'}>
          Add the main access details from here. Location can also be picked
          through the provided picker.
        </Typography>
      </Box>

      {/* GROUP NAME FIELD */}
      <FormControl
        className={'row formRow'}
        fullWidth
        variant={'outlined'}
        margin={'dense'}
      >
        <Label htmlFor={'groupName'}>Group Name</Label>
        <TextInput
          id={'groupName'}
          type={'text'}
          name={'groupName'}
          onChange={formInputHandler}
          labelWidth={90}
          value={groupName}
          autoComplete={'new-name'}
          required
        />
        {!groupName.length > 0 ? (
          <FormHelperText error>*required</FormHelperText>
        ) : (
          ''
        )}
      </FormControl>

      {/* ACCOUNT TYPE/ROLE */}
      <FormControl
        className={'row formRow'}
        variant='outlined'
        fullWidth
        margin={'dense'}
        disabled={editing}
      >
        <Label htmlFor={'type'}>Type</Label>
        <Selector
          labelId='type'
          id='type'
          value={type}
          name={'type'}
          labelWidth={40}
          onChange={formInputHandler}
        >
          <MenuItem value=''>
            <em>Select Type</em>
          </MenuItem>
          {types.map(type => (
            <MenuItem key={type} value={type}>
              {type.replace('_', ' ')}
            </MenuItem>
          ))}
        </Selector>
        {!type.length > 0 ? (
          <FormHelperText error>*required</FormHelperText>
        ) : (
          ''
        )}
      </FormControl>

      {/* USERNAME FIELD */}
      <FormControl
        className={'row formRow'}
        fullWidth
        variant={'outlined'}
        margin={'dense'}
      >
        <Label htmlFor={'username'}>Username</Label>
        <TextInput
          id={'username'}
          type={'text'}
          name={'username'}
          onChange={formInputHandler}
          labelWidth={80}
          value={username}
          autoComplete={'new-username'}
          required
        />
        {!username.length > 0 ? (
          <FormHelperText error>*required</FormHelperText>
        ) : (
          ''
        )}
      </FormControl>

      {/* PASSWORD FIELD */}
      <FormControl
        className={'row formRow'}
        fullWidth
        variant={'outlined'}
        margin={'dense'}
      >
        <Label htmlFor={'password'}>{editing ? 'New Password' : 'Password'}</Label>
        <TextInput
          id={'password'}
          type={passwordVisible ? 'text' : 'password'}
          name={'password'}
          onChange={formInputHandler}
          label={editing ? 'New Password' : 'Password'}
          value={password}
          autoComplete={'new-password'}
          required={!editing}
          endAdornment={
            <IconButton
              onClick={() => setPasswordVisible(!passwordVisible)}
              size={'small'}
            >
              <i className={'material-icons'}>
                {passwordVisible ? 'visibility_off' : 'visibility'}
              </i>
            </IconButton>
          }
        />
        {!editing && !password.length > 0 ? (
          <FormHelperText error>*required</FormHelperText>
        ) : (
          ''
        )}
      </FormControl>
    </Grid>
  )
}

GroupInfoForm.propTypes = {
  data: PropTypes.object.isRequired,
  formInputHandler: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired
}

export default GroupInfoForm
