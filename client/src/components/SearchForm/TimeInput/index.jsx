/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Collapse, Button, DatePicker, Icon } from 'antd';

import moment from 'moment';
import TimePicker from './TimePicker';
import searchAction from '../search.actions';

import { filterServices as filterServicesAction } from '../../../containers/Services/services.actions';

import './style.css';
import './media.css';

const { Panel } = Collapse;
class TimeInput extends Component {
  state = {
    visible: false,
    timeVisible: false,
    dateVisible: false,
    toOpen: false,
  };

  componentDidUpdate() {
    const { visible } = this.state;
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  toggleDatePopup = () => {
    this.setState(({ dateVisible }) => ({ dateVisible: !dateVisible }));
  };

  handleDate = e => {
    const { searchAction: handleSearch } = this.props;
    const { _isAMomentObject } = e;
    if (_isAMomentObject) {
      const convertedDate = moment(e).format('YYYY-MM-DD');
      const day = moment(e).format('dddd');
      handleSearch({
        name: 'date',
        value: convertedDate,
        day,
      });
    } else {
      handleSearch({
        name: 'date',
        value: '',
        day: '',
      });
    }
  };

  handleDone = () => {
    const {
      searchQueries,
      filterServicesAction: filterServices,
      services,
      stores,
      match,
      history,
    } = this.props;
    filterServices(stores, services, searchQueries);
    this.setState({ visible: false, timeVisible: false, toOpen: false });
    if (match.url === '/') {
      history.push('/services');
    }
  };

  // Can not select days before today
  disabledDate = current => {
    return current && current < moment().startOf('day');
  };

  toggleCollapse = () => {
    this.setState(({ visible }) => ({ visible: !visible }));
  };

  closeCollapse = (e, cb) => {
    this.setState({ visible: false, timeVisible: false, toOpen: false }, cb);
  };

  handleOpenChange = open => {
    this.setState({ toOpen: open });
  };

  handleTimePopover = () => {
    this.setState(({ timeVisible }) => ({ timeVisible: !timeVisible }));
  };

  handleVisible = () => {
    this.setState(prevState => {
      const { visible } = prevState;
      return {
        visible: !visible,
      };
    });
  };

  clearTimeDate = () => {
    const { searchAction: handleSearch } = this.props;
    handleSearch({
      name: 'date',
      value: '',
      day: '',
    });
    handleSearch({
      name: 'time',
      value: {
        from: '',
        to: '',
      },
    });
  };

  render() {
    const { date, from, to } = this.props;
    const { visible, dateVisible, timeVisible, toOpen } = this.state;
    return (
      <Collapse
        className="time__input"
        accordion
        expandIcon={() => <Icon className="picker-icon" type="calendar" />}
        activeKey={visible ? 'time' : ''}
        onChange={this.toggleCollapse}
      >
        <Panel
          className="time-box"
          header={`${
            date
              ? `${moment(date).format('DD')}/${moment(date).format('MM')}`
              : 'Any Date'
          } ${from && to ? `${from} - ${to}` : ''}`}
          key="time"
        >
          <div className="timing__container">
            <Button className="close__btn" onClick={this.closeCollapse}>
              Close
            </Button>
            <div>
              <Icon
                type="close"
                className="timing__close"
                onClick={this.clearTimeDate}
              />
              <span className="selected__time">{`${
                date
                  ? `${moment(date).format('DD')}/${moment(date).format('MM')}`
                  : 'Any Date'
              } ${from && to ? `${from} - ${to}` : ''}`}</span>
            </div>
            <div>
              <Icon className="picker-icon date-icon" type="calendar" />
              <span className="date-title">Choose Date</span>
              <div className="date__container">
                <Button
                  className={`${!date &&
                    !dateVisible &&
                    'date__active'} timing-btn `}
                  onClick={this.handleDate}
                  name="any-date"
                >
                  Any Date
                </Button>
                <DatePicker
                  onOpenChange={this.toggleDatePopup}
                  allowClear={false}
                  className={`${date && 'active'} ${dateVisible &&
                    'active'} timing-btn picker choose__date-btn`}
                  onChange={this.handleDate}
                  placeholder="Choose Date"
                  dropdownClassName="calendar"
                  disabledDate={this.disabledDate}
                />
              </div>
            </div>
            <TimePicker
              closeCollapse={this.closeCollapse}
              handleOpenChange={this.handleOpenChange}
              handleTimePopover={this.handleTimePopover}
              timeVisible={timeVisible}
              toOpen={toOpen}
            />
          </div>
          <Button className="done__btn" onClick={this.handleDone}>
            Done
          </Button>
        </Panel>
      </Collapse>
    );
  }
}

const mapStateToProps = state => {
  const { searchQueries, services } = state;
  const { date, time } = searchQueries;
  const { from, to } = time;
  return {
    date,
    from,
    to,
    searchQueries,
    stores: services.stores,
    services: services.services,
  };
};

export default connect(mapStateToProps, { searchAction, filterServicesAction })(
  withRouter(TimeInput)
);
