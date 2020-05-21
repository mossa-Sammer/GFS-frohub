import React, { Component } from 'react';

export default class EditService extends Component {
  componentDidMount() {
    console.log(1111111111, this.props.location);
  }

  render() {
    return <div>edit service</div>;
  }
}
