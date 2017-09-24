import React, { Component, Children } from 'react';
import ReactDOM from 'react-dom';
import RowLayout from './RowLayout';
import PropTypes from 'prop-types';
import createTableSection from './TableSection';
import Row from './Row';
import Cell from './Cell';

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
        const headerRows = this.props.header;
        if (headerRows.length === 0) {
            return null;
        }

        const columnsWidth = [];

        const getWidthByCells = (cells, currentRowIndex) => {
            console.log("-------------------")
            console.log("currentRowIndex: ", currentRowIndex)

            let fromCellIndex = 0;
            for (let cell of cells) {              
                const cellProps = cell.props;
                const colspan = Number(cellProps.colSpan);

                if (colspan && colspan > 1) {
                    console.log("Processing colspan...")
                    let toCellIndex = fromCellIndex + colspan;
                    const nextRowIndex = currentRowIndex + 1;
                    const nextRow = headerRows[nextRowIndex];
                    const nextCells = nextRow.props.children;

                    console.log("nextRowIndex: ", nextRowIndex)
                    const colspanCells = this._getColspanCells(nextCells, fromCellIndex, toCellIndex - 1);

                    fromCellIndex += colspanCells.length;
                    getWidthByCells(colspanCells, nextRowIndex);                   
                }
                else {
                    const cellWidth = cellProps.colWidth ? cellProps.colWidth : DEFAULT_COLUMN_WIDTH;
                    columnsWidth.push(cellWidth);
                }

                console.log("Current result: ", columnsWidth);
            }
        }

        const cellListOfFirstRow = headerRows[0].props.children, currentRowIndex = 0;
        getWidthByCells(cellListOfFirstRow, currentRowIndex);


        return columnsWidth;
    }

    _getColspanCells(cells, fromCellIndex, toCellIndex) {
        console.log("fromCellIndex: ", fromCellIndex)
        console.log("toCellIndex: ", toCellIndex)
        const colspanCells = [];
        for (let i = fromCellIndex; i <= toCellIndex; i++) {
            console.log("i: ", i)
            console.log("toCellIndex", toCellIndex)
            const cell = cells[i];
            if(cell.props.colSpan){
                toCellIndex -= 1;
            }
            colspanCells.push(cells[i]);
        }

        return colspanCells;
    }

    get columnWidthSum() {
        return !this.columnsWidth || !this.columnsWidth.length || this.columnsWidth.find(x => typeof x !== "number") ?
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

        if (!newColumnLayout) {
            return null;
        }

        const sectionProps = { width, autoWidth, minWidth, maxWidth };
        const rowLayout = <RowLayout columnLayout={newColumnLayout} />;

        return (
            <div className="table-container" style={{ maxWidth }}>
                <Header {...sectionProps}>
                    {rowLayout}
                    {header}
                </Header>

                {
                    body &&
                    <Body {...sectionProps} maxHeight={bodyHeight}>
                        {rowLayout}
                        {body}
                    </Body>
                }

                {
                    footer &&
                    <Footer {...sectionProps}>
                        {rowLayout}
                        {footer}
                    </Footer>
                }
            </div>
        )
    }
}

export default Table;