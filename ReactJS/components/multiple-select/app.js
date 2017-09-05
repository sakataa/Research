import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MultipleSelect from './components/index';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [
                { Name: "SB", Value: "Sportsbook", Status: true },
                { Name: "BA", Value: "BA", Status: true },
                { Name: "RC", Value: "Racing", Status: false }
            ]
        }
    }

    get selectedItems() {
        const selectedItemList = this.state.dataSource.filter(x => x.Status);

        return selectedItemList.map(x => { return x.Name }).join(",");
    }

    onChange = (item) => {
        console.log("Onchange: ", item);

        const newState = this.state.dataSource.slice();
        const selectedItem = newState.find(x => x.Name === item.Name);
        selectedItem.Status = item.Status;

        this.setState(Object.assign({}, { dataSource: newState }));
    }

    onClick = () => {
        console.log(this.selectedItems);
    }

    render() {
        console.log("Container rendered")
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