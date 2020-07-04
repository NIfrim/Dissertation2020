import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Components
import { Spinner } from '../layout';
import { StorePromosRow } from './includes';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.common.mainBackground,
    height: '100%'
  }
}));

const Home = ({ app, stores, filters }) => {
  const classes = useStyles();
  const { loading } = app;
  const [filteredStores, setFilteredStores] = useState(stores);

  useEffect(() => {
    setFilteredStores(getFilteredData(stores, filters));
  }, [stores, filters]);

  return loading ? (
    <Spinner />
  ) : (
    <Box className={classes.main}>
      {filteredStores &&
        filteredStores.map((store) => (
          <StorePromosRow key={store._id} store={store} />
        ))}
    </Box>
  );
};

function getFilteredData(stores, filters) {
  return stores
    .filter((store) => filters.store === 'all' || store._id === filters.store)
    .map((store) => ({
      ...store,
      promotionGroups: store.promotionGroups
        .filter(
          (promoGroup) =>
            filters.group === 'all' || promoGroup.category === filters.group
        )
        .map((promoGroup) => ({
          ...promoGroup,
          promotions: promoGroup.promotions.filter((promo) => {
            const keywords = promo.products
              .map((prod) =>
                prod.keywords.map((keyword) => keyword.name.toLowerCase())
              )
              .reduce((prev, curr) => prev.concat(curr));

            return (
              (filters.promoType === 'all' ||
                promo.type === filters.promoType) &&
              (filters.keyword === '' ||
                keywords.join(' ').includes(filters.keyword.toLowerCase()))
            );
          })
        }))
    }));
}

Home.propTypes = {
  app: PropTypes.object.isRequired,
  stores: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired
};

const mapStateToProps = ({ app, promotions }) => ({
  app,
  stores: promotions.stores,
  filters: promotions.filters
});

export default connect(mapStateToProps)(Home);
