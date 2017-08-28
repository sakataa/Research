import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TableSection from './TableSection';

class Body extends Component {
    constructor(props) {
        super(props);
        this.containerStyle = {
            maxHeight: props.maxHeight
        }
    }

    render() {
        const { maxHeight, ...rest } = this.props;
        return (
            <TableSection className="body-content" style={this.containerStyle} {...rest}>
                <tbody>
                    {this.props.children}
                </tbody>
            </TableSection>
        );
    }
}

Body.propTypes = {
    tableClass: PropTypes.string
}

Body.defaultProps = {
    tableClass: "table"
}

export default Body;