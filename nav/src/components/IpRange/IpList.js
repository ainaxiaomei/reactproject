import React, { PropTypes } from 'react';
import { Table, Popconfirm, Pagination } from 'antd';

function IpList({
  total, current, loading, dataSource,
  onPageChange,
  onDeleteItem,
  onEditItem,
  }) {
  const columns = [{
    title: 'IP_Begin',
    dataIndex: 'ipBegin',
    key: 'ipBegin',
    render: (text) => <a href="#">{text}</a>,
  }, {
    title: 'IP_End',
    dataIndex: 'ipEnd',
    key: 'ipEnd',
  }, {
    title: 'Continent',
    dataIndex: 'continent',
    key: 'continent',
  }, {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },{
    title: 'Province',
    dataIndex: 'province',
    key: 'province',
  },{
    title: 'Isp',
    dataIndex: 'isp',
    key: 'isp',
  },{
    title: 'Action',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={() => onEditItem(record)}>编辑</a>
        &nbsp;
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
          <a>删除</a>
        </Popconfirm>
      </p>
    ),
  }];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={10}
        onChange={onPageChange}
      />
    </div>
  );
}

IpList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
};

export default IpList;
