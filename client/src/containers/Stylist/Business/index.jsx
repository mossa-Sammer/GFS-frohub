import React, { Component } from 'react';
import { Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import { SALON_URL } from '../../../routes_urls';

class Business extends Component {
  render() {
    return (
      <div>
        <div>business</div>
        <Button>
          <Link to={SALON_URL}>Next</Link>
        </Button>
      </div>
    );
  }
}

export default withRouter(Business);
