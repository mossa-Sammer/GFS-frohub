/* eslint-disable no-return-assign, no-nested-ternary */
import React, { Component } from 'react';

import { Table } from 'antd';

import moment from 'moment';

import { Loading } from '../../../../components';

import { getFinance } from '../api';

import './style.css';
import './media.css';

export default class Finance extends Component {
  state = {
    hasFinance: false,
    stylistFinance: [],
    totalDeposited: 0,
    loading: true,
  };

  async componentDidMount() {
    const { hasFinance, stylistFinance } = await getFinance(2);
    this.setState({ loading: false });
    if (hasFinance) {
      let { totalDeposited } = this.state;
      await stylistFinance.map(
        finance => (totalDeposited += finance.collected_deposit)
      );
      this.setState({ stylistFinance, hasFinance, totalDeposited });
    }
  }

  render() {
    const { stylistFinance, hasFinance, totalDeposited, loading } = this.state;
    const columns = [
      {
        title: 'Jobs done',
        dataIndex: 'salon_service_id',
        key: 'salon_service_id',
      },
      {
        title: 'Deposit collected',
        dataIndex: 'collected_deposit',
        key: 'collected_deposit',
      },
    ];
    return (
      <div>
        <div className="finance__head">
          <h4>Total Earning through FroHub</h4>
          <span className="finance__total-deposite">€ {totalDeposited}</span>
        </div>
        {!loading ? (
          hasFinance && stylistFinance.length ? (
            stylistFinance.map(finance => {
              return (
                <div key={finance.salon_service_id}>
                  <div className="finance__container">
                    <span className="finance__done left">
                      {
                        moment(finance.done)
                          .format('MMMM/YYYY')
                          .split('/')[0]
                      }
                      &nbsp; &nbsp;
                      {
                        moment(finance.done)
                          .format('MMMM/YYYY')
                          .split('/')[1]
                      }
                    </span>
                    <span className="finance__done right">
                      € {finance.collected_deposit}
                    </span>
                  </div>
                  <div>
                    <Table
                      dataSource={[finance]}
                      columns={columns}
                      pagination={false}
                      className="finance__table"
                      rowKey={record => `${record.salon_service_id} service`}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <>No Finance</>
          )
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}
