import React from 'react';
import { Input, Select, Form } from 'antd';

const { Option } = Select;

const Address = ({ countries }) => {
  const handleFilter = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  return (
    <div className="address">
      <Form.Item label="Street">
        <Input type="text" name="street" />
      </Form.Item>
      <Form.Item label="City">
        <Input type="text" name="city" />
      </Form.Item>
      <Form.Item label="Postal Code">
        <Input type="text" name="postalCode" />
      </Form.Item>
      <Form.Item label="Country">
        <Select
          name="country"
          showSearch
          placeholder="Country"
          optionFilterProp="children"
          filterOption={handleFilter}
        >
          {countries.map(c => (
            <Option key={c.alpha2Code} value={c.alpha2Code}>
              {c.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default Address;
