import React from 'react';
import { Table, message } from 'antd';
import ReactDOM from 'react-dom';
import Header from 'components/Header';
import { fetchJSON } from 'utils/fetchFunc';
import { ApiBase } from 'utils/common';
import './bus.scss';

class Course extends React.Component {
  state = {
    bus: [],
    tips: [],
  };
  componentWillMount() {
    const that = this;
    const loaded = message.loading('获取校车信息 ...', 0);
    fetchJSON(`${ApiBase}/bus`).then(res => that.setState({ bus: res.data, tips: res.tips }, loaded));
  }
  componentDidMount() {
    this.handleFixedTable();
  }
  handleFixedTable = () => {
    const table = document.getElementById('fixedTable');
    const width = document.documentElement.clientWidth < 768 ? 40 : 50;
    window.onscroll = () => {
      if (table) {
        const { visibility } = table.style;
        if (window.pageYOffset > width && visibility !== 'visible') {
          table.style.visibility = 'visible';
          console.log('visible...');
        } else if (window.pageYOffset <= width && visibility !== 'hidden') {
          console.log(visibility, 'hidden...');
          table.style.visibility = 'hidden';
        }
      }
    };
  };
  render() {
    const { bus, tips } = this.state;
    const columnsConf = [
      {
        title: (bus[0] && bus[0].busCol1) || '',
        dataIndex: 'busCol1',
        width: 100,
        render: (text, record, index) => {
          if (index === 0) return { children: '1', props: { rowSpan: 0 } };
          return <span>{text}</span>;
        },
      },
      {
        title: (bus[0] && bus[0].busCol2) || '',
        dataIndex: 'busCol2',
        width: 100,
        render: (text, record, index) => {
          if (index === 0) return { children: '1', props: { rowSpan: 0 } };
          return <span>{text}</span>;
        },
      },
      {
        title: (bus[0] && bus[0].busCol3) || '',
        dataIndex: 'busCol3',
        width: 100,
        render: (text, record, index) => {
          if (index === 0) return { children: '1', props: { rowSpan: 0 } };
          return <span>{text}</span>;
        },
      },
      {
        title: (bus[0] && bus[0].busCol4) || '',
        dataIndex: 'busCol4',
        width: 100,
        render: (text, record, index) => {
          if (index === 0) return { children: '1', props: { rowSpan: 0 } };
          return <span>{text}</span>;
        },
      },
    ];
    const tableConf = {
      dataSource: bus,
      bordered: true,
      columns: columnsConf,
      pagination: false,
      rowKey: (v, k) => k,
    };
    const headerConf = {
      left: '校车信息',
      color: '#1cc769',
    };
    return (
      <div>
        <Header {...headerConf} />
        <div className="container">
          <table id="fixedTable">
            <thead>
              <tr>
                <th>
                  <span>{bus[0] && bus[0].busCol1}</span>
                </th>
                <th>
                  <span>{bus[0] && bus[0].busCol2}</span>
                </th>
                <th>
                  <span>{bus[0] && bus[0].busCol3}</span>
                </th>
                <th>
                  <span>{bus[0] && bus[0].busCol4}</span>
                </th>
              </tr>
            </thead>
          </table>
          <Table {...tableConf} />
          <div className="tips">{tips.map(x => <p>{x}</p>)}</div>
        </div>
      </div>
    );
  }
}
const main = document.getElementById('main');
ReactDOM.render(<Course />, main);
