import React from 'react';
import { Layout, Button, Form, Input, message, Row, Col, Divider } from 'antd';
import ReactDOM from 'react-dom';
// import './grade.scss';

class Grade extends React.Component {
  state = {
    grade: {},
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
    const { protocol, hostname } = window.location;
    const uid = sessionStorage.getItem('zjh');
    const password = sessionStorage.getItem('mm');
    fetch(`${protocol}//${hostname}:${sessionStorage.port || 9000}/grade`, {
      method: 'post',
      body: JSON.stringify({ uid, password, type }),
      // credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ grade: res });
      });
  };
  render() {
    const { grade } = this.state;
    return <div>grade</div>;
  }
}
const main = document.getElementById('main');
ReactDOM.render(<Grade />, main);
