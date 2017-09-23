import React, { Component, Children } from 'react';
import ReactDOM from 'react-dom';
import RowLayout from './RowLayout';
import PropTypes from 'prop-types';
import createTableSection from './TableSection';

const headerContainerProps = { className: "header-content", isHeader: true };
const Header = createTableSection(headerContainerProps);

const bodyContainerProps = { className: "body-content" };
const Body = createTableSection(bodyContainerProps);

const footerContainerProps = { className: "footer-content" };
const Footer = createTableSection(footerContainerProps);

const MAX_WIDTH = window.innerWidth - 30;
const DEFAULT_MILLISECOND_FOR_WAITING = 500;
const DEFAULT_COLUMN_WIDTH = 100;

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
        autoWidth: PropTypes.bool,
        bodyHeight: PropTypes.number,
        header: PropTypes.arrayOf(PropTypes.object),
        body: PropTypes.arrayOf(PropTypes.object),
        footer: PropTypes.arrayOf(PropTypes.object)
    }

    static defaultProps = {
        width: MAX_WIDTH,
        maxWidth: MAX_WIDTH,
        autoWidth: true
    }

    _getColumnsWidth(props) {
        const headerComponent = props.header;
        const columnsWidth = [];

        React.Children.map(headerComponent, (row, index) => {
            React.Children.forEach(row.props.children, (cell) => {
                const props = cell.props;
                if (!props.colSpan) {
                    const cellWidth = props.colWidth ? props.colWidth : DEFAULT_COLUMN_WIDTH;
                    columnsWidth.push(cellWidth);
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

    render() {
        const { width, autoWidth, minWidth, bodyHeight, header, body, footer } = this.props;
        const maxWidth = this.state.maxWidth;

        const newColumnLayout = this.columnWidthSum && this.columnWidthSum !== width ?
            this._getUpdatedColumnLayout() :
            this.columnsWidth;

        const sectionProps = { width, autoWidth, minWidth, maxWidth };
        const rowLayout = <RowLayout columnLayout={newColumnLayout} />;

        return (
            <div className="table-container" style={{ maxWidth }}>
                <Header {...sectionProps}>
                    {rowLayout}
                    {header}
                </Header>

                <Body {...sectionProps} maxHeight={bodyHeight}>
                    {rowLayout}
                    {body}
                </Body>

                <Footer {...sectionProps}>
                    {rowLayout}
                    {footer}
                </Footer>
            </div>
        )
    }
}

export default Table;