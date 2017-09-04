import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Option extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: props.itemData[props.statusField]
        }
    }

    static propTypes = {
        itemData: PropTypes.object.isRequired,
        keyField: PropTypes.string.isRequired,
        valueField: PropTypes.string.isRequired,
        statusField: PropTypes.string.isRequired,
        onChange: PropTypes.func
    }

    onChange = () => {
        const { itemData, statusField, onChange } = this.props;
        const newState = !this.state.isChecked;
        itemData[statusField] = newState;
        onChange && onChange(itemData);

        this.setState(() => { return { isChecked: newState } });
    }

    render() {
        const { itemData, valueField, id } = this.props;

        return (
            <li className="multiple-select-item">
                <input
                    id={id}
                    type="checkbox"
                    className="option-checkbox"
                    checked={this.state.isChecked}
                    onChange={this.onChange}
                />
                <label className="option-label" htmlFor={id}>
                    {itemData[valueField]}
                </label>
            </li>
        );
    }
}