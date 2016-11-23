import React, { PropTypes } from 'react';
import { Icon,Upload,Table, Popconfirm, Pagination,Button,message} from 'antd';

function LocationRecoedList({
  total, current, loading, dataSource,
  onPageChange,
  onDeleteItem,
  onAddLocationRecord,
  onAddRRecordBatch,
  onAddRecord,
  onDeleteDomain,
  onDeleteRecord,
  onEditRecord,
  locationRecordListAcionMode,
  changeActionMode,
  locationRecordSelectedRows,
  onCloneLoactionRecord,
  onDeleteLoactionRecord
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
    dataIndex: 'continentText',
    key: 'continentText',
  }, {
    title: 'Country',
    dataIndex: 'countryText',
    key: 'countryText',
  }, {
    title: 'Province',
    dataIndex: 'provinceText',
    key: 'provinceText',
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



function handleAddClick(data){
  if(locationRecordListAcionMode == "BATCH"){
    onAddRRecordBatch(locationRecordSelectedRows);
  }else{
    onAddLocationRecord(data);
  }
}

function handleCloneClick(){
  onCloneLoactionRecord(locationRecordSelectedRows,"CLONE");
}

function handleDeleteClick(){
  onDeleteLoactionRecord(locationRecordSelectedRows);
}
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

   onSelect(record, selected, selectedRows) {

     if (selectedRows.length <= 0){
       changeActionMode("",[]);
     }else{
        changeActionMode("BATCH",selectedRows);
     }
   },

 onSelectAll(selected, selectedRows, changeRows) {
     if (selectedRows.length <= 0){
       changeActionMode("");
     }else{
        changeActionMode("BATCH",selectedRows);
     }
   },

   getCheckboxProps: record => ({
    disabled: record.id == undefined,    // Column configuration not to be checked
  }),

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
    <Button style={{marginTop:'16px',marginButton:'16px'}} type="primary" onClick={handleAddClick}>Add</Button>&nbsp;&nbsp;
    <Button style={{marginTop:'16px',marginButton:'16px'}} type="primary" >Sync</Button>&nbsp;&nbsp;
    <Button style={{marginTop:'16px',marginButton:'16px'}} type="primary" onClick={handleCloneClick} disabled={!(locationRecordListAcionMode == "BATCH")}>Clone</Button>&nbsp;&nbsp;
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
