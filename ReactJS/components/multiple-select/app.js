import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MultipleSelect from './components/index';
import { dataSource } from './fakeData'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: dataSource,
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
            <div className="main-container">
                <MultipleSelect
                    dataSource={this.state.dataSource}
                    keyField={"Code"}
                    valueField={"Name"}
                    statusField={"Status"}
                    onChange={this.onChange} />

                <button type="button" onClick={this.onClick}>Click Me!</button>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));