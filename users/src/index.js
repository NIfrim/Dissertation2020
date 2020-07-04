import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import dotenv from 'dotenv';
import * as serviceWorker from './serviceWorker';
// Redux
import { Provider } from 'react-redux';
import store from './store';

dotenv.config();

const Main = (props) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));

// Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
