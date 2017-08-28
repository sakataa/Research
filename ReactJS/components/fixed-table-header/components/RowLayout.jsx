import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RowLayout extends Component {
    constructor(props) {
        super(props)
    }

    _getRowLayout() {
        const { width, columnLayout, columnWidthSum } = this.props;
        const lastIndex = columnLayout.length - 1;

        return columnLayout.map((cellWidth, index) => {
            const changeWidthOfLastCell = columnWidthSum && index === lastIndex && width > columnWidthSum;
            if (changeWidthOfLastCell) {
                const lastCellWidth = cellWidth + (width - columnWidthSum);
                return (<td key={`cellLayout${index}`} style={{ width: lastCellWidth }}></td>);
            }

            const otherCellWidth = isNaN(cellWidth) ? cellWidth : `${cellWidth}px`;

            return (<td key={`cellLayout${index}`} style={{ width: otherCellWidth }}></td>);
        });
    }

    render() {
        return (
            <tr className="first-row">
                {this._getRowLayout()}
            </tr>
        );
    }
}

RowLayout.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    columnLayout: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired
}

export default RowLayout;