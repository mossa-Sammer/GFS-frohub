import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Form, Input, Radio, Upload, Icon } from 'antd';

import axios from 'axios';

import {
  Uploader,
  ZonesSelector,
  Address,
  OpeningTimes,
} from '../../../components';
import { STYLIST_SERVICES_URL } from '../../../routes_urls';

import './style.css';

class SalonForm extends Component {
  state = {
    // profileImage: '',
    // coverImage: '',
    zones: [{}],
    // address: {},
    openingTimes: [{}],
    countries: [],
  };

  async componentDidMount() {
    const countriesData = await axios.get(
      'https://cors-anywhere.herokuapp.com/https://restcountries.eu/rest/v2/all?fields=name;alpha2Code'
    );

    this.setState({ countries: countriesData.data });
  }

  onClick = () => {};

  handleAddMoreZone = () => {
    const {
      zones: [...clonedZones],
    } = this.state;
    clonedZones.push({});
    this.setState({ zones: clonedZones });
  };

  handleAddMoreTime = () => {
    const {
      openingTimes: [...clonedTimes],
    } = this.state;
    clonedTimes.push({});
    this.setState({ openingTimes: clonedTimes });
  };

  handleAddCoveredZone = () => {
    // const { zones } = this.state;
  };

  render() {
    const { zones, countries, openingTimes } = this.state;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return (
      <div className="salon__page">
        <h3>Salon Details</h3>
        <Form>
          <Form.Item className="salon-input" label="Salon name">
            <Input />
          </Form.Item>
          <Form.Item label="About me">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item className="instgram-handle-input" label="Instgram handle">
            <Input />
          </Form.Item>

          <Form.Item className="profile-image__input" label="Profile image">
            <Uploader className="profile-image__uploader" />
          </Form.Item>
          <Form.Item label="Cover image">
            <Uploader />
          </Form.Item>
          <h4>Salon Type</h4>
          <Radio.Group>
            <Radio style={radioStyle} value="salon">
              Salon based
            </Radio>
            <Radio style={radioStyle} value="home">
              Home based
            </Radio>
            <Radio style={radioStyle} value="mobile">
              Mobile based
            </Radio>
          </Radio.Group>
          <div className="document-upload__wrapper">
            <p className="document-upload__text">
              if you have any formal qualifications as Hairstylist/Beautian,
              please upload them here
            </p>

            <Upload
              className="document-upload__uploader"
              name="logo"
              action="/upload.do"
              listType="picture"
            >
              <Button>
                <Icon type="upload" /> Click to upload a document
              </Button>
            </Upload>
            <ZonesSelector
              zones={zones}
              handleAddMore={this.handleAddMoreZone}
            />
            <div className="address-section">
              <h4 className="address-section__header">What is your address?</h4>
              <Address countries={countries} />
            </div>

            <h4>What Are your opening times?</h4>
            <OpeningTimes
              times={openingTimes}
              addMore={this.handleAddMoreTime}
            />
          </div>
        </Form>
        <Button type="primary" className="salon__btn">
          <Link to={STYLIST_SERVICES_URL}>Next</Link>
        </Button>
      </div>
    );
  }
}

export default withRouter(SalonForm);
