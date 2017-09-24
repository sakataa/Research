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
        this.columnsWidth = this._getColumnsWidth();

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
        header: PropTypes.arrayOf(PropTypes.object).isRequired,
        body: PropTypes.arrayOf(PropTypes.object),
        footer: PropTypes.arrayOf(PropTypes.object)
    }

    static defaultProps = {
        width: MAX_WIDTH,
        maxWidth: MAX_WIDTH,
        autoWidth: true
    }

    _getColumnsWidth() {
        const headerComponent = this.props.header;
        const rows = React.Children.toArray(headerComponent);
        const columnsWidth = [];

        function getWidthByRowIndex(rowIndex, cellStart, cellEnd) {
            console.log("----------------------");
            console.log("RowIndex: ", rowIndex);
            console.log("Start: ", cellStart);
            console.log("End: ", cellEnd);
            const row = rows[rowIndex];
            const cells = row.props.children.filter((item, index) => {
                if (index > cellEnd || index < cellStart) {
                    return false;
                }

                return true;
            });

            const cellWithColspan = cells.find(x => rowIndex > 0 && x.props.colSpan);
            cellEnd = cellWithColspan ? cellEnd - 1 : cellEnd;

            let currentCellIndex = 0;
            for(let cell of cells){
                const cellProps = cell.props;
                const colspan = Number(cellProps.colSpan);

                if (colspan && colspan > 1) {
                    const endIndex = currentCellIndex + colspan - 1;
                    getWidthByRowIndex(rowIndex + 1, currentCellIndex, endIndex);
                    currentCellIndex = endIndex + 1;
                }
                else {
                    const cellWidth = cellProps.colWidth ? cellProps.colWidth : DEFAULT_COLUMN_WIDTH;
                    columnsWidth.push(cellWidth);
                }
            }
        }

        getWidthByRowIndex(0, 0, rows[0].props.children.length - 1);

        console.log(columnsWidth);
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