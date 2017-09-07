import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MultipleSelect from './components/index';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [
                { Name: "SB", Value: "Sportsbook", Status: true },
                { Name: "BA", Value: "BA", Status: false },
                { Name: "RC", Value: "Racing", Status: false }
            ],
            selectedItems: ""
        }
    }

    onChange = (item, selectedItemsKey) => {
        this.setState({ selectedItems: selectedItemsKey });
    }

    onClick = () => {
        console.log(this.state.dataSource);
        console.log(this.state.selectedItems);
    }

    render() {
        console.log("Main Page is rendering")
        return (
            <div>
                <MultipleSelect
                    dataSource={this.state.dataSource}
                    keyField={"Name"}
                    valueField={"Value"}
                    statusField={"Status"}
                    onChange={this.onChange} />

                <button type="button" onClick={this.onClick}>Click Me!</button>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));