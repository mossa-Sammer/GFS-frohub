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

  range = (start, end) => {
    const result = [];
    // eslint-disable-next-line no-plusplus
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  disabledHours = current => {
    const currentDate = moment().date();
    const selctedDate = moment(current).date();
    if (currentDate === selctedDate) {
      const hours = this.range(0, 60);
      hours.splice(moment().hour());
      return hours;
    }
    return null;
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
    const { time, searchAction: handleSearch, closeCollapse } = this.props;
    const { from } = time;
    const convertedTime = selectedToTime
      ? moment(selectedToTime)
          .startOf('hour')
          .format('HH:mm')
      : '';
    closeCollapse(null, () => {
      handleSearch({
        name: 'time',
        value: {
          from,
          to: convertedTime,
        },
      });
    });
  };

  render() {
    const {
      time,
      timeVisible,
      toOpen,
      handleOpenChange,
      handleTimePopover,
      date,
    } = this.props;

    return (
      <div className="time">
        <Icon className="picker-icon time-icon" type="clock-circle" />
        <span className="time-title">Choose Time</span>
        <div className="time__container">
          <Button
            className={`${!time.from && !timeVisible && 'active'} timing-btn`}
            onClick={this.handleTime}
          >
            Any Time
          </Button>
          <Popover
            className="time__popover"
            placement="bottom"
            visible={timeVisible}
            onClick={handleTimePopover}
            content={
              <Form className="time__duration-box" layout="inline">
                <Form.Item className="timing__form-item" label="From">
                  <TimePicker
                    format="HH:mm"
                    onChange={this.handleFromTime}
                    inputReadOnly
                    minuteStep={60}
                  />
                </Form.Item>
                <Form.Item className="timing__form-item to__time" label="To">
                  <TimePicker
                    format="HH:mm"
                    inputReadOnly
                    minuteStep={60}
                    onChange={this.handleToTime}
                    disabled={!time.from}
                    onOpenChange={handleOpenChange}
                    open={toOpen}
                    disabledHours={() => this.disabledHours(date)}
                  />
                </Form.Item>
              </Form>
            }
            trigger="click"
          >
            <Button
              className={`${time.from && 'active'} ${timeVisible &&
                'active'} timing-btn choose__time-btn`}
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
  const { time, date } = state.searchQueries;
  return {
    time,
    date,
  };
};

export default connect(mapStateToProps, { searchAction })(TimePickerCom);
