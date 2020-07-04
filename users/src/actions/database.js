import { DATABASE_UPDATING, DATABASE_UPDATED } from './types';

export const databaseUpdating = () => async (dispatch) => {
  try {
    dispatch({
      type: DATABASE_UPDATING
    });
  } catch (err) {
    console.error(
      `Error encountered while database was updating: ${err.message}`
    );
  }
};

export const databaseUpdated = () => async (dispatch) => {
  try {
    dispatch({
      type: DATABASE_UPDATED
    });
  } catch (err) {
    console.error(`Error encountered after database updated: ${err.message}`);
  }
};
