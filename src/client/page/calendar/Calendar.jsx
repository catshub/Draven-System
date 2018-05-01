import React from 'react';
import { Table, message } from 'antd';
import ReactDOM from 'react-dom';
import { fetchJSON } from '../../utils/fetchFunc';
import { ApiBase } from '../../utils/common';
import './calendar.scss';

class Course extends React.Component {
  state = {
    calendar: [],
  };
  componentWillMount() {
    const that = this;
    const loading = message.loading('...', 0);
    fetchJSON(`${ApiBase}/calendar`).then(res => that.setState({ calendar: res }, loading));
  }
  renderTable = tableStr => {
    const div = document.createElement('div');
    div.innerHTML = tableStr;
    return <div />;
  };
  render() {
    const { calendar } = this.state;
    const columnsConf = [
      {
        title: (calendar[0] && calendar[0].busCol1) || '',
        dataIndex: 'busCol1',
        width: 100,
        render: (text, record, index) => {
          if (index === 0) return { children: '1', props: { rowSpan: 0 } };
          return text;
        },
      },
      {
        title: (calendar[0] && calendar[0].busCol2) || '',
        dataIndex: 'busCol2',
        width: 100,
        render: (text, record, index) => {
          if (index === 0) return { children: '1', props: { rowSpan: 0 } };
          return text;
        },
      },
      {
        title: (calendar[0] && calendar[0].busCol3) || '',
        dataIndex: 'busCol3',
        width: 100,
        render: (text, record, index) => {
          if (index === 0) return { children: '1', props: { rowSpan: 0 } };
          return text;
        },
      },
      {
        title: (calendar[0] && calendar[0].busCol4) || '',
        dataIndex: 'busCol4',
        width: 100,
        render: (text, record, index) => {
          if (index === 0) return { children: '1', props: { rowSpan: 0 } };
          return text;
        },
      },
    ];
    const tableConf = {
      dataSource: calendar,
      bordered: true,
      columns: columnsConf,
      pagination: false,
      // showHeader: false,
    };
    return (
      <div className="container">
        {calendar.map(x => (
          <div>
            <p>{x.type}</p>
            <div className="table" dangerouslySetInnerHTML={{ __html: x.table }} />
          </div>
        ))}
      </div>
    );
  }
}
const main = document.getElementById('main');
ReactDOM.render(<Course />, main);
