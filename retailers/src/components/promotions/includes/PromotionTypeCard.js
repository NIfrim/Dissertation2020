import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Paper, Grid, Typography, makeStyles, Divider, Collapse, IconButton } from '@material-ui/core';
import { InteractiveTooltip } from '../../includes';
import { Spinner } from '../../layout';
import PromotionGroupForm from './PromotionGroupForm';
import PromotionGroupCard from './PromotionGroupCard';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    width: '100%'
  },
  title: {
    margin: '0 1em 0 0'
  }
}));

const PromotionTypeCard = props => {
  const {
    title,
    category,
    promotions: { loading, promoGroups }
  } = props;
  const classes = useStyles();

  const [newGroup, setNewGroup] = useState(false);
  // const [checked, setChecked] = useState(false);

  return (
    <Paper className={classes.root}>
      <Grid className={'column'} container direction={'column'} justify={'space-between'}>
        {/* Card Header with switch title and new group button */}
        <Grid
          className={'row'}
          container
          item
          direction={'row'}
          alignItems={'center'}
          wrap={'nowrap'}
          justify={'space-evenly'}
        >
          {/*<Switch checked={checked} name={'promoSwitch'} value={checked} onChange={e => setChecked(!checked)} />*/}

          <Grid className={'row'} container item justify={'flex-start'} direction={'row'}>
            <Typography variant={'h5'} className={classes.title}>
              {title}
            </Typography>
            <InteractiveTooltip text={'General promotions are sent to everyone and are not tailored'} />
          </Grid>

          <IconButton onClick={e => setNewGroup(!newGroup)}>
            <i className={'material-icons'}>add</i>
          </IconButton>
        </Grid>

        <Collapse className={'cardCollapseSection'} in={newGroup} timeout='auto' unmountOnExit>
          <PromotionGroupForm setVisible={setNewGroup} type={category} />
        </Collapse>

        <Divider orientation={'horizontal'} variant={'fullWidth'} />

        <Grid className={'column'} container item direction={'column'} justify={'space-between'}>
          {loading ? (
            <Spinner />
          ) : promoGroups[category] ? (
            promoGroups[category].map(group => <PromotionGroupCard key={group._id} data={group} />)
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

PromotionTypeCard.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  promotions: PropTypes.object.isRequired
};

const mapStateToProps = ({ promotions }) => ({
  promotions
});

export default connect(mapStateToProps)(PromotionTypeCard);
