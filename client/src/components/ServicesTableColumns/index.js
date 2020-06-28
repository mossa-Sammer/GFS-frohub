/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Tag, Divider } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
    render: text => (
      <Tag color={text === 'active' ? 'green' : 'geekblue'}>{text}</Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Edit</a>
        <Divider type="vertical" />
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <a onClick={() => this.handleDelete(record.id)}>Delete</a>
      </span>
    ),
  },
];

export default columns;
