/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio, Icon, Button, Switch } from 'antd';

import advancedSearchAction from './advancedSearch.actions';
import { sortServices } from '../services.actions';

import './style.css';
import './media.css';

class AdvancedSearch extends Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseMenu);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseMenu);
  }

  handleVisibleSelect = () => {
    this.setState(prevState => {
      const { visible } = prevState;
      return {
        visible: !visible,
      };
    });
  };

  handleCloseMenu = e => {
    if (e.type === 'click' || e.key === 'Escape') {
      this.setState({ visible: false });
    }
  };

  handleSortRated = e => {
    const { advancedSearchAction: advancedSearch } = this.props;
    advancedSearch({ value: e.target.value, key: 'sortByRate' });
  };

  sortByType = e => {
    const { advancedSearchAction: advancedSearch } = this.props;
    advancedSearch({ value: e.target.value, key: 'sortByType' });
  };

  clearSort = () => {
    const { advancedSearchAction: advancedSearch } = this.props;
    advancedSearch({ key: 'clear' });
  };

  instantBook = isTrue => {
    const { advancedSearchAction: advancedSearch } = this.props;
    advancedSearch({ key: 'instantBook', value: isTrue });
  };

  handleShowServices = () => {
    const {
      services,
      advancedSearchQueries,
      sortServices: sortServicesAction,
      stores,
    } = this.props;
    this.setState(prevState => {
      const { visible } = prevState;
      return {
        visible: !visible,
      };
    });
    sortServicesAction(stores, services, advancedSearchQueries);
  };

  handleAdvanceSearch = () => {
    const {
      services,
      advancedSearchQueries,
      sortServices: sortServicesAction,
      stores,
    } = this.props;
    sortServicesAction(stores, services, advancedSearchQueries);
  };

  handleVisible = () => {
    this.setState(prevState => {
      const { visible } = prevState;
      return {
        visible: !visible,
      };
    });
  };

  render() {
    const { visible } = this.state;
    const { advancedSearchQueries } = this.props;
    return (
      <div className="filter__container">
        {visible && (
          <>
            <div className="filter__menu">
              <Button className="close__btn" onClick={this.handleVisible}>
                Close
              </Button>
              <div className="filter__menu-options">
                <span className="filter-tilte">Sort by:</span>
                <div>
                  <Radio.Group
                    onChange={this.handleSortRated}
                    value={advancedSearchQueries.sortBy}
                  >
                    <div className="filter_option">
                      <Radio value="highestRate">Highest Rated</Radio>
                    </div>
                    <div className="filter_option">
                      <Radio value="highestPrice">Highest Price</Radio>
                    </div>
                    <div className="filter_option">
                      <Radio value="lowestPrice">Lowest Price</Radio>
                    </div>
                  </Radio.Group>
                </div>
              </div>
              <div className="filter__menu-options filter__menu-type">
                <span className="filter-tilte">Service type:</span>
                <div>
                  <Radio.Group
                    onChange={this.sortByType}
                    value={advancedSearchQueries.serviceType}
                  >
                    <div className="filter_option">
                      <Radio value="mobile" onClick={this.handleAdvanceSearch}>
                        Mobile Beauty
                      </Radio>
                    </div>
                    <div className="filter_option">
                      <Radio value="home" onClick={this.handleAdvanceSearch}>
                        Home Based
                      </Radio>
                    </div>
                    <div className="filter_option">
                      <Radio value="salon" onClick={this.handleAdvanceSearch}>
                        Salon Based
                      </Radio>
                    </div>
                  </Radio.Group>
                </div>
              </div>
              <div className="filter__menu-options filter__menu-instant">
                <div className="filter_option filter_menu-instant--flex">
                  <label htmlFor="instantBook" className="filter-tilte">
                    Instant Booking:{'  '}
                  </label>
                  <div>
                    <Switch
                      id="instantBook"
                      defaultChecked
                      className="filter_instant-booking"
                      checked={advancedSearchQueries.instantBook}
                      onChange={this.instantBook}
                    />
                    <span>
                      Services you can book without waiting for beauticians
                      approval
                    </span>
                  </div>
                </div>
              </div>
              <div className="filter__menu-btns">
                <Button className="clear-btn" onClick={this.clearSort}>
                  Clear filters
                </Button>
                <Button className="show-btn" onClick={this.handleShowServices}>
                  Show results
                </Button>
              </div>
            </div>
            <div
              id="background"
              onClick={this.handleCloseMenu}
              className="filter__background"
              role="button"
              tabIndex={-1}
              label="filter-background"
            />
          </>
        )}
        <Button className="filter-btn" onClick={this.handleVisibleSelect}>
          <Icon type="swap" />
          Filter and sort
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { advancedSearchQueries, services } = state;
  return {
    advancedSearchQueries,
    services: services.filtredServices,
    stores: services.stores,
  };
};

export default connect(mapStateToProps, { advancedSearchAction, sortServices })(
  AdvancedSearch
);
