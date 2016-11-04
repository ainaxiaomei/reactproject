import React, { PropTypes } from 'react';
import { Icon,Upload,Table, Popconfirm, Pagination,Button } from 'antd';

function IpList({
  total, current, loading, dataSource,
  onPageChange,
  onDeleteItem,
  onAddClick
  }) {
  const columns = [{
    title: 'IP_Begin',
    dataIndex: 'ipBeginStr',
    key: 'ipBeginStr'
  }, {
    title: 'IP_End',
    dataIndex: 'ipEndStr',
    key: 'ipEndStr',
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
        <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record)}>
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
      <div>
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={10}
        onChange={onPageChange}
      />
    <Button style={{marginTop:'16px',marginButton:'16px'}} type="primary" onClick={onAddClick}>Add</Button>&nbsp;&nbsp;
    <Button style={{marginTop:'16px',marginButton:'16px'}} type="primary" >Sync</Button>&nbsp;&nbsp;
    <Upload >
      <Button type="ghost" style={{marginTop:'16px',marginButton:'16px'}}>
        <Icon type="upload" /> Import
      </Button>
    </Upload>
    </div>
    </div>
  );
}

IpList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onAddClick: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
};

export default IpList;
