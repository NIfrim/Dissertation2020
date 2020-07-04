import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'

// Redux
import { connect } from 'react-redux'
import { getCoordinates } from '../../../actions/map'

// Components
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  Button,
  IconButton,
  Typography,
  makeStyles
} from '@material-ui/core'
import { Label, TextInput } from '../../includes'
import LocationPicker from './LocationPicker'
import clsx from 'clsx'
import { Spinner } from '../../layout'

const useStyles = makeStyles(theme => ({}))

const MapDialog = ({ map, location, getCoordinates }) => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)

  const mapModalHandler = e => {
    setOpen(!open)
  }

  const handleSearchMap = ({ target, type, key }) => {
    if (type === 'keypress') {
      if (key === 'Enter') {
        getCoordinates(target.value, location._id)
      }
    }
  }

  return (
    <Fragment>
      <FormControl>
        <Button
          variant={'contained'}
          color={'secondary'}
          className={classes.locationPicker}
          size={'large'}
          onClick={mapModalHandler}
          endIcon={<i className={'material-icons'}>add_location</i>}
        >
          Pick Location On Map
        </Button>
      </FormControl>
      <Dialog open={open} onClose={mapModalHandler}>
        <DialogTitle className={clsx(classes.modalHeader)}>
          <Grid
            container
            direction={'row'}
            alignItems={'center'}
            justify={'space-between'}
          >
            <Typography>
              {location && location.city && location.street
                ? location.city + ' ' + location.street
                : 'Pick a location using the map'}
            </Typography>
            <IconButton onClick={mapModalHandler}>
              <i className={'material-icons'}>close</i>
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <FormControl
            className={'row formRow'}
            fullWidth
            variant={'outlined'}
            margin={'dense'}
          >
            <Label htmlFor={'searchMap'}>Search</Label>
            <TextInput
              id={'searchMap'}
              name={'searchMap'}
              type={'text'}
              labelWidth={50}
              onChange={handleSearchMap}
              onKeyPress={handleSearchMap}
            />
          </FormControl>

          {map.loading ? (
            <Spinner />
          ) : (
            <LocationPicker
              location={location}
              googleMapURL={
                'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyC9Xcr5cJQJD4S7xjZGwFTAQyV08v0uoig&libraries=geometry,drawing,places'
              }
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={
                <div style={{ height: `500px`, width: `500px` }} />
              }
              mapElement={<div style={{ height: `100%` }} />}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant={'contained'}
            onClick={mapModalHandler}
            color={'primary'}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

MapDialog.propTypes = {
  map: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  getCoordinates: PropTypes.func.isRequired
}

const mapStateToProps = ({ map }) => ({
  map
})

export default connect(mapStateToProps, { getCoordinates })(MapDialog)
