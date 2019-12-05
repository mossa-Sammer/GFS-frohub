import React, { Component } from 'react';
import {
  Collapse,
  Button,
  DatePicker,
  Icon,
  Popover,
  TimePicker,
  Form,
} from 'antd';

import moment from 'moment';

const { Panel } = Collapse;
export default class TimeInput extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    pickerOpen: false,
    selectedValue: 'Any Date',
  };

  handleOpenPicker = () => this.setState({ pickerOpen: true });

  handleAnyTime = () => this.setState({ selectedValue: 'Any Date' });

  handleChange = selectedDate => {
    const { pickerOpen } = this.state;
    const convertedDate = moment(selectedDate).format('YYYY-MM-DD');
    this.setState({
      selectedValue: convertedDate,
      pickerOpen: !pickerOpen,
    });
  };

  handleTime = (selectedFromTime, string) => {
    console.log(999999999999);
    // console.log(444444, moment(selectedFromTime).format('LT'));
    // console.log(777, selectedFromTime);
  };

  render() {
    const { pickerOpen, selectedValue } = this.state;
    return (
      <Collapse accordion expandIcon={() => <Icon type="calendar" />}>
        <Panel header={selectedValue}>
          <div className="date__container">
            <Button onClick={this.handleAnyTime}>Any Date</Button>
            <Popover
              placement="rightTop"
              content={
                pickerOpen && <DatePicker onChange={this.handleChange} />
              }
              trigger="click"
            >
              <Button onClick={this.handleOpenPicker}>Choose Date</Button>
            </Popover>
          </div>
          <div className="time__container">
            <Button onClick={this.handleAnyTime}>Any Time</Button>
            <Popover
              placement="bottom"
              content={
                <Form className="time__duration-box" layout="inline">
                  <Form.Item label="From">
                    <TimePicker
                      defaultValue={moment('12:00', 'HH:mm')}
                      format="HH:mm"
                      onChange={this.handleFromTime}
                    />
                  </Form.Item>
                  <Form.Item label="To">
                    <TimePicker
                      defaultValue={moment('12:00', 'HH:mm')}
                      format="HH:mm"
                      onChange={this.handleTime}
                    />
                  </Form.Item>
                </Form>
              }
              trigger="click"
            >
              <Button onClick={this.handleOpenPicker}>Choose Time</Button>
            </Popover>
          </div>
        </Panel>
      </Collapse>
    );
  }
}
