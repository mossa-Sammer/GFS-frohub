import React from 'react';
import { Input, Select, Form } from 'antd';
import axios from 'axios';

const { Option } = Select;

class Address extends React.Component {
  state = {
    countries: [],
  };

  async componentDidMount() {
    const countriesData = await axios.get(
      'https://cors-anywhere.herokuapp.com/https://restcountries.eu/rest/v2/all?fields=name;alpha2Code'
    );
    this.setState({ countries: countriesData.data });
  }

  componentDidUpdate(prevProps) {
    const {
      form: { setFieldsValue },
      address,
    } = this.props;
    const { street, country, city, postalCode } = address;

    if (prevProps.address !== address) {
      setFieldsValue({
        street,
        country,
        city,
        postalCode,
      });
    }
  }

  handleFilter = (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { countries } = this.state;
    return (
      <Form>
        <div className="address">
          <Form.Item label="Address:">
            {getFieldDecorator('street', {
              rules: [
                { required: true, message: 'Please enter your street address' },
              ],
            })(<Input type="text" name="street" />)}
          </Form.Item>
          <Form.Item label="Town/City:">
            {getFieldDecorator('city', {
              rules: [
                { required: true, message: 'Please enter your town/city' },
              ],
            })(<Input type="text" name="city" />)}
          </Form.Item>
          <Form.Item label="Postcode:">
            {getFieldDecorator('postalCode', {
              rules: [
                { required: true, message: 'Please enter your postcode' },
              ],
            })(<Input type="text" name="postalCode" />)}
          </Form.Item>
          <Form.Item label="Country:">
            {getFieldDecorator('country', {
              rules: [{ required: true, message: 'Please enter your country' }],
            })(
              <Select
                name="country"
                showSearch
                placeholder="Country"
                optionFilterProp="children"
                filterOption={this.handleFilter}
              >
                {countries.map(c => (
                  <Option key={c.alpha2Code} value={c.alpha2Code}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </div>
      </Form>
    );
  }
}

const EnhancedForm = Form.create({
  name: 'address',
})(Address);

export default EnhancedForm;
