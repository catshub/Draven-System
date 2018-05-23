import React from 'react';
import { Table, message } from 'antd';
import ReactDOM from 'react-dom';
import Header from 'components/Header';
import { fetchJSON } from 'utils/fetchFunc';
import { ApiBase } from 'utils/common';
import './course.scss';

const Frag = React.Fragment;

class Course extends React.Component {
  state = {
    // ApiBase: `${window.location.protocol}//${window.location.hostname}:${sessionStorage.port || 9000}`,
    course: [],
  };
  componentWillMount() {
    if (!document.cookie || !sessionStorage.getItem('zjh') || !sessionStorage.getItem('name')) {
      window.location.href = `${window.location.origin}/draven/login`;
    }
  }
  componentDidMount() {
    const that = this;
    const loaded = message.loading('获取课程信息 ...', 0);
    this.handleFixedTable();
    fetchJSON(`${ApiBase}/course`, {
      method: 'POST',
      body: '',
      credentials: 'include',
    }).then(res => that.setState({ course: res }, loaded));
  }
  formatCourse = course => {
    const arr = [];
    for (let i = 0; i < 13; i++) arr[i] = {};
    course.forEach(x => {
      if (x.course_type.length > 0) {
        if (x.course_type.length === 1) arr[x.course_type[0] - 1][`week${x.week}`] = x;
        else for (let j = Number(x.course_type[0] - 1); j < Number(x.course_type[1]); ++j) arr[j][`week${x.week}`] = x;
      }
    });
    // console.log('course:', course, '\nformat:', arr);
    return arr;
  };
  handleFixedTable = () => {
    const table = document.getElementById('fixedTable');
    const width = document.documentElement.clientWidth < 768 ? 40 : 50;
    window.onscroll = () => {
      if (table) {
        if (window.pageYOffset > width && table.style.visibility !== 'visible') table.style.visibility = 'visible';
        else if (window.pageYOffset <= width && table.style.visibility !== 'hidden') table.style.visibility = 'hidden';
      }
    };
  };
  handleCourseClick = text => {
    message.info(
      <div>
        <p>课程：{text.course_name}</p>
        <p>教室：{`${text.campus}${text.build} ${text.classroom}`}</p>
        <p>教师：{text.teacher}</p>
        <p>节次：{`${text.week_type} 星期${text.week} 第${text.course_type}小节`}</p>
      </div>,
      5
    );
  };
  renderCourse = (text, index) => {
    if (!text) return '';
    const {
      course_type: section, week_type: week, campus, build, course_name: name, classroom
    } = text;
    if (index + 1 !== Number(section[0])) return { children: '', props: { rowSpan: 0 } };
    return {
      children: (
        <Frag>
          <div>{name}</div>
          <div>{`${campus}${build} ${classroom}`}</div>
        </Frag>
      ),
      props: {
        rowSpan: section.length === 1 ? 1 : section[1] - section[0] + 1,
        className: `course${Math.floor(Math.random() * 7)}`,
        onClick: () => this.handleCourseClick(text),
      },
    };
  };
  renderColConf = (name, week) => ({
    title: name,
    dataIndex: week,
    width: 100,
    render: (text, record, index) => this.renderCourse(text, index),
  });

  render() {
    const { course } = this.state;
    const columnsConf = [
      {
        title: '节次',
        key: 'section',
        width: 50,
        className: 'section',
        render: (text, record, index) => `${index + 1}`,
      },
      this.renderColConf('周一', 'week1'),
      this.renderColConf('周二', 'week2'),
      this.renderColConf('周三', 'week3'),
      this.renderColConf('周四', 'week4'),
      this.renderColConf('周五', 'week5'),
      this.renderColConf('周六', 'week6'),
      this.renderColConf('周日', 'week7'),
    ];
    const tableConf = {
      dataSource: this.formatCourse(course),
      bordered: true,
      columns: columnsConf,
      pagination: false,
      rowKey: (record, index) => index,
    };
    const headerConf = {
      left: '课程表',
      color: '#de87c3',
    };
    return (
      <div>
        <Header {...headerConf} />
        <div className="container">
          <table id="fixedTable">
            <thead>
              <tr>
                <th>
                  <span>节次</span>
                </th>
                <th>
                  <span>周一</span>
                </th>
                <th>
                  <span>周二</span>
                </th>
                <th>
                  <span>周三</span>
                </th>
                <th>
                  <span>周四</span>
                </th>
                <th>
                  <span>周五</span>
                </th>
                <th>
                  <span>周六</span>
                </th>
                <th>
                  <span>周日</span>
                </th>
              </tr>
            </thead>
          </table>
          <Table {...tableConf} />
        </div>
      </div>
    );
  }
}
const main = document.getElementById('main');
ReactDOM.render(<Course />, main);
