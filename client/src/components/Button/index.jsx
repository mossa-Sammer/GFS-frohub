import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import './index.css';

function SharedButton(props) {
  const { children } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Button {...props} className="btn" size="large">
      {children}
    </Button>
  );
}

export default SharedButton;

SharedButton.propTypes = {
  children: PropTypes.node.isRequired,
};
