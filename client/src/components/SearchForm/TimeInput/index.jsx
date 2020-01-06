/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse, Button, DatePicker, Icon } from 'antd';

import moment from 'moment';
import TimePicker from './TimePicker';
import searchAction from '../search.actions';

import './style.css';
import './media.css';

const { Panel } = Collapse;
class TimeInput extends Component {
  state = {
    visible: false,
    timeVisible: false,
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
    const { visible, timeVisible, toOpen } = this.state;

    const fromTime = moment(from, 'hh:mm').format('LT');
    const toTime = moment(to, 'hh:mm').format('LT');
    return (
      <Collapse
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
          } ${from && to ? `${fromTime} - ${toTime}` : ''}`}
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
              } ${from && to ? `${fromTime} - ${toTime}` : ''}`}</span>
            </div>
            <div>
              <Icon className="picker-icon date-icon" type="calendar" />
              <span className="date-title">Choose Date</span>
              <div className="date__container">
                <Button
                  className={`${!date && 'date__active'} timing-btn `}
                  onClick={this.handleDate}
                >
                  Any Date
                </Button>
                <DatePicker
                  allowClear={false}
                  className={`${date &&
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
          <div
            onClick={this.closeCollapse}
            className="time__background"
            role="button"
            tabIndex={-1}
            label="time-background"
          />
        </Panel>
      </Collapse>
    );
  }
}

const mapStateToProps = state => {
  const { date, time } = state.searchQueries;
  const { from, to } = time;
  return {
    date,
    from,
    to,
  };
};

export default connect(mapStateToProps, { searchAction })(TimeInput);
