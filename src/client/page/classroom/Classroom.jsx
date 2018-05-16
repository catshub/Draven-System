import React from 'react';
import { Button, message, Row, Col, Select } from 'antd';
import ReactDOM from 'react-dom';
import Header from 'components/Header';
import { fetchJSON } from 'utils/fetchFunc';
import { ApiBase } from 'utils/common';
import './classroom.scss';

class Classroom extends React.Component {
  state = {
    jxlConfig: [],
    xldata: null,
    roomdata: null,
    editData: null,
  };
  componentWillMount() {
    // const { ApiBase } = this.state;
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
    return [
      { name: '江安校区', data: arrSplit(arr, '03'), key: 3 },
      { name: '望江校区', data: arrSplit(arr, '01'), key: 1 },
      { name: '华西校区', data: arrSplit(arr, '02'), key: 2 },
    ];
  };
  handleFixedSelector = () => {
    window.onscroll = () => {
      if (document.getElementById('fixedSelector')) {
        const width = document.documentElement.clientWidth < 768 ? 70 : 80;
        const css = document.getElementById('fixedSelector').classList;
        if (window.pageYOffset > width && !css.contains('fixedSelector')) {
          css.add('fixedSelector');
          console.log('add class...');
        } else if (window.pageYOffset <= width && css.contains('fixedSelector')) {
          css.remove('fixedSelector');
          console.log('remove class...');
        }
      }
    };
    console.log('add onscroll...');
  };
  handleJxlClick = location => {
    const { jxlConfig } = this.state;
    const that = this;
    const loaded = message.loading('获取教室信息....', 0);
    fetchJSON(`${ApiBase}/classroom`, {
      method: 'POST',
      body: JSON.stringify({ type: '/XLRoomData', query: `jxlname=${location}` }),
    }).then(res => {
      loaded();
      that.setState(
        {
          xldata: res.xldata,
          roomdata: res.roomdata,
          editData: jxlConfig.find(x => x.location === location),
        },
        window.onscroll ? () => {} : that.handleFixedSelector
      );
    });
  };
  handleClassClick = (index, classData) => {
    message.info(
      classData.use === '1' ? (
        <div>
          <p>课程：{classData.kcm}</p>
          <p>节次：{index + 1}</p>
          <p>教师：{classData.jsm}</p>
        </div>
      ) : (
        '空闲'
      ),
      2
    );
  };
  render() {
    const { xldata, roomdata, editData } = this.state;
    const jxlArr = this.formatJxlConfig(this.state.jxlConfig);
    const headerConf = {
      color: '#1cb3cc',
      left: (
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => this.setState({ xldata: null, editData: null, roomdata: null })}
        >
          教室信息
        </span>
      ),
      middle: roomdata && (
        <div id="fixedSelector">
          <Select
            defaultValue={editData.name}
            className="selector"
            showArrow={false}
            onChange={value => this.handleJxlClick(value)}
            dropdownMatchSelectWidth={false}
            placeholder="选择教学楼"
            dropdownClassName="dropdown"
          >
            {jxlArr.map(x => (
              <Select.OptGroup label={x.name}>
                {x.data.map(y => <Select.Option value={y.location}>{y.name}</Select.Option>)}
              </Select.OptGroup>
            ))}
          </Select>
        </div>
      ),
    };
    return (
      <div>
        <Header {...headerConf} />
        {!roomdata ? (
          <div className="jxlContainer">
            {jxlArr.map(x => (
              <div key={x.key} className={`xq${x.key}`}>
                <div className="xqname">{x.name}</div>
                <Row type="flex" justify="space-between">
                  {x.data.map(y => (
                    <Col span={5} xs={7} key={y.location}>
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
            <Row className="classRow classHeader">
              <Col span={2} xs={3} className="classCol">
                教室
              </Col>
              <Col span={22} xs={21} className="classCol">
                {['一', '二', '三', '四', '五'].map(x => <Col span={4}>{x}大节</Col>)}
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
                      <Button
                        type={y.use === '1' ? 'danger' : ''}
                        className={`classButton${y.use}`}
                        onClick={() => this.handleClassClick(index, y)}
                      >
                        {(y.kcm && y.kcm === '师生借用' ? '借' : y.kcm) || (!Number(y.use) && '空')}
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
