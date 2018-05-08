import React from 'react';
// import {  } from 'antd';
import './index.scss';

export default class Header extends React.Component {
  handleClick = target => {
  };
  render() {
    const { title, subTitle } = this.props;
    return (
      <div className="header">
        <strong>{title}</strong>
        <span>{subTitle}</span>
      </div>
    );
  }
}
