import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { filterPromotions } from '../../../actions/promotions';

const SearchInput = ({ filters, filterPromotions }) => {
  const [keyword, setKeyword] = useState(filters.keyword);

  const keyPressHandler = (event) => {
    // 13 = Enter key; 8 = backspace
    if (event.keyCode === 13) {
      filterPromotions({ ...filters, keyword: keyword });
    } else if (event.keyCode === 8 && keyword.length === 0) {
      filterPromotions({ ...filters, keyword: keyword });
    }
  };

  const buttonPressHandler = () => {
    filterPromotions({ ...filters, keyword: keyword });
  };

  return (
    <Fragment>
      <FormControl
        variant={'outlined'}
        size={'small'}
        className={'form-field-group'}
      >
        <InputLabel htmlFor='search' color={'secondary'}>
          Products search
        </InputLabel>
        <OutlinedInput
          id={'search'}
          label={'Products search'}
          name={'search'}
          type={'text'}
          onChange={(event) => setKeyword(event.target.value)}
          onKeyUp={keyPressHandler}
          value={keyword}
          inputProps={{
            className: 'form-field'
          }}
          autoComplete={'new-keyword'}
          startAdornment={
            <InputAdornment position={'start'}>
              <Typography
                variant={'h5'}
                className={'mdi mdi-magnify'}
                color={'secondary'}
              />
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        variant={'contained'}
        color={'secondary'}
        onClick={buttonPressHandler}
      >
        <Typography color={'textSecondary'}>Find</Typography>
      </Button>
    </Fragment>
  );
};

SearchInput.propTypes = {
  filters: PropTypes.object.isRequired,
  filterPromotions: PropTypes.func.isRequired
};

const mapStateToProps = ({ promotions }) => ({
  filters: promotions.filters
});

export default connect(mapStateToProps, { filterPromotions })(SearchInput);
