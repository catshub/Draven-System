import { Button, Col, Divider, Layout, Row } from 'antd';
import Header from 'components/Header';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class Home extends React.Component {
  state = {
    login: false,
  };
  componentWillMount() {
    if (document.cookie && sessionStorage.getItem('zjh') && sessionStorage.getItem('name')) {
      this.setState({ login: true });
    }
  }
  // handleClick = target => {
  //   window.location.href = `${window.location.origin}/draven/${target}`;
  // };
  render() {
    const { Content } = Layout;
    const { login } = this.state;
    const headerConf = {
      middle: <div className="name">{(login && sessionStorage.name) || '游客'}</div>,
      right: <a href="/draven/login">{login ? '注销' : '登录'}</a>,
    };
    const rowConf = { type: 'flex', justify: 'space-around', className: 'functionrow' };
    const colConf = { span: 7, className: 'col' };
    return (
      <Layout>
        <Header {...headerConf} />
        <Content>
          <Row {...rowConf}>
            <Divider>常用功能</Divider>
            <Col {...colConf}>
              <a href="/draven/grade">
                <Button /* onClick={() => this.handleClick('grade')} */ disabled className="button-grade">
                  <span>🚫</span><s>成绩</s>
                </Button>
              </a>
            </Col>
            <Col {...colConf}>
              <a href="/draven/course">
                <Button /* onClick={() => this.handleClick('course')}  */ disabled={!login} className="button-course">
                  <span>📚</span>课程
                </Button>
              </a>
            </Col>
            <Col {...colConf}>
              <a href="/draven/classroom">
                <Button /* onClick={() => this.handleClick('classroom')} */ className="button-classroom">
                  <span>️🏫</span>教室
                </Button>
              </a>
            </Col>
          </Row>
          <Row {...rowConf}>
            <Divider>其他功能</Divider>
            <Col {...colConf}>
              <a href="/draven/takecourse">
                <Button
                  /* onClick={() => this.handleClick('takecourse')} */ disabled={!login}
                  className="button-takecourse"
                >
                  <span>☁️</span>抢课
                </Button>
              </a>
            </Col>
            <Col {...colConf}>
              <a href="/draven/bus">
                <Button /*  onClick={() => this.handleClick('bus')} */ className="button-bus">
                  <span>🚌</span>校车
                </Button>
              </a>
            </Col>
            <Col {...colConf}>
              <a href="/draven/calendar">
                <Button /* onClick={() => this.handleClick('calendar')} */ className="button-calendar">
                  <span>📅</span>校历
                </Button>
              </a>
            </Col>
          </Row>
          <Row {...rowConf}>
            <Divider>小工具</Divider>
            <Col {...colConf}>
              <a
                href="https://greasyfork.org/zh-CN/scripts/48259-使用四川大学教务系统导航栏"
                title="“使用教务系统导航栏”脚本"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="button-navigator">
                  <span>⚽</span>导航栏
                </Button>
              </a>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
const main = document.getElementById('main');
ReactDOM.render(<Home />, main);
