import React from 'react';
import { Button, Form, Input, message, Row } from 'antd';
import ReactDOM from 'react-dom';

class Home extends React.Component {
  componentWillMount() {
    if (!document.cookie || !sessionStorage.getItem('zjh') || !sessionStorage.getItem('name')) {
      window.location.href = `${window.location.origin}/draven/login`;
    }
  }
  render() {
    const zjh = sessionStorage.getItem('zjh');
    const name = sessionStorage.getItem('name');
    return (
      <div>
        <header>
          <b>{name}</b><span>{zjh}</span>
        </header>
      </div>
    );
  }
}
const main = document.getElementById('main');
ReactDOM.render(<Home />, main);
