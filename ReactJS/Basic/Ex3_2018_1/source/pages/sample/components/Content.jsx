import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ActionCreators from '../actions'

class Content extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="content-container"
        style={{ display: this.props.isChecked ? "block" : "none" }}
      >
        <p>Sample Data</p>
        <ul className="sample-list">
          {this.props.sampleList.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return Object.assign(
    {},
    {
      isChecked: state.isChecked,
      sampleList: state.sampleList
    }
  );
}

function mapDispatchToProps(dispatch) {
  const { addSample } = ActionCreators;
  return bindActionCreators({ addSample }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
