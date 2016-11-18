import React, { PropTypes } from 'react';
import { Icon,Upload,Table, Popconfirm, Pagination,Button,message} from 'antd';

function LocationRecoedList({
  total, current, loading, dataSource,
  onPageChange,
  onDeleteItem,
  onAddClick,
  onAddRecord,
  onDeleteDomain,
  onDeleteRecord
  }) {
  const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id'
  },{
    title: 'Domain',
    dataIndex: 'domain',
    key: 'domain'
  },
  {
    title: 'Data',
    dataIndex: 'data',
    key: 'data',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
  },
  {
    title: 'Enable',
    dataIndex: 'enable',
    key: 'enable',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },{
    title: 'Isp',
    dataIndex: 'isp',
    key: 'isp',
  },{
    title: 'Continent',
    dataIndex: 'continent',
    key: 'continent',
  }, {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  }, {
    title: 'Province',
    dataIndex: 'province',
    key: 'province',
  },{
    title: 'Action',
    key: 'operation',
    render: function(text, record){
      if(record.children){
        return(
          <p>
            <a onClick={() => onAddRecord(record)}>添加</a>
            &nbsp;
            <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteDomain(record)}>
              <a>删除</a>
            </Popconfirm>
          </p>
        );
      }else{
        return(
          <p>
            <a onClick={() => onEditRecord(record)}>编辑</a>
            &nbsp;
            <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteRecord(record)}>
              <a>删除</a>
            </Popconfirm>
          </p>
        );
      }

    }
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

 const rowSelection = {
 onChange(selectedRowKeys, selectedRows) {

   if(selectedRows.length > 0){
     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
   }

 }

};
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
        rowSelection={rowSelection}
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
    <Button style={{marginTop:'16px',marginButton:'16px'}} type="primary" >Sync</Button>&nbsp;&nbsp;
    <Upload name='file' action='/iplibrary/iprange/upload' onChange={uploadOnChange} accept='.csv'>
      <Button type="ghost" style={{marginTop:'16px',marginButton:'16px'}}>
        <Icon type="upload" /> Import
      </Button>
    </Upload>
    </div>
    </div>
  );
}

LocationRecoedList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onAddClick: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
};

export default LocationRecoedList;
