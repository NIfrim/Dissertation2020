import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// Components
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { PromoModal } from './index';

const useStyles = makeStyles((theme) => ({
  root: {
    flexBasis: 220,
    flexShrink: 0,
    height: 280,
    margin: theme.spacing(1.5),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: 3,
    backgroundColor: theme.palette.primary.dark
  },
  cardContent: {
    padding: 0
  },
  productsWrapper: {
    backgroundColor: theme.palette.secondary.dark,
    overflowY: 'auto',
    height: 200,
    '&::-webkit-scrollbar': {
      width: 6
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.primary.light
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  },
  discountedPriceWrapper: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    right: -50,
    height: 70,
    bottom: 0,
    width: 150,
    transform: 'rotate(-45deg)',
    backgroundColor: theme.palette.primary.dark
  }
}));

const PromoCard = ({ promotion }) => {
  const classes = useStyles();
  const { discount, priceInflation, type, products } = promotion;

  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  return (
    <Fragment>
      <Card classes={{ root: classes.root }}>
        <CardActionArea onClick={handleClick}>
          <CardContent classes={{ root: classes.cardContent }}>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              pr={2}
              pl={2}
            >
              <Typography gutterBottom variant={'body1'}>
                {type}
              </Typography>
              <Typography
                gutterBottom
                variant={'h6'}
                style={{ marginBottom: 0, fontWeight: 600 }}
              >
                {priceInflation ? ` one free` : `${discount}% off`}
              </Typography>
            </Box>
            <List dense className={classes.productsWrapper}>
              {products.map((product) => (
                <ListItem key={product._id}>
                  <ListItemText>
                    <Typography color={'textSecondary'}>
                      {product.name}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))}
            </List>

            <Box
              p={1}
              display={'flex'}
              justifyContent={'flex-start'}
              alignItems={'center'}
              flexGrow={1}
            >
              <Typography variant={'h6'}>
                <del>
                  {priceInflation
                    ? `£${(getTotalPrice(products) * 2).toFixed(2)}`
                    : `£${getTotalPrice(products).toFixed(2)}`}
                </del>
              </Typography>
            </Box>

            <Box className={classes.discountedPriceWrapper}>
              <Typography variant={'h6'} align={'center'} className={'bold'}>
                {priceInflation
                  ? `£${(
                      (getTotalPrice(products) / products.length) *
                      priceInflation
                    ).toFixed(2)}`
                  : `£${(
                      (getTotalPrice(products) / 100) *
                      (100 - discount)
                    ).toFixed(2)}`}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <PromoModal
        modalOpen={modalOpen}
        promotion={promotion}
        setModalOpen={setModalOpen}
      />
    </Fragment>
  );
};

const getTotalPrice = (products) => {
  const totalPrice = products
    .map((product) => product.price)
    .reduce((acc, curr) => acc + curr);

  return totalPrice;
};

PromoCard.propTypes = {
  promotion: PropTypes.object.isRequired
};

export default PromoCard;
