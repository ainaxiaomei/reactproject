import { Form, Row, Col, Input, Button, Icon,Select } from 'antd';
import React, { PropTypes } from 'react';
import {isIP} from '../../services/commomService.js'
const FormItem = Form.Item;

const usualShowedChildren = 1 * 3; // row * col
const LocationSearch = Form.create()(React.createClass({
  getInitialState() {
    return {
      expand: false,
    };
  },
  handleSearch(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const data = { ...this.props.form.getFieldsValue() };
      //将ips的code转化为abbreviation
      const obj = this.props.isps.filter((item)=>{
        return item.code == data.isp;
      });
      if(obj && obj.length > 0){
        const newData = {...data,isp:obj[0].abbreviation};
          this.props.query(newData);
      }else{
          this.props.query(data);
      }



    });
  },
  handleReset() {
    this.props.form.resetFields();
  },
  handleContinentChange(value){
    this.props.changeCountryList(value);
    //清空国家和省份
    this.props.form.resetFields(["country","province"]);
  },
  handleCountryChange(value){
    this.props.changeProvinceList(value);
    //清空省份
    this.props.form.resetFields(["province"]);
  },
  toggle(expand) {
    this.setState({ expand });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    const Option = Select.Option;
    const ispOption = [];
    for (let i = 0; i < this.props.isps.length; i++) {
    ispOption.push(<Option key={this.props.isps[i].code}>{this.props.isps[i].chineseName}</Option>);
    //console.log(isp[i].abbreviation);
    }

    const contonentOptions = [];
    for (let i = 0; i < this.props.regions.length; i++) {
    contonentOptions.push(<Option key={this.props.regions[i].value}>{this.props.regions[i].label}</Option>);
    //console.log(isp[i].abbreviation);
    }

    const countryOption = [];
    for (let i = 0; i < this.props.ipListSearch.country.length; i++) {
    countryOption.push(<Option key={this.props.ipListSearch.country[i].value}>{this.props.ipListSearch.country[i].label}</Option>);
    //console.log(isp[i].abbreviation);
    }

    const provinceOption = [];
    for (let i = 0; i < this.props.ipListSearch.province.length; i++) {
    provinceOption.push(<Option key={this.props.ipListSearch.province[i].value}>{this.props.ipListSearch.province[i].label}</Option>);
    //console.log(isp[i].abbreviation);
    }

    const formItems= [
      <Col span={8} key='domain'>
        <FormItem
          {...formItemLayout}
          label={'Domain'}
        >
          {getFieldDecorator('domain')(
            <Input placeholder="placeholder" />
          )}
        </FormItem>
      </Col>,
      <Col span={8} key='ips'>
        <FormItem
          {...formItemLayout}
          label={'Record'}
        >
          {getFieldDecorator('ips')(
            <Input placeholder="placeholder" />
          )}
        </FormItem>
      </Col>,
      <Col span={8} key='type'>
        <FormItem
          {...formItemLayout}
          label={'Type'}
        >
          {getFieldDecorator('type')(
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
      </Col>,
      <Col span={8} key='isp'>
        <FormItem
          {...formItemLayout}
          label={'ISP'}
        >
          {getFieldDecorator('isp')(
            <Select >{ispOption}</Select>
          )}
        </FormItem>
      </Col>,
      <Col span={8} key='continent'>
        <FormItem
          {...formItemLayout}
          label={'Continent'}
        >
          {getFieldDecorator('continent')(
            <Select onChange={this.handleContinentChange}>{contonentOptions}</Select>
          )}
        </FormItem>
      </Col>,
      <Col span={8} key='country'>
        <FormItem
          {...formItemLayout}
          label={'Country'}
        >
          {getFieldDecorator('country')(
            <Select onChange={this.handleCountryChange}>{countryOption}</Select>
          )}
        </FormItem>
      </Col>,
      <Col span={8} key='province'>
        <FormItem
          {...formItemLayout}
          label={'Province'}
        >
          {getFieldDecorator('province')(
              <Select >{provinceOption}</Select>
          )}
        </FormItem>
      </Col>


    ]
    const expand = this.state.expand;
    const showedChildren = expand ? formItems.length : usualShowedChildren;
    return (
      <Form
        horizontal
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>
          {formItems.slice(0, showedChildren)}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">Search</Button>
            <Button onClick={this.handleReset}>Clear</Button>
            {
              expand ? (
                <a className="ant-dropdown-link" onClick={() => this.toggle(false)}>
                  Collapse <Icon type="up" />
                </a>
              ) : (
                <a className="ant-dropdown-link" onClick={() => this.toggle(true)}>
                  Expand <Icon type="down" />
                </a>
              )
            }
          </Col>
        </Row>
      </Form>
    );
  },
}));

export default LocationSearch;
