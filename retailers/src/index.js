import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import client from './apollo';
import './index.css';
import App from './App';
import dotenv from 'dotenv';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Material UI
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ApolloProvider } from '@apollo/react-hooks';
import { loadAccount } from './actions/auth';

dotenv.config();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#41517A'
    },
    secondary: {
      main: '#5675C5'
    },
    common: {
      darkBlue: '#41517A',
      blue: '#5675C5',
      lightBlue: '#A6CEE3',
      yellowish: '#F0F0E1',
      green: '#40C34D',
      lightGreen: '#69DE75',
      orange: '#FF6600',
      lightOrange: '#FF934B',
      grey: '#e6e6e6'
    }
  },
  shape: {
    borderRadius: 10,
    borderRadiusSmall: 5
  },
  typography: {
    fontSize: 13
  },
  overrides: {
    MuiDrawer: {
      paper: {
        borderRight: 'none !important'
      }
    },
    MuiButton: {
      root: {
        margin: 8
      },
      containedPrimary: {
        backgroundColor: '#5675C5', // blue from palette
        '&:hover': {
          backgroundColor: '#41517A' // dark blue from palette
        }
      },
      containedSecondary: {
        backgroundColor: '#A6CEE3', // light blue from palette
        '&:hover': {
          backgroundColor: '#5675C5' // blue from palette
        },
        '&:focus': {
          backgroundColor: '#41517A'
        }
      }
    },
    drawerWidth: 240,
    analyticsUserCard: '#3f51b5',
    analyticsMonthCard: '#fb8c00',
    analyticsPromoCard: '#4caf50',
    lightText: '#fafafa'
  }
});

const Main = props => {
  useEffect(() => {
    store.dispatch(loadAccount());
  }, []);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Main />
  </ThemeProvider>,
  document.getElementById('root')
);
