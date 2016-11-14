import React, { PropTypes } from 'react';
import {Modal,Table} from 'antd';
const DNSListModal = ({

  visible,
  dnsList = [],
  onOk,
  onCancel,
  sekectRows=[]
  }) => {
  function handleOk() {
    onOk(sekectRows);
  }

  const modalOpts = {
    title: 'DNS信息',
    visible,
    onOk: handleOk,
    onCancel,
  };

  const columns = [{
    title: 'Host',
    dataIndex: 'host',
    key: 'host'
  }, {
    title: 'Enabled',
    dataIndex: 'enabled',
    key: 'enabled',
  }];

  const rowSelection = {
  onChange(selectedRowKeys, selectedRows) {

    if(selectedRows.length > 0){
      sekectRows=[];
      sekectRows = selectedRows;
    }
    //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }

};

  return (
    <Modal {...modalOpts}>
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dnsList.data}
          pagination={false}
        />
    </div>
    </Modal>
  );
};

DNSListModal.propTypes = {
  visible: PropTypes.any,
  dnsList: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default DNSListModal;
