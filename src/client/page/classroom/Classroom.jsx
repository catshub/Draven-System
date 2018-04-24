import React from 'react';
import { notification, Button, Form, Input, message, Row, Col, Select, Modal } from 'antd';
import ReactDOM from 'react-dom';
import { fetchJSON } from '../../utils/fetchFunc';
import './classroom.scss';

class Classroom extends React.Component {
  state = {
    ApiBase: `${window.location.protocol}//${window.location.hostname}:${sessionStorage.port || 9000}`,
    jxlConfig: [],
    xldata: null,
    roomdata: null,
    editData: null,
  };
  componentWillMount() {
    const { ApiBase } = this.state;
    const that = this;
    const loaded = message.loading('获取教室信息...', 0);
    fetchJSON(`${ApiBase}/classroom`, { method: 'POST', body: JSON.stringify({ type: '/jxlConfig', query: '' }) }).then(jxlConfig => {
      loaded();
      that.setState({ jxlConfig });
    });
  }
  componentDidMount() {}
  formatJxlConfig = arr => {
    const arrSplit = (array, xqh) => array.filter(x => x.xqh === xqh).map((v, key) => Object.assign({}, v, { key }));
    return [{ name: '望江校区', data: arrSplit(arr, '01') }, { name: '华西校区', data: arrSplit(arr, '02') }, { name: '江安校区', data: arrSplit(arr, '03') }];
  };

  handleJxlClick = location => {
    const { ApiBase, jxlConfig } = this.state;
    const that = this;
    const loaded = message.loading('获取教室信息....', 0);
    fetchJSON(`${ApiBase}/classroom`, { method: 'POST', body: JSON.stringify({ type: '/XLRoomData', query: `jxlname=${location}` }) }).then(res => {
      loaded();
      that.setState({ xldata: res.xldata, roomdata: res.roomdata, editData: jxlConfig.find(x => x.location === location) });
    });
  };
  handleClassClick = (index, classData) => {
    notification[classData.use === '1' ? 'warning' : 'success']({
      message: '课程信息',
      description:
        classData.use === '1' ? (
          <div>
            <p>课程名：{classData.kcm}</p>
            <p>节次：{index + 1}</p>
            <p>教师：{classData.jsm}</p>
          </div>
        ) : (
          '空闲'
        ),
    });
  };
  render() {
    const {
      xldata, roomdata, modalData, editData
    } = this.state;
    const jxlArr = this.formatJxlConfig(this.state.jxlConfig);
    console.log(jxlArr);
    return (
      <div>
        {!roomdata ? (
          <div className="jxlContainer">
            {jxlArr.map(x => (
              <div>
                <h3>{x.name}</h3>
                <Row className="jxlRow" type="flex" justify="space-between">
                  {x.data.map(y => (
                    <Col span={5} xs={7}>
                      <Button className="jxlButton" onClick={() => this.handleJxlClick(y.location)}>
                        {y.name}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="classRow" style={{ marginTop: '10px' }}>
              <Select
                style={{ width: '200px' }}
                defaultValue={editData.name}
                onChange={value => this.handleJxlClick(value)}
                dropdownMatchSelectWidth={false}
                placeholder="选择教学楼"
              >
                {jxlArr.map(x => (
                  <Select.OptGroup label={x.name}>{x.data.map(y => <Select.Option value={y.location}>{y.name}</Select.Option>)}</Select.OptGroup>
                ))}
              </Select>
            </div>
            <Row className="classRow">
              <Col span={2} xs={3} className="classCol">
                教室
              </Col>
              <Col span={22} xs={21} className="classCol">
                {['一', '二', '三', '四', '五'].map(x => (
                  <Col span={4}>
                    {x}大节
                  </Col>
                ))}
              </Col>
            </Row>
            {roomdata.map(x => (
              <Row className="classRow">
                <Col span={2} xs={3} className="classCol">
                  {x.roomName}
                </Col>
                <Col span={22} xs={21} className="classCol">
                  {x.classUse.map((y, index) => (
                    <Col span={4}>
                      <Button type={y.use === '1' ? 'danger' : ''} className={`classButton${y.use}`} onClick={() => this.handleClassClick(index, y)}>
                        {y.kcm || '空闲'}
                      </Button>
                    </Col>
                  ))}
                </Col>
              </Row>
            ))}
          </div>
        )}
      </div>
    );
  }
}
const main = document.getElementById('main');
ReactDOM.render(<Classroom />, main);
