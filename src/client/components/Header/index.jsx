import React from 'react';
import { Row, Col } from 'antd';
import './index.scss';

export default class Header extends React.Component {
  render() {
    const {
      left = '', middle = '', right = '', color = '#f13b38'
    } = this.props;
    const rowConf = {
      justify: 'space-between',
    };
    return (
      <div className="header" style={{ backgroundColor: color }}>
        <Row {...rowConf}>
          <Col md={6} xs={6} className="left">
            {left}
          </Col>
          <Col md={12} xs={12} className="middle">
            {middle}
          </Col>
          <Col md={6} xs={6} className="right">
            {right || (
              <a href="/draven" className="home">
                主页
              </a>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
