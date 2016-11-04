import { Form, Row, Col, Input, Button, Icon } from 'antd';
import React, { PropTypes } from 'react';
import {isIP} from '../../services/commomService.js'
import './IpSerach.less'
const FormItem = Form.Item;

const usualShowedChildren = 1 * 3; // row * col
const IpSearch = Form.create()(React.createClass({
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

      console.log('Received values of form: ', values);
    });
  },
  handleReset() {
    this.props.form.resetFields();
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

    const fieldName = ['IP_Begin','IP_End','Contonent','Country','Province','Isp'];

    // To generate mock Form.Item
    const children = [];
    for (let i = 0; i < 6; i++) {
      children.push(
        <Col span={8} key={i}>
          <FormItem
            {...formItemLayout}
            label={fieldName[i]}
          >
            {getFieldDecorator(fieldName[i])(
              <Input placeholder="placeholder" />
            )}
          </FormItem>
        </Col>
      );
    }

    const expand = this.state.expand;
    const showedChildren = expand ? children.length : usualShowedChildren;
    return (
      <Form
        horizontal
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>
          {children.slice(0, showedChildren)}
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

export default IpSearch;
