import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable, { MTableCell } from 'material-table';
import { Box, lighten } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';

// Redux Actions
import { removeProducts, updateProduct } from '../../../actions/products';
import ProductForm from './ProductForm';

function LinkedProductsTable({ groupId, products, updateProduct, removeProducts }) {
  const [tableData, setTableData] = useState([]);
  const theme = useTheme();

  // Initial effect of setting the table data
  useEffect(() => {
    const data = [].concat.apply(
      [],
      products.productGroups.map(prodGroup =>
        prodGroup._id === groupId
          ? prodGroup.products.map(prod => {
              const { keywords, ...rest } = prod;
              return { ...rest };
            })
          : []
      )
    );

    setTableData(data);
  }, [products, setTableData, groupId]);

  const handleRemoveSelected = data => {
    removeProducts(parseInt(groupId), [parseInt(data._id)]);
  };

  return (
    <MaterialTable
      title={'Manage Linked products'}
      style={{
        width: '100%',
        boxShadow: 'none'
      }}
      isLoading={products.loading}
      components={{
        Cell: props => <MTableCell {...props} style={{ maxHeight: 150, overflowY: 'auto' }} />
      }}
      columns={[
        { title: 'Id', field: '_id', width: 50, type: 'numeric', editable: 'never' },
        { title: 'Name', field: 'name' },
        { title: 'Brand', field: 'brand' },
        { title: 'Price', field: 'price', type: 'currency', currencySetting: { currencyCode: 'GBP' }, width: 100 },
        { title: 'Stock', field: 'stock', type: 'numeric', width: 100 }
      ]}
      detailPanel={[
        {
          tooltip: 'Edit Product',
          render: rowData => {
            return (
              <Box p={3}>
                <ProductForm groupId={parseInt(groupId)} productData={rowData} />
              </Box>
            );
          }
        }
      ]}
      editable={{
        onRowDelete: async oldData => handleRemoveSelected(oldData)
      }}
      data={tableData ? tableData : []}
      localization={{
        body: {
          editRow: {
            saveTooltip: 'Confirm',
            deleteText: 'Deleting this row will also delete related promotion, if product is in a promotion.'
          }
        }
      }}
      options={{
        rowStyle: {
          overflowY: 'auto',
          maxHeight: 100
        },
        searchFieldAlignment: 'right',
        toolbarButtonAlignment: 'left',
        headerStyle: {
          backgroundColor: lighten(theme.palette.secondary.main, 0.9)
        }
      }}
    />
  );
}

LinkedProductsTable.propTypes = {
  products: PropTypes.object.isRequired,
  groupId: PropTypes.string.isRequired,
  updateProduct: PropTypes.func.isRequired,
  removeProducts: PropTypes.func.isRequired
};

function mapStateToProps({ products }) {
  return {
    products
  };
}

export default connect(mapStateToProps, { removeProducts, updateProduct })(LinkedProductsTable);
