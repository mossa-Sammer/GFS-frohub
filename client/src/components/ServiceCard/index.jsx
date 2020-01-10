import React, { Component } from 'react';
import { Card } from 'antd';

import './style.css';

export default class ServiceCard extends Component {
  handleClick = link => {
    window.open(link, '_blank');
  };

  render() {
    const { data, storeType } = this.props;
    const imgSrc = data.images.length
      ? data.images[0].src
      : 'https://s3-eu-west-2.amazonaws.com/frohub-content/wp-content/uploads/2019/05/09151932/woocommerce-placeholder-300x300.png';
    return (
      <Card
        className="service__card"
        onClick={() => this.handleClick(data.permalink)}
        cover={
          <a href={data.permalink} rel="noopener noreferrer" target="_blank">
            <img src={imgSrc} alt="frohub service" className="service__img" />
          </a>
        }
      >
        <h2 className="service__title">{data.name}</h2>
        <span className="service__type">{storeType}</span>
        <span className="service__price">
          £ {Number.parseFloat(data.display_cost).toFixed(2)}
        </span>
        <a
          className="service__link"
          href={data.permalink}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>See more</span>
        </a>
      </Card>
    );
  }
}
