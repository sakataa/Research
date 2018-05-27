import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class AppLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="container" className="container main-container">
        {this.props.children}
      </div>
    );
  }
}