import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import MultipleSelectLabel from './MultipleSelectLabel'
import MultipleSelectOptionList from './MultipleSelectOptionList'

const KEY_NAME = "key";
const VALUE_NAME = "value";
const STATUS_NAME = "status";

export default class MultipleSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showOptionList: false,
            dataSource: props.dataSource
        }
    }

    static propTypes = {
        dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
        keyField: PropTypes.string.isRequired,
        valueField: PropTypes.string.isRequired,
        statusField: PropTypes.string.isRequired,
        onChange: PropTypes.func
    }

    get dataSource() {
        const { keyField, valueField, statusField, dataSource } = this.props;

        return dataSource.map(item => {
            return {
                [KEY_NAME]: item[keyField],
                [VALUE_NAME]: item[valueField],
                [STATUS_NAME]: item[statusField]
            }
        })
    }

    get selectedItems() {
        return this.dataSource.filter(item => item.status);
    }

    onToggle = () => {
        this.setState((prevState) => { return { showOptionList: !prevState.showOptionList } })
    }

    _close = () => {
        this.setState((prevState) => { return { showOptionList: false } })
    }

    componentDidMount() {
        this._lastActiveElement = document.activeElement
        document.addEventListener('click', this._handleDocumentClick, true)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this._handleDocumentClick, true)
    }

    _handleDocumentClick = (e) => {
        const node = ReactDOM.findDOMNode(this);

        const clickOutside = node &&
            node !== e.target &&
            !node.contains(e.target) &&
            this._lastActiveElement !== e.target;

        if (clickOutside) {
            this._close();
        }
    }

    onChangeHandler = (item) => {
        const { keyField, statusField, onChange } = this.props;

        const newState = this.state.dataSource.slice();
        const selectedItem = newState.find(x => x[keyField] === item.key);
        selectedItem[statusField] = item.status;        

        const selectedItemString = this.selectedItems.map(item => item.key).join(",");
        onChange && onChange(selectedItem, selectedItemString);

        this.setState(Object.assign({}, { dataSource: newState }));
    }

    render() {
        const { dataSource, onChange } = this.props;

        return (
            <div className="multiple-select-container">
                <MultipleSelectLabel selectedItems={this.selectedItems} onToggle={this.onToggle} />

                <MultipleSelectOptionList show={this.state.showOptionList}
                    dataSource={this.dataSource}
                    onChange={this.onChangeHandler} />
            </div>
        )
    }
}