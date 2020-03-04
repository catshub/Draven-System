import React from 'react';
import { Select, message } from 'antd';
import ReactDOM from 'react-dom';
import Header from 'components/Header';
import { fetchJSON } from 'utils/fetchFunc';
import { ApiBase } from 'utils/common';
import './calendar.scss';

class Course extends React.Component {
  state = {
    list: [],
    now: [],
    listHtml: {},
  };
  componentWillMount() {
    const that = this;
    const loading = message.loading('获取校历信息...', 0);
    fetchJSON(`${ApiBase}/calendar`).then(res => that.setState({ list: res.list, now: res.now }, loading));
  }
  handleXlClick = value => {
    const { key, href } = JSON.parse(value);
    const { listHtml } = this.state;
    if (listHtml[key]) this.setState({ now: listHtml[key] });
    else {
      const that = this;
      const loaded = message.loading('获取校历信息...', 0);
      fetchJSON(`${ApiBase}/calendar`, { method: 'POST', body: href }).then(res => {
        that.setState({ listHtml: Object.assign({}, listHtml, { [key]: res.now }), now: res.now }, loaded);
      });
    }
  };
  renderTable = tableStr => {
    const div = document.createElement('div');
    div.innerHTML = tableStr;
    return <div />;
  };
  render() {
    const { now = [], list = [] } = this.state;
    const headerConf = {
      color: '#eca403',
      left: '校历',
      middle: (
        <Select
          // defaultValue={editData.name}
          className="selector"
          showArrow={false}
          onChange={value => this.handleXlClick(value)}
          dropdownMatchSelectWidth={false}
          placeholder="本学年校历"
        >
          {list.map(x => (
            <Select.Option key={x.key} value={JSON.stringify({ href: x.href, key: x.key })}>
              {x.name}
            </Select.Option>
          ))}
        </Select>
      ),
    };
    return (
      <div>
        <Header {...headerConf} />
        <div className="container">
          {now.map(x => <div key={x.key} className="tableWrapper" dangerouslySetInnerHTML={{ __html: x.table }} />)}
        </div>
      </div>
    );
  }
}
const main = document.getElementById('main');
ReactDOM.render(<Course />, main);
