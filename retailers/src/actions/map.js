import axios from 'axios';
import { normalizeForGet, getFormattedAddress } from '../utils';

// Actions
// import { loadingErrors } from './app'

import { GET_ADDRESS, GET_COORDINATES, MAP_LOADING, MAP_ERROR } from './types';

export const getAddress = (latitude, longitude, locationId = '') => async (
  dispatch
) => {
  try {
    dispatch({
      type: MAP_LOADING
    });

    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=en-GB&result_type=street_address&key=AIzaSyC9Xcr5cJQJD4S7xjZGwFTAQyV08v0uoig`
    );

    const address = getFormattedAddress(res.data);

    address.locationId = locationId;
    address.latitude = latitude;
    address.longitude = longitude;

    dispatch({
      type: GET_ADDRESS,
      payload: address
    });
  } catch (e) {
    console.error(`Error while getting address from coordinates: ${e}`);
    dispatch({
      type: MAP_ERROR
    });
  }
};

export const getCoordinates = (query, locationId = '') => async (dispatch) => {
  // Normalize query for get request
  const normalizedQuery = normalizeForGet(query);

  try {
    dispatch({
      type: MAP_LOADING
    });

    const res = await axios.get(
      `https://nominatim.openstreetmap.org/?addressdetails=1&q=${normalizedQuery}&format=json&limit=1`
    );

    const coordinates = {
      latitude: parseFloat(res.data[0].lat),
      longitude: parseFloat(res.data[0].lon)
    };

    dispatch({
      type: GET_COORDINATES,
      payload: { ...coordinates, locationId: locationId }
    });
  } catch (e) {
    console.error(`Error while getting coordinates: ${e}`);
    // dispatch(loadingErrors(`Error while getting coordinates: ${e}`))
    dispatch({
      type: MAP_ERROR
    });
  }
};
