import React from 'react';
import { Layout, Button, Form, Input, message, Row, Col, Divider } from 'antd';
import ReactDOM from 'react-dom';
import { fetchJSON } from '../../utils/fetchFunc';
// import './Classroom.scss';

const init = (obj = {}) =>
  Object.assign(
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
    obj
  );
class Classroom extends React.Component {
  state = {
    ApiBase: `${window.location.protocol}//${window.location.hostname}:${sessionStorage.port || 9000}`,
    jxlConfig: [],
    xldata: [],
    roomdata: [],
  };
  componentWillMount() {
    const { ApiBase } = this.state;
    const that = this;
    const loaded = message.loading('获取教室信息...', 0);
    fetchJSON(`${ApiBase}/classroom`, init({ body: JSON.stringify({ type: '/jxlConfig', query: '' }) }))
      .then(jxlConfig => that.setState({ jxlConfig }))
      .finally(loaded);
  }
  componentDidMount() {
    // const { ApiBase } = this.state;
    // const that = this;
    // const loaded = message.loading('获取教室信息2...', 0);
    // fetchJSON(`${ApiBase}/classroom`, init({ body: JSON.stringify({ type: '/XLRoomData', query: 'jxlname=WJdong2' }) }))
    //   .then(xldata => that.setState({ xldata }))
    //   .finally(loaded);
  }
  formatJxlConfig = arr => [arr.filter(x => x.xqh === '01'), arr.filter(x => x.xqh === '02'), arr.filter(x => x.xqh === '03')];

  handleJxlClick = query => {
    const { ApiBase } = this.state;
    const that = this;
    const loaded = message.loading('获取教室信息....', 0);
    fetchJSON(`${ApiBase}/classroom`, init({ body: JSON.stringify({ type: '/XLRoomData', query: `jxlname=${query}` }) }))
      .then(res => that.setState({ xldata: res.xldata, roomdata: res.roomdata }))
      .finally(loaded);
  };
  render() {
    const jxlArr = this.formatJxlConfig(this.state.jxlConfig);
    return <div>{jxlArr.map(x => <Row>{x.map(y => <Button>{y.name}</Button>)}</Row>)}</div>;
  }
}
const main = document.getElementById('main');
ReactDOM.render(<Classroom />, main);
