import React from 'react';

import { TimePicker, Button } from 'antd';

import moment from 'moment';
import DaySelect from '../DaySelect';

import './style.css';

const OpeningTimes = ({ times, addMore }) => {
  const format = 'HH:mm';
  return (
    <div className="opening-times">
      {times.map(() => (
        <div className="opening-times__item">
          <DaySelect
            className="opening-times__item__day"
            // dayIndex={time.day}
          />
          <TimePicker
            className="opening-times__item__time"
            defaultValue={moment('12:08', format)}
            format={format}
          />
          <TimePicker
            className="opening-times__item__time"
            defaultValue={moment('12:02', format)}
            format={format}
          />
          <Button type="danger">Delete</Button>
        </div>
      ))}
      <Button type="primary" onClick={addMore}>
        +Add More
      </Button>
    </div>
  );
};

export default OpeningTimes;
