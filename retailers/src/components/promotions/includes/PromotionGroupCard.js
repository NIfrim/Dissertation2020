import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  Collapse,
  CardHeader,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  CardContent,
  Divider,
  Grid,
  Button,
  List,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Typography,
  FormControl,
  FormHelperText,
  Box,
  TextField
} from '@material-ui/core';
import { PromotionGroupForm } from '.';
import { makeStyles } from '@material-ui/styles';
import {
  removePromoGroups,
  setPromoGroupStatus,
  linkPromoToProducts,
  unlinkPromoGroup,
  generatePromotions,
  updatePromoGroup
} from '../../../actions/promotions';
import clsx from 'clsx';
import { TextInput, Label } from '../../includes';
import { setAlert } from '../../../actions/alert';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1)
  },
  cardHeader: {
    paddingBottom: 0
  },
  disabled: {
    backgroundColor: theme.palette.common.grey
  }
}));

const PromotionGroupCard = props => {
  const classes = useStyles();

  const {
    data,
    products: { productGroups },
    promotions: { promoGroups },
    removePromoGroups,
    setPromoGroupStatus,
    linkPromoToProducts,
    updatePromoGroup,
    generatePromotions,
    unlinkPromoGroup,
    setAlert
  } = props;

  const {
    _id,
    name,
    description,
    disabled,
    category,
    rules,
    maxDiscount,
    priceInflation,
    maxProducts,
    expiryDate
  } = data;

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [editGroup, setEditGroup] = useState(false);
  const [linkProducts, setLinkProducts] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [limitsOpen, setLimitsOpen] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedRules, setSelectedRules] = useState(rules ? rules : []);
  const [status, setStatus] = useState(disabled);

  const [limitsFormData, setLimitsFormData] = useState({
    maxDiscount: maxDiscount ? maxDiscount : 0,
    maxProducts: maxProducts ? maxProducts : 1,
    expiryDate: expiryDate ? expiryDate : '',
    priceInflation: priceInflation ? priceInflation : 1.0
  });

  useEffect(() => {
    if (!!productGroups.length > 0) {
      setSelectedGroups([
        ...selectedGroups,
        ...promoGroups[category]
          .filter(promoGroup => promoGroup._id === _id)[0]
          .linkedProductGroups.map(productGroup => parseInt(productGroup._id))
      ]);
    }
    // eslint-disable-next-line
  }, [productGroups, setSelectedGroups]);

  const handleClick = e => {
    const { value } = e.currentTarget.attributes.name;

    switch (value) {
      case 'generatePromotions':
        let groupId = parseInt(_id);

        // Generate promotions for each type selected under rules
        if (rules && rules.length > 0 && selectedGroups.length > 0) {
          rules.forEach(type => {
            const groupData = {
              type,
              discount: maxDiscount,
              priceInflation: priceInflation,
              expires: expiryDate
            };

            /** Action used to generate bundle | discount | bogoff promotions
             * @param {string} category
             * @param {string} maxProducts
             * @param {number} promoGroupId
             * @param {json} groupData
             */
            generatePromotions(category, maxProducts, groupId, groupData);
          });
        } else {
          if (selectedGroups.length < 1) {
            setAlert('One or more product groups need to be linked before generating promotions.', 'error', 4000);
          } else if (!rules || rules.length < 1) {
            setAlert('Rules and limits are required to be set before generating promotions', 'error', 4000);
          }
        }
        break;

      case 'cancelLinkProducts':
      case 'linkProducts':
        setLimitsOpen(false);
        setRulesOpen(false);
        setEditGroup(false);
        setLinkProducts(!linkProducts);
        break;

      case 'edit':
        handleClose();
        setLimitsOpen(false);
        setRulesOpen(false);
        setLinkProducts(false);
        setEditGroup(!editGroup);
        break;

      case 'disable':
        handleClose();
        setStatus(!status);
        setPromoGroupStatus(category, parseInt(_id), !status);
        break;

      case 'remove':
        removePromoGroups(category, parseInt(_id));
        break;

      case 'cancelAddRules':
      case 'addRules':
        setLinkProducts(false);
        setEditGroup(false);
        setLimitsOpen(false);
        setRulesOpen(!rulesOpen);
        break;

      case 'cancelAddLimits':
      case 'addLimits':
        setLinkProducts(false);
        setEditGroup(false);
        setRulesOpen(false);
        setLimitsOpen(!limitsOpen);
        break;

      case 'options':
        setMenuAnchor(e.currentTarget);
        break;

      default:
        break;
    }
  };

  const handleSelected = e => {
    const { checked, value, name } = e.target;

    if (name === 'productGroup') {
      checked
        ? setSelectedGroups([...selectedGroups, parseInt(value)])
        : setSelectedGroups(selectedGroups.filter(elem => elem !== parseInt(value)));
    } else if (name === 'promotionRule') {
      checked
        ? setSelectedRules([...selectedRules, value])
        : setSelectedRules(selectedRules.filter(elem => elem !== value));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { target } = e;

    if (target.name && target.name === 'submitLinkedProducts') {
      selectedGroups.length > 0 && linkPromoToProducts(category, parseInt(_id), selectedGroups);
      selectedGroups.length === 0 && unlinkPromoGroup(category, parseInt(_id));
    } else if (target.name && target.name === 'submitRules') {
      selectedRules.length > 0 &&
        updatePromoGroup({ rules: selectedRules, name, description, disabled, category }, true, parseInt(_id));
    } else if (target.name && target.name === 'submitLimits') {
      updatePromoGroup(
        {
          name,
          description,
          disabled,
          category,
          maxDiscount: limitsFormData.maxDiscount,
          maxProducts: limitsFormData.maxProducts,
          expiryDate: limitsFormData.expiryDate,
          priceInflation: limitsFormData.priceInflation
        },
        true,
        parseInt(_id)
      );
    }
  };

  const handleClose = () => {
    setMenuAnchor(null);
  };

  const handleFormInput = e => {
    const { target } = e;

    if (target.name === 'maxDiscount' || target.name === 'maxProducts') {
      setLimitsFormData({
        ...limitsFormData,
        [target.name]: parseInt(target.value)
      });
    } else if (target.name === 'priceInflation') {
      setLimitsFormData({
        ...limitsFormData,
        [target.name]: parseFloat(target.value)
      });
    } else if (target.name === 'expiryDate') {
      setLimitsFormData({
        ...limitsFormData,
        [target.name]: target.value
      });
    }
  };

  return (
    <Card className={clsx(classes.root, { [classes.disabled]: status })} elevation={status ? 0 : 1}>
      {/* Card Header */}
      <CardHeader
        className={classes.cardHeader}
        title={_id + ': ' + name}
        action={
          <div>
            <IconButton title={'Link'} name={'linkProducts'} onClick={handleClick}>
              <i className={'material-icons'}>link</i>
            </IconButton>
            <IconButton title={'Edit'} name={'edit'} onClick={handleClick}>
              <i className={'material-icons'}>edit</i>
            </IconButton>
            <IconButton
              aria-controls='actionsMenu'
              aria-haspopup={true}
              name={'options'}
              title={'Options'}
              onClick={handleClick}
            >
              <i className={'material-icons'}>more_vert</i>
            </IconButton>
            <Menu id='actionsMenu' anchorEl={menuAnchor} keepMounted open={Boolean(menuAnchor)} onClose={handleClose}>
              <MenuItem name={'disable'} onClick={handleClick}>
                {status ? 'Enable' : 'Disable'}
              </MenuItem>
              <MenuItem name={'remove'} onClick={handleClick}>
                Remove
              </MenuItem>
            </Menu>
          </div>
        }
      />
      <Divider variant={'fullWidth'} light />
      {/* Card content holds edit form */}
      <CardContent
        className={clsx(classes.cardContent, {
          noContent: !linkProducts && !rulesOpen && !limitsOpen && !editGroup
        })}
      >
        <Collapse className={'cardCollapseSection'} in={editGroup} timeout='auto' unmountOnExit>
          <PromotionGroupForm data={data} type={data.category} setVisible={setEditGroup} editing={true} />
        </Collapse>

        <Collapse className={'cardCollapseSection'} in={linkProducts} timeout='auto' unmountOnExit>
          <form onSubmit={handleSubmit} name={'submitLinkedProducts'}>
            <List>
              {productGroups.map(group => (
                <FormGroup key={group._id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedGroups && selectedGroups.includes(parseInt(group._id))}
                        onChange={handleSelected}
                        name={'productGroup'}
                        value={group._id}
                      />
                    }
                    label={group.name}
                  />
                </FormGroup>
              ))}
            </List>

            <Grid container justify={'space-between'}>
              <Button
                variant={'outlined'}
                size={'small'}
                color={'secondary'}
                name={'cancelLinkProducts'}
                onClick={handleClick}
              >
                Cancel
              </Button>

              <Button type={'submit'} variant={'outlined'} size={'small'} name={'submitLinked'} color={'secondary'}>
                Submit
              </Button>
            </Grid>
          </form>
        </Collapse>

        <Collapse className={'cardCollapseSection'} in={rulesOpen} timeout='auto' unmountOnExit>
          <Grid container direction={'column'} justify={'space-between'}>
            <Typography variant={'h6'}>Promotion rules:</Typography>
            <form onSubmit={handleSubmit} name={'submitRules'}>
              <FormGroup key={'bundle'}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedRules.includes('BUNDLE')}
                      size={'small'}
                      onChange={handleSelected}
                      name={'promotionRule'}
                      value={'BUNDLE'}
                    />
                  }
                  label={<Typography variant={'body1'}>Include 'Bundle' promotions</Typography>}
                />
              </FormGroup>

              <FormGroup key={'discount'}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedRules.includes('DISCOUNT')}
                      size={'small'}
                      onChange={handleSelected}
                      name={'promotionRule'}
                      value={'DISCOUNT'}
                    />
                  }
                  label={<Typography variant={'body1'}>Include 'Discount' promotions</Typography>}
                />
              </FormGroup>

              <FormGroup key={'bogoff'}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedRules.includes('BOGOFF')}
                      size={'small'}
                      onChange={handleSelected}
                      name={'promotionRule'}
                      value={'BOGOFF'}
                    />
                  }
                  label={<Typography variant={'body1'}>Include 'Buy One Get One Free' promotions</Typography>}
                />
              </FormGroup>

              <Grid container item justify={'space-between'}>
                <Button
                  variant={'outlined'}
                  size={'small'}
                  color={'secondary'}
                  name={'cancelAddRules'}
                  onClick={handleClick}
                >
                  Cancel
                </Button>

                <Button type={'submit'} variant={'outlined'} size={'small'} name={'submitRules'} color={'secondary'}>
                  Submit
                </Button>
              </Grid>
            </form>
          </Grid>
        </Collapse>

        <Collapse className={'cardCollapseSection'} in={limitsOpen} timeout='auto' unmountOnExit>
          <Grid container direction={'row'} justify='space-between'>
            <Typography variant={'h6'}>Set promotion limits:</Typography>

            <form onSubmit={handleSubmit} name={'submitLimits'}>
              <FormControl fullWidth variant={'outlined'} margin={'dense'}>
                <Label htmlFor={'maxProducts'}>Maximum products allowed</Label>
                <TextInput
                  id={'maxProducts'}
                  onChange={handleFormInput}
                  type={'number'}
                  value={limitsFormData.maxProducts}
                  name={'maxProducts'}
                  labelWidth={210}
                  required
                />
                <FormHelperText>* Only applies to 'Bundle' promotions</FormHelperText>
              </FormControl>

              <FormControl fullWidth variant={'outlined'} margin={'dense'}>
                <Label htmlFor={'maxDiscount'}>Discount Value</Label>
                <TextInput
                  id={'maxDiscount'}
                  onChange={handleFormInput}
                  type={'number'}
                  value={limitsFormData.maxDiscount}
                  name={'maxDiscount'}
                  labelWidth={150}
                  endAdornment={<strong>%</strong>}
                  required
                />
                <FormHelperText>* Percentage value between 0 - 100</FormHelperText>
              </FormControl>

              <FormControl fullWidth variant={'outlined'} margin={'dense'}>
                <Label htmlFor={'priceInflation'}>Price Inflation</Label>
                <TextInput
                  id={'priceInflation'}
                  onChange={handleFormInput}
                  type={'number'}
                  inputMode={'decimal'}
                  inputProps={{
                    max: 2.0,
                    step: 0.01
                  }}
                  defaultValue={limitsFormData.priceInflation}
                  name={'priceInflation'}
                  labelWidth={150}
                  required
                />
                <FormHelperText>* BOGOFF only value between 1.00 - 2.00</FormHelperText>
              </FormControl>

              <FormControl fullWidth variant={'outlined'} margin={'dense'}>
                <TextField
                  id={'expiryDate'}
                  name={'expiryDate'}
                  label={'Expiry Date'}
                  type={'date'}
                  onChange={handleFormInput}
                  value={limitsFormData.expiryDate}
                  variant={'outlined'}
                  margin={'dense'}
                  InputLabelProps={{
                    shrink: true
                  }}
                  required
                />
                <FormHelperText>* Date when promotion is no longer displayed to the users</FormHelperText>
              </FormControl>

              <Grid container item justify={'space-between'}>
                <Button
                  variant={'outlined'}
                  size={'small'}
                  color={'secondary'}
                  name={'cancelAddLimits'}
                  onClick={handleClick}
                >
                  Cancel
                </Button>

                <Button type={'submit'} variant={'outlined'} size={'small'} name={'submitLimits'} color={'secondary'}>
                  Submit
                </Button>
              </Grid>
            </form>
          </Grid>
        </Collapse>
      </CardContent>

      {rulesOpen || limitsOpen || linkProducts || editGroup ? <Divider variant={'fullWidth'} light /> : ''}

      <CardActions>
        <Grid container justify={'space-between'}>
          <Box>
            <Button
              name={'generatePromotions'}
              variant={'outlined'}
              color={'secondary'}
              size={'small'}
              onClick={handleClick}
            >
              Generate Promotions
            </Button>
          </Box>
          <Box>
            <Button name={'addRules'} variant={'outlined'} color={'primary'} size={'small'} onClick={handleClick}>
              Rules
            </Button>
            <Button name={'addLimits'} variant={'outlined'} color={'primary'} size={'small'} onClick={handleClick}>
              Limits
            </Button>
          </Box>
        </Grid>
      </CardActions>
    </Card>
  );
};

PromotionGroupCard.propTypes = {
  data: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  promotions: PropTypes.object.isRequired,
  removePromoGroups: PropTypes.func.isRequired,
  setPromoGroupStatus: PropTypes.func.isRequired,
  linkPromoToProducts: PropTypes.func.isRequired,
  unlinkPromoGroup: PropTypes.func.isRequired,
  updatePromoGroup: PropTypes.func.isRequired,
  generatePromotions: PropTypes.func.isRequired
};

const mapStateToProps = ({ promotions, products }) => ({
  promotions,
  products
});

export default connect(mapStateToProps, {
  removePromoGroups,
  setPromoGroupStatus,
  linkPromoToProducts,
  unlinkPromoGroup,
  updatePromoGroup,
  generatePromotions,
  setAlert
})(PromotionGroupCard);
