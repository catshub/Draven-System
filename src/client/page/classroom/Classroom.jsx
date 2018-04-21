import React from 'react';
import { Layout, Button, Form, Input, message, Row, Col, Divider } from 'antd';
import ReactDOM from 'react-dom';
// import './Classroom.scss';

class Classroom extends React.Component {
  constructor(props) {
    super();
    this.state = {
      classroom: [],
    };
  }
  componentDidMount() {
    const { protocol, hostname } = window.location;
    fetch(`${protocol}//${hostname}:8101/classroom`, {
      method: 'post',
      body: '',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ classroom: res });
      });
  }
  render() {
    return <div>Classroom</div>;
  }
}
const main = document.getElementById('main');
ReactDOM.render(<Classroom />, main);
