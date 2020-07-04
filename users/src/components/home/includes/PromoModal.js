import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
// Redux
import { connect } from 'react-redux';
import { toggleUsedPromotion, viewedPromotion } from '../../../actions/user';
// Components
import {
  Box,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useTheme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProductRow from './ProductRow';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  qrCodeWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(3)
  },
  contentWrapper: {
    '&::-webkit-scrollbar': {
      width: 8
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
  actionsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
}));

const PromoModal = ({
  usedPromotions,
  modalOpen,
  promotion,
  setModalOpen,
  toggleUsedPromotion,
  viewedPromotion
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const promotionUsed = usedPromotions.includes(promotion._id);

  const qrValue = JSON.stringify({
    type: promotion.type,
    discount: promotion.discount,
    priceInflation: promotion.priceInflation,
    products: getProductsIds(promotion)
  });

  useEffect(() => {
    if (modalOpen) viewedPromotion(promotion._id);
  }, [modalOpen, viewedPromotion, promotion]);

  const handleClick = (event) => {
    const element = event.currentTarget;

    switch (element.id) {
      case 'usedPromotionBtn':
        toggleUsedPromotion(promotion._id, promotionUsed);
        break;
      case 'closeModalBtn':
        setModalOpen(false);
        break;
    }
  };

  return (
    <Box className={classes.root}>
      <Dialog open={modalOpen} className={classes.root}>
        <DialogTitle>{'Scan QR code at checkout:'}</DialogTitle>
        <DialogContent className={classes.contentWrapper}>
          <Box className={classes.qrCodeWrapper}>
            <QRCode renderAs={'svg'} value={qrValue} size={250} />
          </Box>
          <Typography variant={'body1'} color={'textSecondary'}>
            Products included in this promotion:
          </Typography>
          {promotion.products.map((product, index) => (
            <ProductRow key={product._id} number={index + 1} product={product}>
              <Box>
                <Box display={'flex'} justifyContent={'flex-start'} mb={2}>
                  <Box mr={2}>
                    <Typography variant={'body2'}>Name: </Typography>
                  </Box>
                  <Typography variant={'body2'}>{product.name}</Typography>
                </Box>

                <Box display={'flex'} justifyContent={'flex-start'} mb={2}>
                  <Box mr={2}>
                    <Typography variant={'body2'}>Regular price: </Typography>
                  </Box>
                  <Typography variant={'body2'}>£{product.price}</Typography>
                </Box>

                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'flex-start'}
                >
                  <Box mb={1}>
                    <Typography variant={'body2'}>Description:</Typography>
                  </Box>
                  <Box>
                    <Typography variant={'body2'}>
                      {product.longDescription}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ProductRow>
          ))}
        </DialogContent>
        <DialogActions className={classes.actionsWrapper}>
          <Button
            variant={'contained'}
            color={'secondary'}
            id={'usedPromotionBtn'}
            onClick={handleClick}
            style={{
              backgroundColor: promotionUsed
                ? theme.palette.common.green
                : theme.palette.secondary.main
            }}
          >
            {promotionUsed ? 'Used' : 'I used this promotion'}
          </Button>
          <Button
            variant={'contained'}
            color={'secondary'}
            id={'closeModalBtn'}
            onClick={handleClick}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

function getProductsIds(promotion) {
  return promotion.products.map((prod) => prod._id);
}

PromoModal.propTypes = {
  usedPromotions: PropTypes.array.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  promotion: PropTypes.object.isRequired,
  viewedPromotion: PropTypes.func.isRequired,
  toggleUsedPromotion: PropTypes.func.isRequired
};

const mapStateToProps = ({ user }) => ({
  usedPromotions: user.usedPromotions
});

export default connect(mapStateToProps, {
  toggleUsedPromotion,
  viewedPromotion
})(PromoModal);
