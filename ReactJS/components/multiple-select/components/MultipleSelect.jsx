import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import MultipleSelectLabel from './MultipleSelectLabel'
import MultipleSelectOptionList from './MultipleSelectOptionList'

export default class MultipleSelect extends Component {
    constructor(props) {
        super(props);
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
            <div className="react-multiple-select-container">
                <MultipleSelectLabel />

                <MultipleSelectOptionList
                    dataSource={dataSource}
                    keyField={keyField}
                    valueField={valueField}
                    statusField={statusField}
                    onChange={onChange} />
            </div>
        )
    }
}