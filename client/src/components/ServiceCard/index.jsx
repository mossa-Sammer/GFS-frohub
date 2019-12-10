import React, { Component } from 'react';

import { Card } from 'antd';

import './style.css';

export default class ServiceCard extends Component {
  render() {
    const { data } = this.props;
    return (
      <Card
        className="service__card"
        cover={
          data.images.length ? (
            <img
              src={data.images[0].src}
              alt="frohub service"
              className="service__img"
            />
          ) : (
            <img
              src="https://s3-eu-west-2.amazonaws.com/frohub-content/wp-content/uploads/2019/05/09151932/woocommerce-placeholder-300x300.png"
              alt="frohub service"
              className="service__img"
            />
          )
        }
      >
        <span className="price">{data.display_cost} $</span>
        <a href={data.permalink} rel="noopener noreferrer" target="_blank">
          See more
        </a>
      </Card>
    );
  }
}
