import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable, { MTableToolbar } from 'material-table';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { lighten, Select, MenuItem, Box, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';

// Redux Actions
import { removePromotions } from '../../../actions/promotions';

function GeneratedPromotionsTable({ products, promotions, removePromotions }) {
  const [tableData, setTableData] = useState([]);
  const [promoType, setPromoType] = useState('-1');
  const [promoGroup, setPromoGroup] = useState('general');
  const theme = useTheme();

  // Set the data of the table based on the selected group
  useEffect(() => {
    const promotionsWithProducts = [].concat.apply(
      [],
      promotions.promoGroups[promoGroup].map(promoGroup =>
        promoGroup.promotions.map(promo => {
          const products = promo.products.map(prod => prod.name);
          const productsTotal = Math.ceil(promo.products.map(prod => prod.price).reduce((prev, curr) => prev + curr));
          const productsDiscounted = Math.ceil((productsTotal / 100) * (100 - promo.discount));
          return {
            ...promo,
            products: products.join(', '),
            productsTotal,
            productsDiscounted
          };
        })
      )
    );

    setTableData(promotionsWithProducts);
  }, [promotions, promoGroup]);

  // Set the data of the table based on the selected promo type
  useEffect(() => {
    if (promoType === '-1') {
      // Show all the promotions based on the group selected
      const promotionsWithProducts = [].concat.apply(
        [],
        promotions.promoGroups[promoGroup].map(promoGroup =>
          promoGroup.promotions.map(promo => {
            const products = promo.products.map(prod => prod.name);
            const productsTotal =
              promo.type === 'BOGOFF'
                ? Math.ceil(promo.products.map(prod => prod.price).reduce((prev, curr) => prev + curr)) * 2
                : Math.ceil(promo.products.map(prod => prod.price).reduce((prev, curr) => prev + curr));
            const productsDiscounted =
              promo.type === 'BOGOFF'
                ? Math.ceil(promo.products.map(prod => prod.price).reduce((prev, curr) => prev + curr)) *
                  promo.priceInflation
                : Math.ceil((productsTotal / 100) * (100 - promo.discount));
            return {
              ...promo,
              products: products.join(', '),
              productsTotal,
              productsDiscounted
            };
          })
        )
      );

      setTableData(promotionsWithProducts);
    } else {
      // Show the promotions based on the promotion type selected
      const promotionsWithProducts = [].concat.apply(
        [],
        promotions.promoGroups[promoGroup].map(promoGroup =>
          promoGroup._id === promoType
            ? promoGroup.promotions.map(promo => {
                const products = promo.products.map(prod => prod.name);
                const productsTotal =
                  promo.type === 'BOGOFF'
                    ? Math.ceil(promo.products.map(prod => prod.price).reduce((prev, curr) => prev + curr)) * 2
                    : Math.ceil(promo.products.map(prod => prod.price).reduce((prev, curr) => prev + curr));
                const productsDiscounted =
                  promo.type === 'BOGOFF'
                    ? Math.ceil(promo.products.map(prod => prod.price).reduce((prev, curr) => prev + curr)) *
                      promo.priceInflation
                    : Math.ceil((productsTotal / 100) * (100 - promo.discount));
                return {
                  ...promo,
                  products: products.join(', '),
                  productsTotal,
                  productsDiscounted
                };
              })
            : []
        )
      );

      setTableData(promotionsWithProducts);
    }
  }, [promotions, promoType, promoGroup]);

  const handleRemoveSelected = (e, data) => {
    const promoIds = data.map(row => parseInt(row._id));

    removePromotions(promoGroup, promoIds);
  };

  const handleFilterType = e => {
    // Set the value of the promotion type
    setPromoType(e.target.value);
  };

  const handleFilterGroup = e => {
    // Set the value of the promotion group selected
    setPromoGroup(e.currentTarget.value);

    // Reset the promo type filter
    setPromoType('-1');
  };

  return (
    <MaterialTable
      title={'Generated Promotions'}
      style={{
        width: '100%'
      }}
      isLoading={products.loading}
      columns={[
        { title: 'Id', type: 'numeric', field: '_id', width: 40 },
        { title: 'Type', field: 'type' },
        { title: 'Products in promotion', field: 'products' },
        { title: 'Discount (%)', field: 'discount', type: 'numeric' },
        { title: 'Price Inflation', field: 'priceInflation', type: 'numeric' },
        {
          title: 'Total price',
          field: 'productsTotal',
          type: 'currency',
          currencySetting: { currencyCode: 'GBP' }
        },
        {
          title: 'Total discounted',
          field: 'productsDiscounted',
          type: 'currency',
          currencySetting: { currencyCode: 'GBP' }
        },
        { title: 'Expiry Date', field: 'expires' }
      ]}
      data={tableData ? tableData : []}
      options={{
        selection: true,
        rowStyle: {
          overflow: 'auto'
        },
        actionsColumnIndex: -1,
        searchFieldAlignment: 'right',
        toolbarButtonAlignment: 'left',
        headerStyle: {
          backgroundColor: lighten(theme.palette.secondary.main, 0.9)
        }
      }}
      actions={[
        {
          icon: 'delete',
          position: 'toolbarOnSelect',
          tooltip: 'Remove selected',
          onClick: (e, data) => handleRemoveSelected(e, data)
        }
      ]}
      components={{
        Toolbar: props => (
          <Box padding={2}>
            <MTableToolbar {...props} />
            <Grid container direction={'row'}>
              <ToggleButtonGroup
                value={promoGroup}
                title={'Filter by promotion type'}
                exclusive
                onChange={handleFilterGroup}
                aria-label='text alignment'
                size='small'
              >
                <ToggleButton value='general' aria-label='general'>
                  General
                </ToggleButton>
                <ToggleButton value='green' aria-label='green'>
                  Green
                </ToggleButton>
                <ToggleButton value='tailored' aria-label='tailored'>
                  Tailored
                </ToggleButton>
              </ToggleButtonGroup>

              <Box marginLeft={2}>
                <Select
                  id={'filterByType'}
                  value={promoType}
                  title={'Filter by promotional group'}
                  onChange={handleFilterType}
                >
                  <MenuItem value={'-1'}>All Groups</MenuItem>
                  {promotions.promoGroups[promoGroup].map(promoGroup => (
                    <MenuItem key={promoGroup._id} value={promoGroup._id}>
                      {promoGroup.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Grid>
          </Box>
        )
      }}
    />
  );
}

GeneratedPromotionsTable.propTypes = {
  promotions: PropTypes.object.isRequired,
  removePromotions: PropTypes.func.isRequired
};

function mapStateToProps({ products, promotions }) {
  return {
    products,
    promotions
  };
}

export default connect(mapStateToProps, { removePromotions })(GeneratedPromotionsTable);
