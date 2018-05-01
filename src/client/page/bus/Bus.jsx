import React from 'react';
import { Table } from 'antd';
import ReactDOM from 'react-dom';
import { fetchJSON } from '../../utils/fetchFunc';
import { ApiBase } from '../../utils/common';
import './bus.scss';

class Course extends React.Component {
  state = {
    bus: [],
    message: [],
  };
  componentWillMount() {
    const that = this;
    fetchJSON(`${ApiBase}/bus`).then(res => that.setState({ bus: res.data, message: res.message }));
  }
  render() {
    const { bus, message } = this.state;
    const columnsConf = [
      {
        title: (bus[0] && bus[0].busCol1) || '',
        dataIndex: 'busCol1',
        width: 100,
        render: (text, record, index) => {
          if (index === 0) return { children: '1', props: { rowSpan: 0 } };
          return text;
        },
      },
      {
        title: (bus[0] && bus[0].busCol2) || '',
        dataIndex: 'busCol2',
        width: 100,
        render: (text, record, index) => {
          if (index === 0) return { children: '1', props: { rowSpan: 0 } };
          return text;
        },
      },
      {
        title: (bus[0] && bus[0].busCol3) || '',
        dataIndex: 'busCol3',
        width: 100,
        render: (text, record, index) => {
          if (index === 0) return { children: '1', props: { rowSpan: 0 } };
          return text;
        },
      },
      {
        title: (bus[0] && bus[0].busCol4) || '',
        dataIndex: 'busCol4',
        width: 100,
        render: (text, record, index) => {
          if (index === 0) return { children: '1', props: { rowSpan: 0 } };
          return text;
        },
      },
    ];
    const tableConf = {
      dataSource: bus,
      bordered: true,
      columns: columnsConf,
      pagination: false,
      // showHeader: false,
    };
    return (
      <div className="container">
        <Table {...tableConf} />
        <div className="message">
          {message.map(x => <p>{x}</p>)}
        </div>
      </div>
    );
  }
}
const main = document.getElementById('main');
ReactDOM.render(<Course />, main);
