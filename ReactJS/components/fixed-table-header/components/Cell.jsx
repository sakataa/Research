import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.header = props.header;
    }

    static propTypes = {
        header: PropTypes.bool
    }

    static defaultProps = {
        header: false
    }

    render() {
        const { header, colWidth, ...rest } = this.props;
        return (
            this.header ? <th {...rest}>{this.props.children}</th> : <td {...rest}>{this.props.children}</td>
        );
    }
}

export default Cell;