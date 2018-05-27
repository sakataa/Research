import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ActionCreators from '../actions';

class Filter extends Component {
  constructor(props) {
    super(props);
  }

  onCheckBoxChange = () => {
      const newState = !this.props.isChecked;
      this.props.toggleSample(newState);
  };

  addSample = () => {
      const newSampleList = [...this.props.sampleList, `sample ${++this.props.sampleList.length}`];
      //console.log(newSampleList);
      this.props.addSample(newSampleList);
  }

  render() {
    return (
      <div className="filter-container">
        <div>
          <label>
            <input
              type="checkbox"
              checked={this.props.isChecked}
              onChange={this.onCheckBoxChange}
            />
            Toggle Samle
          </label>

          <button type="button" onClick={this.addSample}>Add Sample</button>
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return Object.assign({}, { isChecked: state.isChecked, sampleList: state.sampleList });
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
