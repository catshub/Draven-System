import React from 'react';
import { Table } from 'antd';
import ReactDOM from 'react-dom';
import { fetchJSON } from '../../utils/fetchFunc';
import './course.scss';

class Course extends React.Component {
  state = {
    ApiBase: `${window.location.protocol}//${window.location.hostname}:${sessionStorage.port || 9000}`,
    course: [],
  };
  componentWillMount() {
    if (!document.cookie || !sessionStorage.getItem('zjh') || !sessionStorage.getItem('name')) {
      window.location.href = `${window.location.origin}/draven/login`;
    }
  }
  componentDidMount() {
    const that = this;
    fetchJSON(`${this.state.ApiBase}/course`, {
      method: 'POST',
      body: '',
      credentials: 'include',
    }).then(res => that.setState({ course: res }));
  }
  formatCourse = course => {
    const arr = [];
    for (let i = 0; i < 13; i++) arr[i] = {};
    course.forEach(x => {
      // const temp = {};
      x.course_type.forEach(y => {
        arr[y - 1][`week${x.week}`] = x;
        // arr[y - 1] = Object.assign({}, arr[y - 1], temp);
      });
    });
    return arr;
  };
  render() {
    const { course } = this.state;
    console.log(course, this.formatCourse(course));
    const columnsConf = [
      {
        title: '',
        key: 'time',
        // colSpan: 2,
        width: 40,
        className: 'timeCol',
        render: (text, record, index) => {
          if (index === 0) return { children: '上午', props: { rowSpan: 4 } };
          else if (index === 4) return { children: '中午', props: { rowSpan: 5 } };
          else if (index === 9) return { children: '晚上', props: { rowSpan: 4 } };
          return { children: '晚上', props: { rowSpan: 0 } };
        },
      },
      {
        title: '',
        key: 'course',
        // colSpan: 0,
        width: 100,
        render: (text, record, index) => `第${index + 1}节`,
      },
      {
        title: '星期一',
        dataIndex: 'week1.course_name',
        width: 100,
        render: (text, record) => {
          if (text) {
            const {
              campus, build, course_name: name, classroom
            } = record.week1;
            return `${name}\n（${campus}${build} ${classroom}）`;
          }
          return '';
        },
      },
      {
        title: '星期二',
        dataIndex: 'week2.course_name',
        width: 100,
        render: (text, record) => {
          if (text) {
            const {
              campus, build, course_name: name, classroom
            } = record.week2;
            return `${name}\n（${campus}${build} ${classroom}）`;
          }
          return '';
        },
      },
      {
        title: '星期三',
        dataIndex: 'week3.course_name',
        width: 100,
        render: (text, record) => {
          if (text) {
            const {
              campus, build, course_name: name, classroom
            } = record.week3;
            return `${name}\n（${campus}${build} ${classroom}）`;
          }
          return '';
        },
      },
      {
        title: '星期四',
        dataIndex: 'week4.course_name',
        width: 100,
        render: (text, record) => {
          if (text) {
            const {
              campus, build, course_name: name, classroom
            } = record.week4;
            return `${name}\n（${campus}${build} ${classroom}）`;
          }
          return '';
        },
      },
      {
        title: '星期五',
        dataIndex: 'week5.course_name',
        width: 100,
        render: (text, record) => {
          if (text) {
            const {
              campus, build, course_name: name, classroom
            } = record.week5;
            return `${name}\n（${campus}${build} ${classroom}）`;
          }
          return '';
        },
      },
      {
        title: '星期六',
        dataIndex: 'week6.course_name',
        width: 100,
        render: (text, record) => {
          if (text) {
            const {
              campus, build, course_name: name, classroom
            } = record.week6;
            return `${name}\n（${campus}${build} ${classroom}）`;
          }
          return '';
        },
      },
      {
        title: '星期天',
        dataIndex: 'week7.course_name',
        width: 100,
        render: (text, record) => {
          if (text) {
            const {
              campus, build, course_name: name, classroom
            } = record.week7;
            return `${name}\n（${campus}${build} ${classroom}）`;
          }
          return '';
        },
      },
    ];
    const tableConf = {
      dataSource: this.formatCourse(course),
      bordered: true,
      columns: columnsConf,
      pagination: false,
      // className: 'table',
      // rowKey: record => record.course_id,
      // rowSelection: {},
    };
    return (
      <div className="container">
        <Table {...tableConf} />
      </div>
    );
  }
}
const main = document.getElementById('main');
ReactDOM.render(<Course />, main);
