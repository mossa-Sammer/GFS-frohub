import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import './index.css';

function SharedButton(props) {
  const { text } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Button {...props} className="btn" size="large">
      {text}
    </Button>
  );
}

export default SharedButton;

SharedButton.defaultProps = {
  text: '',
};

SharedButton.propTypes = {
  text: PropTypes.string,
};
