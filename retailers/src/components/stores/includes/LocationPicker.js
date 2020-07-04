import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'

// Redux
import { connect } from 'react-redux'
import { getAddress } from '../../../actions/map'

const LocationPicker = ({ location, getAddress }) => {
  const [marker] = useState(true)

  const clickHandler = e => {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()

    // Get address from set coordinates and dispatch to store
    getAddress(lat, lng, location._id)
  }

  return (
    <GoogleMap
      defaultZoom={18}
      defaultCenter={{
        lat: location.latitude,
        lng: location.longitude
      }}
      onClick={clickHandler}
      center={{
        lat: location.latitude,
        lng: location.longitude
      }}
    >
      {marker && (
        <Marker
          position={{ lat: location.latitude, lng: location.longitude }}
        />
      )}
    </GoogleMap>
  )
}

LocationPicker.propTypes = {
  location: PropTypes.object.isRequired,
  getAddress: PropTypes.func.isRequired
}

const mapStateToProps = ({ map }) => ({
  map
})

export default withScriptjs(
  withGoogleMap(connect(mapStateToProps, { getAddress })(LocationPicker))
)
