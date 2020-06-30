/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Table, Form, Divider } from 'antd';

import Axios from '../../axios-config';
import { EditableCell, EditableContext } from '../TableEditCell';
import ServiceTypeForm from '../ServiceTypeForm';

import './style.css';

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingKey: '',
      services: [],
      name: '',
    };
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '50%',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    className="save-table-row-btn"
                    onClick={() => this.save(form, record.id)}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <a onClick={() => this.cancel(record.id)}>Cancel</a>
            </span>
          ) : (
            <>
              <a
                disabled={editingKey !== ''}
                onClick={() => this.edit(record.id)}
              >
                Edit
              </a>
              <span>
                <Divider type="vertical" />
                <a onClick={() => this.handleDelete(record.id)}>Delete</a>
              </span>
            </>
          );
        },
      },
    ];
  }

  async componentDidMount() {
    const {
      data: { data: services },
    } = await Axios.get('/admin/services');
    const normalizedData = this.normalizeData(services);
    this.setState({ services: normalizedData });
  }

  normalizeData = data => {
    return data.map(d => {
      const { service_id: serviceId, name, status } = d;
      return {
        id: serviceId,
        name,
        status,
      };
    });
  };

  handleAdd = async () => {
    const { services, name } = this.state;
    const clonedServices = [...services];
    try {
      const {
        data: { data: service },
      } = await Axios.post('/admin/services', { name, status: 'active' });
      this.setState({
        services: [...clonedServices, ...this.normalizeData([service])],
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleNameChange = ({ target }) => {
    const { value } = target;
    this.setState({ name: value });
  };

  handleDelete = async id => {
    const { services } = this.state;
    await Axios.delete(`/admin/services/${id}`);
    this.setState({ services: services.filter(s => s.id !== id) });
  };

  isEditing = record => {
    const { editingKey } = this.state;
    return record.id === editingKey;
  };

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save = (form, key) => {
    form.validateFields(async (error, row) => {
      if (error) {
        return;
      }
      const { services } = this.state;
      const newData = [...services];
      const index = newData.findIndex(item => key === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ services: newData, editingKey: '' });
        try {
          await Axios.put(`/admin/services/${key}`, {
            name: row.name,
            status: 'active',
          });
        } catch (e) {
          this.setState(prev => ({ services: prev.services, editingKey: '' }));
        }
      }
    });
  };

  edit = key => {
    this.setState({ editingKey: key });
  };

  render() {
    const { services, name } = this.state;
    const { form } = this.props;

    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={form}>
        <div>
          <h2>Service Type</h2>
          <ServiceTypeForm
            name={name}
            handleName={this.handleNameChange}
            handleSubmit={this.handleAdd}
          />
        </div>
        <Table
          components={components}
          bordered
          dataSource={services}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
          rowKey={record => record.id}
        />
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable;
