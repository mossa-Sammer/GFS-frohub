import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { Divider, Button } from 'antd';

import {
  STYLIST_PERSONAL_BY_ADMIN,
  ADMIN_EDIT_STYLIST,
} from '../../../routes_urls';

class TableActions extends Component {
  handleView = () => {
    const { user, history } = this.props;
    history.push({
      pathname: STYLIST_PERSONAL_BY_ADMIN,
      search: `${user.user_id}`,
    });
  };

  handleEdit = () => {
    const { user, history } = this.props;
    history.push({
      pathname: ADMIN_EDIT_STYLIST,
      search: `${user.user_id}`,
    });
  };

  render() {
    return (
      <>
        <Button className="stylist__action-btn" onClick={this.handleView}>
          View
        </Button>
        <Divider type="vertical" />
        <Button className="stylist__action-btn" onClick={this.handleEdit}>
          Edit
        </Button>
      </>
    );
  }
}

export default withRouter(TableActions);
