import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import MultipleSelectLabel from './MultipleSelectLabel'
import MultipleSelectOptionList from './MultipleSelectOptionList'

export default class MultipleSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showOptionList: false
        }
    }

    static propTypes = {
        dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
        keyField: PropTypes.string.isRequired,
        valueField: PropTypes.string.isRequired,
        statusField: PropTypes.string.isRequired,
        selectedItems: PropTypes.arrayOf(PropTypes.string),
        onChange: PropTypes.func
    }

    static defaultProps = {
        selectedItems: []
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
        console.log(this)
        console.log(node)
        console.log(e.target)
        console.log(this._lastActiveElement)

        const clickOutside = node &&
            node !== e.target &&
            !node.contains(e.target) &&
            this._lastActiveElement !== e.target;

        if (clickOutside) {
            this._close();
        }
    }

    render() {
        const {
            selectedItems,
            dataSource,
            keyField,
            valueField,
            statusField,
            onChange
        } = this.props;

        return (
            <div className="multiple-select-container">
                <MultipleSelectLabel onToggle={this.onToggle} />

                <MultipleSelectOptionList show={this.state.showOptionList}
                    dataSource={dataSource}
                    keyField={keyField}
                    valueField={valueField}
                    statusField={statusField}
                    onChange={onChange}
                    blurHandler={this.blurHandler} />
            </div>
        )
    }
}