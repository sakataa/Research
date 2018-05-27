import React, { Component } from "react";
import { connect } from "react-redux";

import AppLayout from "../../../layouts/AppLayout";
import Filter from "./Filter";
import Content from "./Content";

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppLayout>
        <Filter />
        <Content />
      </AppLayout>
    );
  }
}

export default connect()(AppContainer);
