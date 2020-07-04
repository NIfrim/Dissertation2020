import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

const InteractiveTooltip = ({ text, icon }) => {
  return (
    <Tooltip title={text} interactive>
      <span className={`mdi mdi-${icon}`} />
    </Tooltip>
  );
};

InteractiveTooltip.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default InteractiveTooltip;
