import React from 'react';
import { Layout, Button, Form, Input, message, Row, Col, Divider } from 'antd';
import ReactDOM from 'react-dom';
// import './grade.scss';

class Course extends React.Component {
  state = {
    course: [],
  };
  componentDidMount() {
    const { protocol, hostname } = window.location;
    fetch(`${protocol}//${hostname}:8101/course`, {
      method: 'post',
      body: '',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ course: res });
      });
  }
  render() {
    return <div>Course</div>;
  }
}
const main = document.getElementById('main');
ReactDOM.render(<Course />, main);
