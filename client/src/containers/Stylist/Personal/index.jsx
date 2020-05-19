import React, { Component } from 'react';
import { Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import { BUSINESS_URL } from '../../../routes_urls';

class Personal extends Component {
  render() {
    return (
      <div>
        <div>Personal</div>
        <Button>
          <Link to={BUSINESS_URL}>Next</Link>
        </Button>
      </div>
    );
  }
}

export default withRouter(Personal);
