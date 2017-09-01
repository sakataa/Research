import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Option from './Option'

export default class MultipleSelectOptionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItems: this.selectedItemsKey
        }
    }

    static propTypes = {
        dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
        keyField: PropTypes.string.isRequired,
        valueField: PropTypes.string.isRequired,
        statusField: PropTypes.string.isRequired,
        onChange: PropTypes.func
    }

    get selectedItemsKey() {
        const { keyField, statusField } = this.props;

        return this.props.dataSource.map(item => {
            return item[statusField] ? item[keyField] : ""
        })
    }

    _renderOptionList() {
        const { dataSource, keyField, valueField, statusField, onChange } = this.props;
        const optionList = dataSource.map((item, index) => {
            return (
                <Option
                    id={`optionItem${index}`}
                    key={`optionItem${index}`}
                    itemData={item}
                    keyField={keyField}
                    valueField={valueField}
                    statusField={statusField}
                    onChange={onChange} />
            )
        });

        return optionList;
    }

    render() {
        return (
            <ul className="multiple-select-options">
                {this._renderOptionList()}
            </ul>
        )
    }
}