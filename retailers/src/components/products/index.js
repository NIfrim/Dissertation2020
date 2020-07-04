import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { removeProductGroups } from '../../actions/products';

// Components
import { InteractiveTooltip } from '../includes';
import { Spinner } from '../layout';
import { ProductGroupForm } from './includes';
import { Typography, Grid, Button, Input, InputAdornment, Paper, Divider, Box, Collapse } from '@material-ui/core';
import ProductGroupCard from './includes';

const Products = ({ auth: { account }, products: { loading, error, productGroups }, removeProductGroups }) => {
  const [newProductGroup, setNewProductGroup] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);

  const handleClick = e => {
    const { title } = e.currentTarget;

    switch (title) {
      case 'newProductGroup':
        setNewProductGroup(!newProductGroup);
        break;

      case 'removeSelected':
        removeProductGroups(parseInt(account.store._id), selectedGroups);
        break;

      default:
        break;
    }
  };

  const handleGroupSelected = ({ target: { value } }) => {
    !selectedGroups.find(elem => elem === parseInt(value)) && setSelectedGroups([...selectedGroups, parseInt(value)]);

    selectedGroups.find(elem => elem === parseInt(value)) &&
      setSelectedGroups(selectedGroups.filter(elem => elem !== parseInt(value)));
  };

  return (
    // Root container for all rows
    <Grid className={'column rowsContainer'} container direction={'column'}>
      {/* Row container */}
      <Grid className={'row'} item container direction={'column'}>
        <Grid className={'row rowTitle'} container item direction={'row'}>
          <Typography variant={'h4'}>Products</Typography>
          <InteractiveTooltip text={'From this section you can create product groups which can contain products'} />
        </Grid>
        {/* Row content with container */}
        <Paper className={'row rowContentWrapper'}>
          <Grid className={'rowContent'} container item direction={'column'}>
            {/* Row Action area with buttons and search */}
            <Grid container item direction={'row'} className={'row'} justify={'space-between'}>
              <Box>
                <Button
                  variant={'contained'}
                  color={'primary'}
                  onClick={e => handleClick(e)}
                  type={'button'}
                  title={'newProductGroup'}
                >
                  New Product Group
                </Button>
                <Button
                  variant={'contained'}
                  color={'primary'}
                  onClick={e => handleClick(e)}
                  type={'button'}
                  title={'removeSelected'}
                >
                  Remove Selected
                </Button>
              </Box>

              <Input
                startAdornment={
                  <InputAdornment position={'start'}>
                    <i className={'material-icons'}>search</i>
                  </InputAdornment>
                }
              />
            </Grid>

            <Divider />

            <Collapse className={'newGroupCollapseSection'} in={newProductGroup} timeout='auto' unmountOnExit>
              <Grid className={'row'} container direction={'row'} justify={'space-evenly'} wrap={'nowrap'}>
                <ProductGroupForm key={'newStoreForm'} setVisible={setNewProductGroup} editing={false} />
              </Grid>

              <Divider variant={'fullWidth'} />
            </Collapse>

            <Grid className={'column contentDataWrapper'} container direction={'column'}>
              {loading ? (
                <Spinner />
              ) : (
                productGroups.map(group => {
                  return <ProductGroupCard key={group._id} checkboxHandler={handleGroupSelected} groupData={group} />;
                })
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

Products.propTypes = {
  auth: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  removeProductGroups: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, products }) => ({
  auth,
  products
});

export default connect(mapStateToProps, {
  removeProductGroups
})(Products);
