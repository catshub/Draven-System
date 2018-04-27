import React from 'react';
import { Menu, Row, Col, Table } from 'antd';
import ReactDOM from 'react-dom';
import { fetchJSON } from '../../utils/fetchFunc';
import './grade.scss';

class Grade extends React.Component {
  state = {
    ApiBase: `${window.location.protocol}//${window.location.hostname}:${sessionStorage.port || 9000}`,
    grade: {},
    gradeAll: {},
    show: 1,
  };
  componentWillMount() {
    if (!document.cookie || !sessionStorage.getItem('zjh') || !sessionStorage.getItem('name')) {
      window.location.href = `${window.location.origin}/draven/login`;
    }
  }
  componentDidMount() {
    this.getGrade('');
  }
  getGrade = (type = '') => {
    const uid = sessionStorage.getItem('zjh');
    const password = sessionStorage.getItem('mm');
    const that = this;
    fetchJSON(`${this.state.ApiBase}/grade`, {
      method: 'POST',
      body: JSON.stringify({ uid, password, type }),
      // credentials: 'include',
    }).then(res => {
      if (type === '') that.setState({ grade: res, show: 1 });
      else that.setState({ gradeAll: res, show: 0 });
    });
  };
  handleMenuClick = obj => {
    const { grade, gradeAll } = this.state;
    switch (obj.key) {
      case 'grade':
        if (grade.status === 1) this.setState({ show: 1 });
        else this.getGrade('');
        break;
      case 'gradeAll':
        if (gradeAll.status === 1) this.setState({ show: 0 });
        else this.getGrade('/all');
        break;
      default:
        break;
    }
  };
  handleCCCalculation = () => {

  }
  render() {
    const { show, grade, gradeAll } = this.state;
    const columnsConf = [
      {
        title: '课程名',
        dataIndex: 'course_name',
        width: 600,
        sorter: (a, b) => a.course_name.localeCompare(b.course_name, 'zh'),
      },
      {
        title: '分数',
        dataIndex: 'grade',
        width: 600,
        sorter: (a, b) => Number(a.grade) - Number(b.grade),
      },
      {
        title: '绩点',
        dataIndex: 'credit',
        width: 600,
        sorter: (a, b) => Number(a.credit) - Number(b.credit),
      },
      {
        title: '属性',
        dataIndex: 'course_type',
        width: 600,
        sorter: (a, b) => a.course_type.localeCompare(b.course_type, 'zh'),
        filters: [{ text: '必修', value: '必修' }, { text: '选修', value: '选修' }, { text: '任选', value: '任选' }],
        onFilter: (value, record) => record.course_type === value,
      },
    ];
    const tableConf = (data = []) => ({
      dataSource: data.reverse(),
      bordered: true,
      columns: columnsConf,
      pagination: false,
      rowKey: record => record.course_id,
      rowSelection: {}
    });
    return (
      <div>
        <Menu mode="horizontal" onClick={obj => this.handleMenuClick(obj)}>
          <Menu.Item key="grade">本学期成绩</Menu.Item>
          <Menu.Item key="gradeAll">全部成绩</Menu.Item>
        </Menu>
        {show ? (
          <Row className="row">
            <Col span="24">本学期成绩</Col>
            <Col span="24">
              <Table {...tableConf(grade.data)} />
            </Col>
          </Row>
        ) : (
          gradeAll.data.map(x => (
            <Row className="row">
              <Col span="24">{x[0].term_name}</Col>
              <Col span="24">
                <Table {...tableConf(x)} key={x[0].term} />
              </Col>
            </Row>
          ))
        )}
      </div>
    );
  }
}
const main = document.getElementById('main');
ReactDOM.render(<Grade />, main);
