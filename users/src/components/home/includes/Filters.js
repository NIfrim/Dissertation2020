import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
// Redux
import { connect } from 'react-redux';
import { filterPromotions } from '../../../actions/promotions';

const useStyles = makeStyles((theme) => ({
  filterGroup: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  selectInput: {
    width: 120
  }
}));

const Filters = ({ stores, filters, filterPromotions }) => {
  const classes = useStyles();

  const changeHandler = (event) => {
    const element = event.target;

    switch (element.name) {
      case 'storeFilter':
        filterPromotions({ ...filters, store: element.value });
        break;

      case 'groupFilter':
        filterPromotions({ ...filters, group: element.value });
        break;
      case 'keywordFilter':
        filterPromotions({ ...filters, keyword: element.value });
        break;
      case 'promoTypeFilter':
        filterPromotions({ ...filters, promoType: element.value });
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <FormControl
        variant={'outlined'}
        className={clsx(classes.filterGroup, 'form-field-group')}
        size={'small'}
      >
        <InputLabel htmlFor={'storeFilter'}>Store</InputLabel>
        <Select
          id='storeFilter'
          name={'storeFilter'}
          value={filters.store}
          variant={'outlined'}
          onChange={changeHandler}
          label={'Store'}
          className={classes.selectInput}
        >
          <MenuItem value={'all'}>All Stores</MenuItem>
          {stores &&
            stores.map((store) => (
              <MenuItem key={store._id} value={store._id}>
                {store.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl
        variant={'outlined'}
        className={clsx(classes.filterGroup, 'form-field-group')}
        size={'small'}
      >
        <InputLabel htmlFor={'groupFilter'}>Group</InputLabel>
        <Select
          id='groupFilter'
          name={'groupFilter'}
          value={filters.group}
          variant={'outlined'}
          onChange={changeHandler}
          label={'Group'}
          className={classes.selectInput}
        >
          <MenuItem value={'all'}>All Groups</MenuItem>
          <MenuItem value={'general'}>General Promotions</MenuItem>
          <MenuItem value={'green'}>Green Promotions</MenuItem>
          <MenuItem value={'tailored'}>Tailored Promotions</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        variant={'outlined'}
        className={clsx(classes.filterGroup, 'form-field-group')}
        size={'small'}
      >
        <InputLabel htmlFor={'promoTypeFilter'}>Type</InputLabel>
        <Select
          id='promoTypeFilter'
          name={'promoTypeFilter'}
          value={filters.promoType}
          variant={'outlined'}
          onChange={changeHandler}
          label={'Type'}
          className={classes.selectInput}
        >
          <MenuItem value={'all'}>All Types</MenuItem>
          <MenuItem value={'BUNDLE'}>Bundle</MenuItem>
          <MenuItem value={'DISCOUNT'}>Discount</MenuItem>
          <MenuItem value={'BOGOFF'}>Bogoff</MenuItem>
        </Select>
      </FormControl>
    </Fragment>
  );
};

Filters.propTypes = {
  stores: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  filterPromotions: PropTypes.func.isRequired
};

const mapStateToProps = ({ promotions }) => ({
  stores: promotions.stores,
  filters: promotions.filters
});

export default connect(mapStateToProps, { filterPromotions })(Filters);
