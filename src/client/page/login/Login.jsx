import React from 'react';
import { Button, Form, Input, message, Row } from 'antd';
import ReactDOM from 'react-dom';
import './login.scss';

@Form.create()
class Login extends React.Component {
  componentWillMount() {
    sessionStorage.setItem('port', 9000);
  }
  handleSubmit = e => {
    e.preventDefault();
    const { getFieldValue: GV } = this.props.form;
    const { protocol, hostname } = window.location;
    this.props.form.validateFields(err => {
      if (!err) {
        fetch(`${protocol}//${hostname}:${sessionStorage.port || 9000}/loginAction`, {
          method: 'post',
          body: JSON.stringify({ zjh: GV('zjh'), mm: GV('mm') }),
          credentials: 'include',
        })
          .then(res => res.text())
          .then(response => {
            if (response !== '登录失败') {
              const resData = typeof response === 'object' ? response : JSON.parse(response);
              if (resData.cookie) {
                message.success(`登录成功,欢迎${resData.name}`);
                sessionStorage.setItem('zjh', Number(GV('zjh')));
                sessionStorage.setItem('mm', GV('mm'));
                sessionStorage.setItem('name', resData.name);
                window.location.href = `${window.location.origin}/draven`;
              } else message.warning('登录失败');
            } else message.warning(response);
          })
          .catch(error => message.warning(error));
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const itemLayout = { /* labelCol: { xs: 2 }, */ wrapperCol: { span: 12 }, className: 'item' };
    return (
      <Row type="flex" justify="center">
        <Form onSubmit={this.handleSubmit} className="form">
          <Form.Item label="学号" {...itemLayout}>
            {getFieldDecorator('zjh', {
              rules: [{ required: true, message: '请输入学号！' }],
            })(<Input placeholder="请输入学号" />)}
          </Form.Item>
          <Form.Item label="密码" {...itemLayout}>
            {getFieldDecorator('mm', {
              rules: [{ required: true, message: '请输入密码！' }],
            })(<Input type="password" placeholder="请输入密码" />)}
          </Form.Item>
          <Form.Item >
            <Button htmlType="submit">登录</Button>
          </Form.Item>
        </Form>
      </Row>
    );
  }
}
const main = document.getElementById('main');
ReactDOM.render(<Login />, main);
