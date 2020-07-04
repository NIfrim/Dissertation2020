import client from '../apollo';
import { TEST_CONNECTION_QUERY } from './queries';

export const testConnection = () => async (dispatch) => {
  try {
    const { res } = await client.query({ query: TEST_CONNECTION_QUERY });
    console.log(res);
  } catch (err) {
    console.error(
      `Encountered error while testing database connection: ${err.message}`
    );
  }
};
