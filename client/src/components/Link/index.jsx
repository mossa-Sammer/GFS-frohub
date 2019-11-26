import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './index.css';

function SharedLink(props) {
  const { children, href } = props;
  return (
    <Link className="link-text" to={href}>
      {children}
    </Link>
  );
}

export default SharedLink;

SharedLink.propTypes = {
  children: PropTypes.node.isRequired,
};
