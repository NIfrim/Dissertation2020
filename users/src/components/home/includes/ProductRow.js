import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Collapse,
  Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.dark,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  collapseBtn: {
    width: 50,
    height: 50
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    padding: theme.spacing(1),
    paddingBottom: `${theme.spacing(1)}px !important`
  }
}));

const ProductRow = ({ number, product, children }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen(!open);
  };

  return (
    <Card classes={{ root: classes.root }}>
      <CardActionArea onClick={handleClick}>
        <CardContent className={classes.cardDetails}>
          <Box alignSelf={'center'} mr={3}>
            <Typography variant={'body1'} color={'textSecondary'}>
              {number}
            </Typography>
          </Box>
          <Box display={'flex'} justifyContent={'flex-start'} flex={1}>
            <Typography variant={'body1'} color={'textSecondary'}>
              {product.name}
            </Typography>
          </Box>

          <Box
            className={classes.collapseBtn}
            display={'flex'}
            justifyContent={'flex-end'}
            alignItems={'center'}
          >
            <Typography
              variant={'body1'}
              color={'textSecondary'}
              align={'right'}
              className={`mdi mdi-arrow-${open ? 'up' : 'down'}`}
            />
          </Box>
        </CardContent>
      </CardActionArea>
      <Collapse in={open} timeout='auto' mountOnEnter unmountOnExit>
        <CardContent id={'cardContent'}>{children}</CardContent>
      </Collapse>
    </Card>
  );
};

ProductRow.propTypes = {
  number: PropTypes.number.isRequired,
  product: PropTypes.object.isRequired
};

export default ProductRow;
