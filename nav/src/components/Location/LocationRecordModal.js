import React, { PropTypes } from 'react';
import { Form, Input, Modal,Cascader,Select } from 'antd';
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

const LocationRecordModal = ({
  visible,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    },
    isps,
    regions
  }) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = { ...getFieldsValue(), key: item.key };
      //将ips的code转化为abbreviation
      const obj = isps.filter((item)=>{
        return item.code == data.isp;
      });
      const newData = {...data,isp:obj[0].abbreviation};
      onOk(newData);
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
    title: '调度信息',
    visible,
    onOk: handleOk,
    onCancel,
  };


//Option key或者vlue相同会报错，不能直接把abbreviation赋值给key或者value
const Option = Select.Option;
const children = [];
if(isps){
  for (let i = 0; i < isps.length; i++) {
      children.push(<Option key={isps[i].code}>{isps[i].chineseName}</Option>);
  //console.log(isp[i].abbreviation);
  }
}

function handleSelect(value,options){
}
  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem
          label="Domain"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('domain', {
            initialValue: item.ipBegin,
            rules: [
              { validator: checkIp },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label="IP"
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
          label="Type"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('type', {
            initialValue: item.ipEnd,
            rules: [
              { validator: checkIp },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label="Geo"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('geo', {
            initialValue: item.continent,
          })(
            <Cascader   options={regions} changeOnSelect  />
          )}
        </FormItem>
        <FormItem
          label="ISP"
          hasFeedback
          {...formItemLayout}
        >
          {getFieldDecorator('isp', {
            initialValue: "",
            rules: [
              { required: true, message: 'Isp不能为空' },
            ],
          })(
            <Select onSelect={handleSelect}>{children}</Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

LocationRecordModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(LocationRecordModal);
