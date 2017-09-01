import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class MultipleSelectLabel extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        selectedItems: PropTypes.arrayOf(PropTypes.string)
    }

    static defaultProps = {
        selectedItems: ["Select the items"]
    }

    get selectedItemsString() {
        return this.props.selectedItems.join(", ");
    }

    render() {
        return (
            <button type="button" className="multiple-select-label">
                <span>{this.selectedItemsString}</span>
                <b className="caret"></b>
            </button>
        )
    }
}