import React from 'react';
import { Layout, Button, Row, Col } from 'antd';
import ReactDOM from 'react-dom';
import './index.scss';

class Home extends React.Component {
  componentWillMount() {
    if (!document.cookie || !sessionStorage.getItem('zjh') || !sessionStorage.getItem('name')) {
      window.location.href = `${window.location.origin}/draven/login`;
    }
  }
  handleClick = target => {
    window.location.href = `${window.location.origin}/draven/${target}`;
  };
  render() {
    const {
      Header, Content
    } = Layout;
    const zjh = sessionStorage.getItem('zjh');
    const name = sessionStorage.getItem('name');
    const rowConf = { type: 'flex', justify: 'space-around', style: { padding: '10px 0' } };
    const colConf = { span: 7, className: 'col' };
    return (
      <Layout>
        <Header className="header">
          <strong>{name}</strong>
          <span>{zjh}</span>
        </Header>
        <Content>
          <Row {...rowConf}>
            <Col {...colConf}>
              <Button onClick={() => this.handleClick('grade')} className="button-grade">
                <span>📋</span>成绩
              </Button>
            </Col>
            <Col {...colConf}>
              <Button onClick={() => this.handleClick('classroom')} className="button-classroom">
                <span>️🏫</span>教室
              </Button>
            </Col>
            <Col {...colConf}>
              <Button onClick={() => this.handleClick('course')} className="button-course">
                <span>📚</span>课程
              </Button>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
const main = document.getElementById('main');
ReactDOM.render(<Home />, main);
