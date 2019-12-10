import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Popover, TimePicker, Form, Icon } from 'antd';
import moment from 'moment';

import searchAction from '../search.actions';

class TimePickerCom extends Component {
  handleTime = () => {
    const { searchAction: handleSearch } = this.props;
    handleSearch({
      name: 'time',
      value: '',
    });
  };

  handleFromTime = selectedFromTime => {
    const { searchAction: handleSearch } = this.props;
    const convertedTime = selectedFromTime
      ? moment(selectedFromTime)
          .startOf('hour')
          .format('HH:mm')
      : '';
    handleSearch({
      name: 'time',
      value: {
        from: convertedTime,
        to: '',
      },
    });
  };

  handleToTime = selectedToTime => {
    const { time, searchAction: handleSearch } = this.props;
    const { from } = time;
    const convertedTime = selectedToTime
      ? moment(selectedToTime)
          .startOf('hour')
          .format('HH:mm')
      : '';
    handleSearch({
      name: 'time',
      value: {
        from,
        to: convertedTime,
      },
    });
  };

  render() {
    const { time } = this.props;
    return (
      <div className="time">
        <Icon className="picker-icon time-icon" type="clock-circle" />
        <span className="time-title">Choose Time</span>
        <div className="time__container">
          <Button
            className={`${!time.from && 'active'} timing-btn`}
            onClick={this.handleTime}
          >
            Any Time
          </Button>
          <Popover
            className="time__popover"
            placement="bottom"
            content={
              <Form className="time__duration-box" layout="inline">
                <Form.Item className="timing__form-item" label="From">
                  <TimePicker format="HH" onChange={this.handleFromTime} />
                </Form.Item>
                <Form.Item className="timing__form-item" label="To">
                  <TimePicker
                    format="HH"
                    onChange={this.handleToTime}
                    disabled={!time.from}
                  />
                </Form.Item>
              </Form>
            }
            trigger="click"
          >
            <Button
              className={`${time.from && 'active'} timing-btn choose__time-btn`}
              onClick={this.handleOpenPicker}
            >
              Choose Time
            </Button>
          </Popover>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { time } = state.searchQueries;
  return {
    time,
  };
};

export default connect(mapStateToProps, { searchAction })(TimePickerCom);
