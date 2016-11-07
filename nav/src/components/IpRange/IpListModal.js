import React, { PropTypes } from 'react';
import { Form, Input, Modal } from 'antd';
import {isIP} from '../../services/commomService.js'
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const IpListModal = ({
  visible,
  item = {},
  onOk,
  onCancel,
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
    title: 'IP库信息',
    visible,
    onOk: handleOk,
    onCancel,
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem
          label="IP_Begin"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('ipBeginStr', {
            initialValue: item.ipBegin,
            rules: [
              { validator: checkIp },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label="IP_End"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('ipEndStr', {
            initialValue: item.ipEnd,
            rules: [
              { validator: checkIp },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label="Continent："
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('continent', {
            initialValue: item.continent,
            rules: [
              { required: true, message: 'Continent不能为空' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label="Country"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('country', {
            initialValue: item.country,
            rules: [
              { required: true, message: 'Country不能为空' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label="Province"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('province', {
            initialValue: item.province,
            rules: [
              { required: true, message: 'Province不能为空' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label="Isp"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('isp', {
            initialValue: item.continent,
            rules: [
              { required: true, message: 'Isp不能为空' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

IpListModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(IpListModal);
