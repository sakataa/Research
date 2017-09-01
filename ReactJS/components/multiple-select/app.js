import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MultipleSelect from './components/index';

const dataSource = [
    { Name: "SB", Value: "Sportsbook", Status: true },
    { Name: "BA", Value: "BA", Status: true },
    { Name: "RC", Value: "Racing", Status: false }
]
class App extends Component {
    constructor(props) {
        super(props);
    }

    onChange(item){
        console.log("Onchange: ", item);
    }

    render() {
        return (
            <MultipleSelect dataSource={dataSource} keyField={"Name"} valueField={"Value"} statusField={"Status"} onChange={this.onChange} />
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));