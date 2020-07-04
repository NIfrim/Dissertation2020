import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const TabPanel = (props) => {
  const { children, value, id, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={id}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Fragment>{children}</Fragment>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

export default TabPanel;
