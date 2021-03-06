import React, { PropTypes } from 'react';
import { Icon,Upload,Table, Popconfirm, Pagination,Button,message} from 'antd';

function IpList({
  total, current, loading, dataSource,
  onPageChange,
  onDeleteItem,
  onAddClick,
  onSyncClick,
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

 function uploadOnChange(info){
   if (info.file.status !== 'uploading') {
      console.log('uploading...');
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
 }
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
        showTotal={total => `Total ${total}`}
        current={current}
        pageSize={10}
        onChange={onPageChange}
      />
    <Button style={{marginTop:'16px',marginButton:'16px'}} type="primary" onClick={onAddClick}>Add</Button>&nbsp;&nbsp;
    <Button style={{marginTop:'16px',marginButton:'16px'}} type="primary" onClick={onSyncClick}>Sync</Button>&nbsp;&nbsp;
    <Upload name='file' action='/iplibrary/iprange/upload' onChange={uploadOnChange} accept='.csv'>
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
