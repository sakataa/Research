import React, { Component, Children } from 'react';
import ReactDOM from 'react-dom';
import RowLayout from './RowLayout';
import PropTypes from 'prop-types';
import Header from './Header';

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
        this.columnLayout = [];

        this.state = {
            maxWidth: props.maxWidth
        }
    }

    static propTypes = {
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        maxWidth: PropTypes.number,
        minWidth: PropTypes.number,
        autoWidth: PropTypes.bool,
        columnLayout: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired
    }

    static defaultProps = {
        width: MAX_WIDTH,
        maxWidth: MAX_WIDTH,
        autoWidth: true
    }

    get columnWidthSum() {
        const columnLayout = this.props.columnLayout;
        return columnLayout.find(x => typeof x !== "number") ?
            null : columnLayout.reduce((prev, next) => prev + next, 0);
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
        this.setState({ maxWidth });
    }

    _getUpdatedColumnLayout() {
        const { width, columnLayout, autoWidth } = this.props;
        const sumOfColumnWidth = autoWidth ? this.state.maxWidth : width;

        const newColumnLayout = this.columnWidthSum && columnLayout.map(cellWidth => {
            return sumOfColumnWidth / this.columnWidthSum * cellWidth
        });

        return newColumnLayout;
    }

    _buildContent() {
        const { width, columnLayout, autoWidth, minWidth } = this.props;
        const { maxWidth } = this.state;

        const newColumnLayout = this.columnWidthSum && this.columnWidthSum !== width ?
            this._getUpdatedColumnLayout() :
            columnLayout;

        return React.Children.map(this.props.children, (child, index) => {
            console.log(`${index}: `, child.type)
            const rows = React.Children.toArray(child.props.children);
            const layoutRow = <RowLayout key={`rowLayout${index}`} columnLayout={newColumnLayout} />;

            const newChild = {
                props: {
                    ...child.props,
                    autoWidth,
                    width,
                    maxWidth,
                    minWidth,
                    children: [layoutRow, ...rows]
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