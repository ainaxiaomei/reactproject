import React, { PropTypes } from 'react';
import { Form, Input, Modal,Cascader,Select } from 'antd';
import {isIP} from '../../services/commomService.js'
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const RRecordModal = ({
  visible,
  item = {},
  onOk,
  onCancel,
  state,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    },
  }) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = { ...getFieldsValue(), key: item.key };
      onOk(data);
    });
  }

  function checkIp(rule, value, callback) {
    if (!isIP(value)) {
      callback(new Error('IP地址不合法'));
    } else {
      callback();
    }
  }



  const modalOpts = {
    title: '添加调度记录',
    visible,
    onOk: handleOk,
    onCancel,
  };
  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem style={{display:'none'}}
          label="RecordId"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('recordId', {
            initialValue: item.recordId,
            rules: [
            ],
          })(
              <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label="Data"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('ipList', {
            initialValue: "",
            rules: [
              { required: true, message: 'IP地址不能为空' },
            ],
          })(
              <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label="Enable"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('enabled', {
            initialValue: item.enabled == undefined ? "true" : item.enabled,
            rules: [
            ],
          })(
            <Select >
             <Option value="true">true</Option>
             <Option value="false">false</Option>
             </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

RRecordModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(RRecordModal);
