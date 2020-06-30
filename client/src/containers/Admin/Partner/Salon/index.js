/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Descriptions, List, Table, Empty } from 'antd';

import Axios from '../../../../axios-config';
import { days } from '../../../../components/DaySelect';

import './style.css';

const columns = [
  {
    title: 'From Zone',
    dataIndex: 'fromZone',
    name: 'fromZone',
    render: text => <a>{text}</a>,
  },
  {
    title: 'To Zone',
    dataIndex: 'toZone',
    key: 'toZone',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: text => <a>{text}</a>,
  },
];

class Salon extends Component {
  state = {
    salon: {},
    openingTimes: [],
    zones: [],
  };

  async componentDidMount() {
    const {
      location: { search },
    } = this.props;
    const userId = search.replace('?', '');
    const { data } = await Axios.get(`/salon/${userId}`);
    const { salon, openingTimes, zones } = data;
    this.setState({ salon, openingTimes, zones: this.normalizeZones(zones) });
  }

  normalizeZones = zones => {
    return zones.map(z => {
      return {
        id: z.salon_zone_id,
        fromZone: z.from_zone,
        toZone: z.to_zone,
        price: z.price,
      };
    });
  };

  render() {
    const { salon, openingTimes, zones } = this.state;

    return (
      <div>
        {salon.name ? (
          <>
            <Descriptions title="Salon Details">
              <Descriptions.Item label="Salon Name">
                {salon.name}
              </Descriptions.Item>
              <Descriptions.Item label="Instgram Handle">
                {salon.instgram_handle}
              </Descriptions.Item>
              <Descriptions.Item label="Salon Type">
                {salon.type}
              </Descriptions.Item>
              <Descriptions.Item label="Salon Address">
                {`${salon.street} ${salon.city} ${salon.country}`}
              </Descriptions.Item>
              <Descriptions.Item label="Postal Code">
                {salon.postal_code}
              </Descriptions.Item>
            </Descriptions>
            <div className="zones-times-container">
              {salon.zones && (
                <Table
                  className="admin-user-zones"
                  columns={columns}
                  dataSource={zones}
                  rowKey={record => record.id}
                />
              )}
              <List
                className="admin-user-opening-times"
                size="default"
                header={<div>Opening Times: </div>}
                bordered
                dataSource={openingTimes}
                renderItem={item => (
                  <List.Item>
                    <div className="admin-opening-times-day">
                      {days[item.day].name}
                    </div>
                    <div>{item.from_time}</div>
                    <div>{item.to_time}</div>
                  </List.Item>
                )}
              />
            </div>
            <Descriptions className="admin-users-about-me-wrapper">
              <Descriptions.Item label="About Me">
                {salon.about}
              </Descriptions.Item>
            </Descriptions>
            <p>Cover Image:</p>
            <img
              className="stylist-profile-image"
              src={salon.cover_image}
              alt="cover-pic"
            />
            <p>Profile Image:</p>
            <img
              className="stylist-cover-image"
              src={salon.profile_image}
              alt="profile-pic"
            />
            <div className="admin-user-documents">
              <p className="admin-user-documents__header">Documents</p>
              <ul className="admin-user-documents__list">
                {salon?.document?.map((d, index) => (
                  <li key={index}>
                    <a
                      href={d}
                      rel="noreferrer"
                      target="_blank"
                    >{`document ${index + 1}`}</a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <Empty />
        )}
      </div>
    );
  }
}

export default withRouter(Salon);
