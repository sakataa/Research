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

    onChange = (e) => {
        const { itemData, statusField, onChange } = this.props;
        itemData[statusField] = !this.state.isChecked;
        onChange && onChange(itemData);

        this.setState((prevState) => { return { isChecked: !prevState.isChecked } });
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