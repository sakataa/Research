import React, { Component, Children } from 'react';
import ReactDOM from 'react-dom';
import RowLayout from './RowLayout';
import PropTypes from 'prop-types';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

import createTableSection from './createTableSection';

const MAX_WIDTH = window.innerWidth - 30;
const DEFAULT_MILLISECOND_FOR_WAITING = 500;

function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this,
            args = arguments;

        const later = function () {
            func.apply(context, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait || DEFAULT_MILLISECOND_FOR_WAITING);
    };
}

class Table extends Component {
    constructor(props) {
        super(props);

        this.diffWidth = window.innerWidth - props.maxWidth;
        this.columnsWidth = this._getColumnsWidth(props);

        this.state = {
            maxWidth: props.maxWidth
        }
    }

    static propTypes = {
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        maxWidth: PropTypes.number,
        minWidth: PropTypes.number,
        autoWidth: PropTypes.bool
    }

    static defaultProps = {
        width: MAX_WIDTH,
        maxWidth: MAX_WIDTH,
        autoWidth: true
    }

    _getColumnsWidth(props) {
        const headerComponent = props.children.find(x => x.type === Header);
        const columnsWidth = [];

        React.Children.map(headerComponent.props.children, (row, index) => {
            React.Children.forEach(row.props.children, (cell) => {
                const cellWidth = cell.props.width;
                if (cellWidth) {
                    columnsWidth.push(cellWidth)
                }
            });
        });

        return columnsWidth;
    }

    get columnWidthSum() {
        return this.columnsWidth.find(x => typeof x !== "number") ?
            null : this.columnsWidth.reduce((prev, current) => prev + current, 0);
    }

    componentDidMount() {
        window.addEventListener('resize', debounce(this._handleResize))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', debounce(this._handleResize))
    }

    _handleResize = (event) => {
        event.preventDefault();
        const maxWidth = window.innerWidth - this.diffWidth;
        console.log("Handle resize");

        if (this.state.maxWidth !== maxWidth) {
            console.log("Updating width");
            this.setState({ maxWidth });
        }
    }

    _getUpdatedColumnLayout() {
        const { width, autoWidth } = this.props;
        const sumOfColumnWidth = autoWidth ? this.state.maxWidth : width;

        const newColumnsWidth = this.columnWidthSum && this.columnsWidth.map(cellWidth => {
            return sumOfColumnWidth / this.columnWidthSum * cellWidth
        });

        return newColumnsWidth;
    }

    get maxWidth() {
        return this.state.maxWidth;
    }

    _buildContent() {
        const { width, autoWidth, minWidth } = this.props;
        const maxWidth = this.state.maxWidth;

        const newColumnLayout = this.columnWidthSum && this.columnWidthSum !== width ?
            this._getUpdatedColumnLayout() :
            this.columnsWidth;

        return React.Children.map(this.props.children, (child, index) => {
            const rows = child.props.children;
            const rowLayout = <RowLayout key={`rowLayout${index}`} columnLayout={newColumnLayout} />;
            const newChild = {
                props: {
                    ...child.props,
                    autoWidth,
                    width,
                    maxWidth,
                    minWidth,
                    children: child.type === Header ? rows : [rowLayout, ...rows]
                }
            };

            return Object.assign({}, child, newChild);
        });
    }

    render() {
        const { maxWidth } = this.state;
        return (
            <div className="table-container" style={{ maxWidth }}>
                {this._buildContent()}
            </div>
        )
    }
}

export default Table;