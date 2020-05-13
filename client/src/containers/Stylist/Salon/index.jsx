import React, { Component } from 'react';
import { Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import { STYLIST_SERVICES_URL } from '../../../routes_urls';

class Salon extends Component {
  render() {
    return (
      <div>
        <div>Salon</div>
        <Button>
          <Link to={STYLIST_SERVICES_URL}>Next</Link>
        </Button>
      </div>
    );
  }
}

export default withRouter(Salon)
