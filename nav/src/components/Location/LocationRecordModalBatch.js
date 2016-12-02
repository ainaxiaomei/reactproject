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

const LocationRecordModalBatch = ({
  visible,
  item = {},
  onOk,
  onCancel,
  state,
  region,
  ipListSearch,
  changeCountryList,
  changeProvinceList,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields,

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

      if(obj && obj.length > 0){
        const newData = {...data,isp:obj[0].abbreviation};
        onOk(newData);
      }else{
        onOk(data);
      }


    });
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

const contonentOptions = [];
for (let i = 0; i < region.length; i++) {
contonentOptions.push(<Option key={region[i].value}>{region[i].label}</Option>);
//console.log(isp[i].abbreviation);
}

const countryOption = [];
for (let i = 0; i < ipListSearch.country.length; i++) {
countryOption.push(<Option key={ipListSearch.country[i].value}>{ipListSearch.country[i].label}</Option>);
//console.log(isp[i].abbreviation);
}

const provinceOption = [];
for (let i = 0; i < ipListSearch.province.length; i++) {
provinceOption.push(<Option key={ipListSearch.province[i].value}>{ipListSearch.province[i].label}</Option>);
//console.log(isp[i].abbreviation);
}

function checkData(rule, value, callback) {
  var re = /([0-9]:[0-9];)+/;
  if (re.test(value)) {
    callback(new Error('Data不合法'));
  } else {
    callback();
  }
}

function handleContinentChange(value){
  changeCountryList(value);
  //清空国家和省份
  resetFields(["country","province"]);
}

function handleCountryChange(value){
  changeProvinceList(value);
  //清空省份
  resetFields(["province"]);
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
            initialValue: item.domain,
            rules: [
              { required: true, message: 'Domain不能为空' },
            ],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          label="Type"
          hasFeedback
          {...formItemLayout}
          style={{display:item.type == "CLONE" ? 'none': ''}}
        >
          {getFieldDecorator('type', {
            initialValue: "",
            rules: [
            ],
          })(
            <Select>
              <Option value="A">A</Option>
              <Option value="CNAME">CNAME</Option>
              <Option value="MX" >MX</Option>
              <Option value="TXT">TXT</Option>
              <Option value="SRV">SRV</Option>
              <Option value="AAAA">AAAA</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'Continent'}
        >
          {getFieldDecorator('continent')(
            <Select onChange={handleContinentChange}>{contonentOptions}</Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'Country'}
        >
          {getFieldDecorator('country')(
            <Select onChange={handleCountryChange}>{countryOption}</Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={'Province'}
        >
          {getFieldDecorator('province')(
              <Select >{provinceOption}</Select>
          )}
        </FormItem>
        <FormItem
          label="ISP"
          hasFeedback
          {...formItemLayout}
          style={{display:item.type == "CLONE" ? 'none': ''}}
        >
          {getFieldDecorator('isp', {
            initialValue: "",
            rules: [
            ],
          })(
            <Select onSelect={handleSelect}>{children}</Select>
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
              { required:  item.type == "CLONE" ? false: true, message: 'Data不能为空' },
            ],
          })(
              <Input type="text" />
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

LocationRecordModalBatch.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(LocationRecordModalBatch);
