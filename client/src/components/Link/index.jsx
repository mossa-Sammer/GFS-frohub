import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './index.css';

class SharedLink extends Component {
  render() {
    const { children, href } = this.props;
    return (
      <Link className="link-text" to={href}>
        {children}
      </Link>
    );
  }
}

SharedLink.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SharedLink;
