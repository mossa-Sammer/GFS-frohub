import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Icon, Skeleton, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { fetchLocationList as fetchLocationListAction } from './location.actions';
import searchByFields from '../../../containers/Services/services.actions';
import searchChangeAction from '../search.actions';
import { SERVICES_URL } from '../../../routes_urls';

import './style.css';

const { Option } = Select;

class LocationInput extends Component {
  handleSearch = value => {
    const { fetchLocationList } = this.props;
    if (value.length > 3) {
      fetchLocationList(value);
    }
  };

  handleSelect = async value => {
    const {
      locations: { locationList },
      searchChange,
      serachFields,
      match: { path },
    } = this.props;
    let selectedLocation;
    if (value) {
      selectedLocation = locationList.reduce((location, locationObj) => {
        if (locationObj.place_id === value) {
          return locationObj;
        }
        return location;
      }, {});
    } else {
      selectedLocation = null;
    }
    if (path === SERVICES_URL)
      await serachFields({ location: selectedLocation });
    else
      searchChange({
        name: 'location',
        value: selectedLocation,
      });
  };

  render() {
    const {
      locations: { locationList, error, loading },
      locationQuery,
    } = this.props;
    this.match = locationList.length;

    if (error) {
      message.error();
    }
    return (
      <div className="location__input">
        {error && message.error(error.message)}
        <Select
          className="location__select"
          allowClear
          showSearch
          suffixIcon={<Icon type="environment" />}
          onSearch={this.handleSearch}
          onChange={this.handleSelect}
          filterOption="children"
          dropdownRender={menu => {
            if (loading) return <Skeleton active paragraph={{ rows: 0 }} />;
            return <>{menu}</>;
          }}
          notFoundContent="No location match"
          placeholder="Enter postcode or address"
          showAction={['focus', 'click']}
          defaultValue={
            (locationQuery && locationQuery.display_name) || undefined
          }
        >
          {locationList.map(address => (
            <Option key={address.place_id} value={address.place_id}>
              {address.display_name}
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}

const mapStateToProps = ({
  locations,
  searchQueries: { location: locationQuery },
}) => ({
  locations,
  locationQuery,
});

export default connect(mapStateToProps, {
  fetchLocationList: fetchLocationListAction,
  searchChange: searchChangeAction,
  serachFields: searchByFields,
})(withRouter(LocationInput));
