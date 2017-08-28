import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableSection extends Component {
    constructor(props) {
        super(props);
        const containerWidth = props.autoWidth ? props.maxWidth : props.width + 19;
        this.containerStyle = props.style ? { ...props.style, width: containerWidth } :
                                            { width: containerWidth }

        if (props.style) {
            this.containerStyle
        }

        this.tableStyle = {
            width: props.autoWidth ? props.maxWidth - 19 : props.width
        }
    }

    render() {
        console.log(this.containerStyle);
        const { tableClass, width, autoWidth, maxWidth, ...rest } = this.props;

        return (
            <div {...rest} style={this.containerStyle}>
                <div className="table-wrapper">
                    <table style={this.tableStyle} className={tableClass}>
                        {this.props.children}
                    </table>
                </div>
            </div >
        );
    }
}

TableSection.propTypes = {
    tableClass: PropTypes.string
}

TableSection.defaultProps = {
    tableClass: "table"
}

export default TableSection;