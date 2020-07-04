import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Typography, Grid } from '@material-ui/core';
import { InteractiveTooltip } from '../includes';
import { PromotionTypeCard } from './includes';

// Redux actions
import { getPromoGroups } from '../../actions/promotions';

import { Spinner } from '../layout';
import GeneratedPromotionsTable from './includes/GeneratedPromotionsTable';

function Promotions({ products, promotions, getPromoGroups }) {
  // Get the promotion groups
  useEffect(() => {
    // Get all the promo types groups
    getPromoGroups('general');
    getPromoGroups('green');
    getPromoGroups('tailored');
  }, [getPromoGroups]);

  return (
    // Root container for all rows
    <Grid className={'column rowsContainer'} container direction={'column'}>
      {/* Promotion Cards Row Container */}
      <Grid className={'row'} item container direction={'column'}>
        {/* Row Header with title */}
        <Grid className={'row rowTitle'} container item direction={'row'}>
          <Typography variant={'h4'}>Promotion Types</Typography>
          <InteractiveTooltip
            text={
              'From this section promotions can be enabled/disabled, or products can be linked/unlinked to promotion types'
            }
          />
        </Grid>

        {/* Promotion Cards row */}
        <Grid className={'row'} container direction={'row'} alignItems={'flex-start'}>
          {promotions.loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <PromotionTypeCard title={'General Promotions'} category={'general'} />

              <PromotionTypeCard title={'Green Promotions'} category={'green'} />

              <PromotionTypeCard title={'Tailored Promotions'} category={'tailored'} />
            </Fragment>
          )}
        </Grid>
      </Grid>

      {/* Generated promotions Row */}
      <Grid className={'row'} item container direction={'column'}>
        {/* Row Header with title */}
        <Grid className={'row rowTitle'} container item direction={'row'}>
          <Typography variant={'h4'}>Generated Promotions</Typography>
          <InteractiveTooltip text={'Manage generated promotions using the table below.'} />
        </Grid>

        {/* Generated promotions table */}
        <Grid className={'row'} container direction={'row'} alignItems={'flex-start'}>
          {/* Table with the generated promotions */}
          {!!products.productGroups ? <GeneratedPromotionsTable /> : ''}
        </Grid>
      </Grid>
    </Grid>
  );
}

Promotions.propTypes = {
  products: PropTypes.object.isRequired,
  promotions: PropTypes.object.isRequired,
  getPromoGroups: PropTypes.func.isRequired
};

const mapStateToProps = ({ products, promotions }) => ({
  products,
  promotions
});

export default connect(mapStateToProps, { getPromoGroups })(Promotions);
