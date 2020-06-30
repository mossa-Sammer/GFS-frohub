import React from 'react';

import { Select } from 'antd';

const { Option } = Select;

const days = [
  { index: 0, name: 'Sunday' },
  { index: 1, name: 'Monday' },
  { index: 2, name: 'Tuesday' },
  { index: 3, name: 'Wednesday' },
  { index: 4, name: 'Thursday' },
  { index: 5, name: 'Friday' },
  { index: 6, name: 'Saturday' },
];

const DaySelect = ({ className, dayIndex, size, handleDayChange }) => {
  const handleFilter = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  return (
    <Select
      className={`day-select ${className}`}
      name="day"
      showSearch
      size={size}
      placeholder="day"
      optionFilterProp="children"
      filterOption={handleFilter}
      defaultValue={days[dayIndex]?.name}
      onChange={handleDayChange}
    >
      {days.map(day => (
        <Option key={day.index} value={day.index}>
          {day.name}
        </Option>
      ))}
    </Select>
  );
};

export { days };
export default DaySelect;
