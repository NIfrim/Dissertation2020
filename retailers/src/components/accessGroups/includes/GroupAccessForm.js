import React from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
  Box,
  Checkbox,
  FormControl,
  MenuItem,
  FormHelperText,
  Grid,
  FormGroup,
  FormControlLabel,
  FormLabel
} from '@material-ui/core'
import { Label, Selector } from '../../includes'

const GroupAccessForm = ({ data, formInputHandler }) => {
  const { role, scopes } = data

  const roles = ['STORE_SUPER', 'CUSTOM', 'COMPANY_SUPER', 'SECRETARY']

  return (
    <Grid className={'column'} container item>
      <Box className={'column formHeader'}>
        <Typography variant={'h5'}>Permissions</Typography>
        <Typography variant={'body2'}>
          Set permission level for access group:
        </Typography>
      </Box>

      {/* ACCOUNT TYPE/ROLE */}
      <FormControl
        className={'row'}
        variant='outlined'
        fullWidth
        margin={'dense'}
      >
        <Label htmlFor={'role'}>Role</Label>
        <Selector
          labelId='role'
          id='role'
          value={role}
          name={'role'}
          label={'Role'}
          onChange={formInputHandler}
        >
          <MenuItem value=''>
            <em>Select Role</em>
          </MenuItem>
          {roles.map(role => (
            <MenuItem key={role} value={role}>
              {role.replace('_', ' ')}
            </MenuItem>
          ))}
        </Selector>
        {!role.length > 0 ? (
          <FormHelperText error>*required</FormHelperText>
        ) : (
          ''
        )}
      </FormControl>

      <Grid container item direction={'row'} justify={'flex-start'}>
        {/* Access groups permissions */}
        <FormControl component={'fieldset'} margin={'dense'}>
          <FormLabel className={'formGroupLegend'} component={'legend'}>
            Access Groups Section
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    !!scopes.find(elem => elem === 'MANAGE_ACCESS_GROUPS')
                  }
                  onChange={formInputHandler}
                  name={'scopes'}
                  value={'MANAGE_ACCESS_GROUPS'}
                  size={'small'}
                  disabled={role !== 'CUSTOM'}
                />
              }
              label={
                <Typography variant={'body2'}>
                  Manage company access groups
                </Typography>
              }
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    !!scopes.find(elem => elem === 'MANAGE_STORE_ACCESS_GROUPS')
                  }
                  onChange={formInputHandler}
                  name={'scopes'}
                  value={'MANAGE_STORE_ACCESS_GROUPS'}
                  size={'small'}
                  disabled={role !== 'CUSTOM'}
                />
              }
              label={
                <Typography variant={'body2'}>
                  Manage store access groups
                </Typography>
              }
            />
          </FormGroup>
        </FormControl>

        {/* Stores section permissions */}
        <FormControl component={'fieldset'} margin={'dense'}>
          <FormLabel className={'formGroupLegend'} component={'legend'}>
            Stores Section
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!scopes.find(elem => elem === 'MANAGE_STORES')}
                  onChange={formInputHandler}
                  name={'scopes'}
                  value={'MANAGE_STORES'}
                  size={'small'}
                  disabled={role !== 'CUSTOM'}
                />
              }
              label={<Typography variant={'body2'}>Manage stores</Typography>}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!scopes.find(elem => elem === 'VIEW_STORES')}
                  onChange={formInputHandler}
                  name={'scopes'}
                  value={'VIEW_STORES'}
                  size={'small'}
                  disabled={role !== 'CUSTOM'}
                />
              }
              label={<Typography variant={'body2'}>View Stores</Typography>}
            />
          </FormGroup>
        </FormControl>

        {/* Products section permissions */}
        <FormControl component={'fieldset'} margin={'dense'}>
          <FormLabel className={'formGroupLegend'} component={'legend'}>
            Products Section
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!scopes.find(elem => elem === 'MANAGE_PRODUCTS')}
                  onChange={formInputHandler}
                  name={'scopes'}
                  value={'MANAGE_PRODUCTS'}
                  size={'small'}
                  disabled={role !== 'CUSTOM'}
                />
              }
              label={<Typography variant={'body2'}>Manage Products</Typography>}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!scopes.find(elem => elem === 'VIEW_PRODUCTS')}
                  onChange={formInputHandler}
                  name={'scopes'}
                  value={'VIEW_PRODUCTS'}
                  size={'small'}
                  disabled={role !== 'CUSTOM'}
                />
              }
              label={<Typography variant={'body2'}>View Products</Typography>}
            />
          </FormGroup>
        </FormControl>

        {/* Promotions section permissions */}
        <FormControl component={'fieldset'} margin={'dense'}>
          <FormLabel className={'formGroupLegend'} component={'legend'}>
            Promotions Section
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!scopes.find(elem => elem === 'MANAGE_PROMOTIONS')}
                  onChange={formInputHandler}
                  name={'scopes'}
                  value={'MANAGE_PROMOTIONS'}
                  size={'small'}
                  disabled={role !== 'CUSTOM'}
                />
              }
              label={
                <Typography variant={'body2'}>Manage Promotions</Typography>
              }
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!scopes.find(elem => elem === 'VIEW_PROMOTIONS')}
                  onChange={formInputHandler}
                  name={'scopes'}
                  value={'VIEW_PROMOTIONS'}
                  size={'small'}
                  disabled={role !== 'CUSTOM'}
                />
              }
              label={<Typography variant={'body2'}>View Promotions</Typography>}
            />
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  )
}

GroupAccessForm.propTypes = {
  data: PropTypes.object.isRequired,
  formInputHandler: PropTypes.func.isRequired
}

export default GroupAccessForm
