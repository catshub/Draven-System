import React from 'react';
import { Menu, Row, Col, Table, message, Select } from 'antd';
import ReactDOM from 'react-dom';
import Header from 'components/Header';
import { fetchJSON } from 'utils/fetchFunc';
import { ApiBase } from 'utils/common';
import './grade.scss';

/* eslint-disable no-param-reassign */
class Grade extends React.Component {
  state = {
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
    const loaded = message.loading('获取成绩信息 ...', 0);
    const uid = sessionStorage.getItem('zjh');
    const password = sessionStorage.getItem('mm');
    const that = this;
    fetchJSON(`${ApiBase}/grade`, {
      method: 'POST',
      body: JSON.stringify({ uid, password, type }),
      credentials: 'include',
    }).then(res => {
      if (type === '') {
        res.data.forEach(x => {
          x.term_name = String(new Date().getFullYear());
          x.point = this.formatLevelScore(x.grade, x.term_name).point;
          x.score = this.formatLevelScore(x.grade, x.term_name).score;
        });
        that.setState({ grade: res, show: 1 }, loaded);
      } else {
        res.data = res.data.reverse();
        res.data.forEach(x => {
          x.forEach(y => {
            y.point = this.formatLevelScore(y.grade, y.term_name).point;
            y.score = this.formatLevelScore(y.grade, y.term_name).score;
          });
        });
        that.setState({ gradeAll: res, show: 0 }, loaded);
      }
    });
  };
  handleSelected = obj => {
    const { grade, gradeAll } = this.state;
    switch (obj) {
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
  formatLevelScore = (grade, termName) => {
    const reg = /优秀|良好|中等|合格|不合格|通过|未通过/;
    const isNew = Number(termName.substring(0, 4)) >= 2017;
    let temp;
    if (reg.test(grade)) {
      const level = reg.exec(grade)[0];
      switch (level) {
        case '优秀':
          temp = isNew ? { grade, score: 100, point: 4 } : { grade, score: 100, point: 4 };
          break;
        case '良好':
          temp = isNew ? { grade, score: 84, point: 3.3 } : { grade, score: 89, point: 3.6 };
          break;
        case '中等':
          temp = isNew ? { grade, score: 75, point: 2.7 } : { grade, score: 79, point: 2.7 };
          break;
        case '合格' || '通过':
          temp = isNew ? { grade, score: 69, point: 2 } : { grade, score: 69, point: 1.7 };
          break;
        case '不合格' || '不通过':
          temp = { grade, score: 0, point: 0 };
          break;
        default:
          temp = { grade, score: 0, point: 0 };
          break;
      }
    } else {
      const g = Number(grade);
      let point = 0;
      if (!isNew) {
        if (g >= 95) point = 4;
        else if (g < 95 && g >= 90) point = 3.8;
        else if (g < 90 && g >= 85) point = 3.6;
        else if (g < 85 && g >= 80) point = 3.2;
        else if (g < 80 && g >= 75) point = 2.7;
        else if (g < 75 && g >= 70) point = 2.2;
        else if (g < 70 && g >= 65) point = 1.7;
        else if (g < 65 && g >= 60) point = 1;
        else point = 0;
      } else if (g >= 90) point = 4;
      else if (g < 90 && g >= 85) point = 3.7;
      else if (g < 85 && g >= 80) point = 3.3;
      else if (g < 80 && g >= 76) point = 3;
      else if (g < 76 && g >= 73) point = 2.7;
      else if (g < 73 && g >= 70) point = 2.3;
      else if (g < 70 && g >= 66) point = 2;
      else if (g < 66 && g >= 63) point = 1.7;
      else if (g < 63 && g >= 61) point = 1.3;
      else if (g < 61 && g >= 60) point = 1;
      else point = 0;
      temp = { score: g, point };
    }
    return temp;
  };
  handleCalculation = (data = [], courseType = '', calculType, countType = 'all') => {
    const courseTyped = courseType === 'all' ? data : data.filter(x => x.course_type === courseType);
    let calculTyped = 0;
    switch (calculType) {
      case 'credit': // 学分
        calculTyped = courseTyped.reduce((x, y) => x + Number(y.credit), 0);
        break;
      case 'point': // 绩点
        calculTyped = courseTyped.reduce((x, y) => x + y.point, 0);
        break;
      case 'grade': // 分数
        calculTyped = courseTyped.reduce((x, y) => x + y.score, 0);
        break;
      default:
        break;
    }
    return (calculTyped / (countType === 'all' ? 1 : courseTyped.length)).toFixed(2);
  };
  render() {
    const { show, grade, gradeAll } = this.state;
    const columnsConf = [
      {
        title: '课程名',
        dataIndex: 'course_name',
        width: 100,
        sorter: (a, b) => a.course_name.localeCompare(b.course_name, 'zh'),
      },
      {
        title: '分数',
        dataIndex: 'grade',
        width: 40,
        render: (text, record) => {
          const result = this.formatLevelScore(text, record.term_name);
          return `${result.grade ? `${result.grade}/` : ''}${result.score}`;
        },
        sorter: (a, b) => Number(a.score) - Number(b.score),
      },
      {
        title: '绩点',
        dataIndex: 'point',
        width: 40,
        sorter: (a, b) => Number(a.point) - Number(b.point),
      },
      {
        title: '学分',
        dataIndex: 'credit',
        width: 40,
        sorter: (a, b) => Number(a.credit) - Number(b.credit),
      },
      {
        title: '属性',
        dataIndex: 'course_type',
        width: 50,
        sorter: (a, b) => a.course_type.localeCompare(b.course_type, 'zh'),
        filters: [{ text: '必修', value: '必修' }, { text: '选修', value: '选修' }, { text: '任选', value: '任选' }],
        filtered: false,
        onFilter: (value, record) => record.course_type === value,
      },
    ];
    const tableConf = (data = []) => ({
      dataSource: data,
      // bordered: false,
      columns: columnsConf,
      pagination: false,
      rowKey: record => record.course_id,
      className: 'table-wrapper',
      // rowSelection: {},
    });
    // const color = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'grey'];
    const headerConf = {
      title: '成绩查询',
      subTitle: '所有成绩',
      color: '#578fe4',
      home: true,
      middle: (
        <Select defaultValue="grade" showArrow={false} className="selector" onChange={obj => this.handleSelected(obj)}>
          <Select.Option value="grade">本学期成绩</Select.Option>
          <Select.Option value="gradeAll">全部成绩</Select.Option>
        </Select>
      ),
    };
    return (
      <div>
        <Header {...headerConf} />
        <div>
          {show ? (
            <Row className="row0">
              <Col span="24" className="term">
                本学期成绩
              </Col>
              <Row className="result">
                <Col xs={12} md={6}>
                  必修平均绩点：{this.handleCalculation(grade.data, '必修', 'point', 'average')}
                </Col>
                <Col xs={12} md={6}>
                  必修总学分：{this.handleCalculation(grade.data, '必修', 'credit', 'all')}
                </Col>
                <Col xs={12} md={6}>
                  全部平均绩点：{this.handleCalculation(grade.data, 'all', 'point', 'average')}
                </Col>
                <Col xs={12} md={6}>
                  全部总学分：{this.handleCalculation(grade.data, 'all', 'credit', 'all')}
                </Col>
              </Row>
              <Col span="24">
                <Table {...tableConf(grade.data)} />
              </Col>
            </Row>
          ) : (
            gradeAll.data.map((x, i) => (
              <Row className={`row${i % 8}`}>
                <Col span="24" className="term">
                  {x[0].term_name.substring(0, 12)}
                </Col>
                <Row className="result">
                  <Col xs={12} md={6}>
                    必修平均绩点：{this.handleCalculation(x, '必修', 'point', 'average')}
                  </Col>
                  <Col xs={12} md={6}>
                    必修总学分：{this.handleCalculation(x, '必修', 'credit', 'all')}
                  </Col>
                  <Col xs={12} md={6}>
                    全部平均绩点：{this.handleCalculation(x, 'all', 'point', 'average')}
                  </Col>
                  <Col xs={12} md={6}>
                    全部总学分：{this.handleCalculation(x, 'all', 'credit', 'all')}
                  </Col>
                  {/* <Col span="6">{this.handleCalculation(x, 'all', 'grade', 'average')}</Col> */}
                </Row>
                <Col span="24">
                  <Table {...tableConf(x)} key={x[0].term} />
                </Col>
              </Row>
            ))
          )}
        </div>
      </div>
    );
  }
}
const main = document.getElementById('main');
ReactDOM.render(<Grade />, main);
