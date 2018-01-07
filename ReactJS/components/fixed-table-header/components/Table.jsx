import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RowLayout from './RowLayout';
import PropTypes from 'prop-types';
import createTableSection from './tableSection';
import { MAX_WIDTH, DEFAULT_MILLISECOND_FOR_WAITING, DEFAULT_COLUMN_WIDTH, BODY_WIDTH, SCROLLBAR_WIDTH } from '../constants';
import Page from './Page';

const MAX_ITEM = 50;
const ROW_HEIGHT = 21;

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

        const headerContainerProps = { className: "header-content", isHeader: true };
        this.Header = createTableSection(headerContainerProps);

        const bodyContainerProps = { className: "body-content", getRef: element => this.bodyWrapper = element };
        this.Body = createTableSection(bodyContainerProps);

        const footerContainerProps = { className: "footer-content", getRef: element => this.footerWrapper = element };
        this.Footer = createTableSection(footerContainerProps);

        this.diffWidth = BODY_WIDTH - props.maxWidth;
        this.columnsWidth = this._getColumnsWidth();
        this.state = {
            maxWidth: props.maxWidth,
            contentHeight: props.bodyHeight
        }
        this.adjustedHeight = props.adjustedHeight;

        this.pagingInfo = {
            pageSize: MAX_ITEM,
            totalRows: this.props.body.length,
            pageIndex: 0,
            isLoading: false
        }
        this.lastScroll = 0;

        this.state = {
            bodyData: this._getBodyData()
        }
    }

    static propTypes = {
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        maxWidth: PropTypes.number,
        minWidth: PropTypes.number,
        autoWidth: PropTypes.bool,
        bodyHeight: PropTypes.number,
        header: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]).isRequired,
        body: PropTypes.arrayOf(PropTypes.object),
        footer: PropTypes.arrayOf(PropTypes.object),
        isPaging: PropTypes.bool,
        onPaging: PropTypes.func,
        pageOption: PropTypes.object,
        adjustedHeight: PropTypes.number
    }

    static defaultProps = {
        width: MAX_WIDTH,
        maxWidth: MAX_WIDTH,
        autoWidth: true,
        isPaging: false,
        adjustedHeight: 0
    }

    _getBodyData = () => {
        const bodyData = [];
        for (let i = 0; i < this.pagingInfo.pageSize; i++) {
            bodyData.push(this.props.body[i]);
        }

        return bodyData;
    }

    handleScroll = (event) => {
        event.preventDefault();
        if (this.pagingInfo.isLoading) {
            return;
        }

        const { scrollHeight, clientHeight, scrollTop } = event.target;

        if (scrollHeight > clientHeight) {
            const pagingInfo = this.pagingInfo;

            const totalPage = Math.ceil((pagingInfo.totalRows / pagingInfo.pageSize));
            let bodyData = [];
            if (scrollTop >= this.lastScroll) { //scroll down
                const maxScrollTopPerPage = (((pagingInfo.pageIndex + 1) * MAX_ITEM) - (MAX_ITEM / 2)) * ROW_HEIGHT;
                if (scrollTop >= maxScrollTopPerPage && pagingInfo.pageIndex < totalPage) {
                    console.log("Begin process scrolling down");
                    pagingInfo.isLoading = true;
                    pagingInfo.pageIndex++;

                    console.log("pagingInfo.pageIndex:", pagingInfo.pageIndex);
                    let startIndex = pagingInfo.pageIndex * pagingInfo.pageSize;
                    let endIndex = startIndex + pagingInfo.pageSize;

                    if (endIndex > pagingInfo.totalRows) {
                        startIndex = pagingInfo.totalRows - pagingInfo.pageSize - 1;
                        endIndex = pagingInfo.totalRows;
                    }

                    console.log(`start: ${startIndex}, end: ${endIndex - 1}`);
                    for (let i = startIndex; i < endIndex; i++) {
                        bodyData.push(this.props.body[i]);
                    }

                    if (bodyData.length) {
                        bodyData = pagingInfo.pageIndex % 2 !== 0 ?
                            [...this.state.bodyData, ...bodyData] :
                            [...this.state.bodyData.slice(pagingInfo.pageSize), ...bodyData];

                        this.setState({ bodyData });
                    }
                }
            }
            else { // scroll up
                const minScrollTopPerPage = ((pagingInfo.pageIndex * MAX_ITEM) - (MAX_ITEM / 2)) * ROW_HEIGHT;
                if (scrollTop < minScrollTopPerPage && pagingInfo.pageIndex > 0) {
                    console.log("Begin process scrolling up");
                    pagingInfo.isLoading = true;
                    pagingInfo.pageIndex--;

                    console.log("pagingInfo.pageIndex:", pagingInfo.pageIndex);
                    let startIndex = pagingInfo.pageIndex * pagingInfo.pageSize;
                    let endIndex = startIndex + pagingInfo.pageSize;

                    console.log(`start: ${startIndex}, end: ${endIndex - 1}`);
                    for (let i = startIndex; i < endIndex; i++) {
                        bodyData.push(this.props.body[i]);
                    }

                    if (bodyData.length) {
                        bodyData = pagingInfo.pageIndex % 2 === 0 ?
                            [...bodyData, ...this.state.bodyData] :
                            [...bodyData, ...this.state.bodyData.slice(0, pagingInfo.pageSize)];

                        this.setState({ bodyData });
                    }
                }
            }

            pagingInfo.isLoading = false;
            this.lastScroll = scrollTop;
            this.bodyWrapper.scrollTop = this.lastScroll;
        }
    }

    _getColumnsWidth() {
        const headerRows = this.props.header;
        const headerIsArray = Array.isArray(headerRows);
        if (headerIsArray && headerRows.length === 0) {
            return null;
        }

        const columnsWidth = [];
        const currentNextCellIndexByRow = {};

        const getWidthByCells = (cells, currentRowIndex) => {
            for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                if (!cell) {
                    continue;
                }

                const cellProps = cell.props;
                const colspan = Number(cellProps.colSpan);

                if (colspan && colspan > 1) {
                    const nextRowIndex = currentRowIndex + 1;
                    if (currentNextCellIndexByRow[nextRowIndex] === undefined) {
                        currentNextCellIndexByRow[nextRowIndex] = 0;
                    }
                    const fromNextCellIndex = currentNextCellIndexByRow[nextRowIndex];
                    const toNextCellIndex = fromNextCellIndex + colspan - 1;
                    const nextCells = headerRows[nextRowIndex].props.children;

                    const nextColspanCells = this._getNextColspanCells(nextCells, fromNextCellIndex, toNextCellIndex);
                    currentNextCellIndexByRow[nextRowIndex] += nextColspanCells.length;
                    getWidthByCells(nextColspanCells, nextRowIndex);
                }
                else {
                    const cellWidth = cellProps.colWidth ? cellProps.colWidth : DEFAULT_COLUMN_WIDTH;
                    columnsWidth.push(cellWidth);
                }
            }
        }

        const currentRowIndex = 0;
        const cellList = headerIsArray ? headerRows[currentRowIndex].props.children : headerRows.props.children;
        getWidthByCells(cellList, currentRowIndex);

        return columnsWidth;
    }

    _getNextColspanCells(cells, fromCellIndex, toCellIndex) {
        const colspanCells = [];
        for (let i = fromCellIndex; i <= toCellIndex; i++) {
            const cell = cells[i];
            if (cell.props.colSpan) {
                toCellIndex -= 1;
            }
            colspanCells.push(cell);
        }

        return colspanCells;
    }

    get columnWidthSum() {
        return !this.columnsWidth || !this.columnsWidth.length || this.columnsWidth.find(x => typeof x !== "number") ?
            null : this.columnsWidth.reduce((prev, current) => prev + current, 0);
    }

    componentDidMount() {
        this._handleResize();
        window.addEventListener('resize', debounce(this._handleResize));
        this.bodyWrapper.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', debounce(this._handleResize))
    }

    componentWillReceiveProps(nextProps) {
        this.columnsWidth = this._getColumnsWidth();
    }

    _handleResize = (event) => {
        event && event.preventDefault();

        const bodyHeight = this._calculateBodyHeight();
        if (this.state.contentHeight !== bodyHeight) {
            this.setState({ contentHeight: bodyHeight });
        }

        const maxWidth = document.body.clientWidth - this.diffWidth;
        if (this.state.maxWidth !== maxWidth) {
            this.setState({ maxWidth });
        }
    }

    _calculateBodyHeight() {
        const windowHeight = window.innerHeight;
        const footerHeight = this.footerWrapper ? this.footerWrapper.offsetHeight : 0;
        const tableContentHeight = windowHeight - (this.bodyWrapper.offsetTop + footerHeight + 30) - this.adjustedHeight;

        return tableContentHeight;
    }

    _getUpdatedColumnLayout() {
        const { width, autoWidth } = this.props;
        let sumOfColumnWidth = autoWidth ? this.state.maxWidth : width;
        sumOfColumnWidth = sumOfColumnWidth - SCROLLBAR_WIDTH;

        const newColumnsWidth = this.columnWidthSum && this.columnsWidth.map(cellWidth => {
            return sumOfColumnWidth / this.columnWidthSum * cellWidth
        });

        return newColumnsWidth;
    }

    render() {
        const { width, autoWidth, minWidth, header, body, footer, isPaging, pageOption, onPaging } = this.props;
        const maxWidth = this.state.maxWidth;
        const { bodyData } = this.state;

        const newColumnLayout = this.columnWidthSum && this.columnWidthSum !== width ?
            this._getUpdatedColumnLayout() :
            this.columnsWidth;

        if (!newColumnLayout) {
            return null;
        }

        const sectionProps = { width, autoWidth, minWidth, maxWidth };
        const bodyWrapperStyle = {
            height: this.props.body.length * ROW_HEIGHT
        }

        this.elasticHeight = this.pagingInfo.pageIndex % 2 !== 0 ?
            (this.elasticHeight || 0)
            : (this.pagingInfo.pageIndex * MAX_ITEM / 2) * ROW_HEIGHT;
        const elasticStyle = {
            height: this.pagingInfo.pageIndex == 0 ? 0 : this.elasticHeight
        }
        console.log("elastic:", elasticStyle.height);
        const rowLayout = <RowLayout columnLayout={newColumnLayout} />;

        const Header = this.Header;
        const Body = this.Body;
        const Footer = this.Footer;

        return (
            <div className="table-container" style={{ maxWidth, marginTop: 0 }}>
                <Header {...sectionProps}>
                    {rowLayout}
                    {header}
                </Header>

                {
                    bodyData.length > 0 &&
                    <Body {...sectionProps} maxHeight={this.state.contentHeight} wrapperStyle={bodyWrapperStyle} elasticStyle={elasticStyle}>
                        {rowLayout}
                        {bodyData}
                    </Body>
                }

                {
                    footer &&
                    <Footer {...sectionProps}>
                        {rowLayout}
                        {footer}
                    </Footer>
                }

                {
                    isPaging && pageOption &&
                    <Page pageOption={pageOption} onPaging={onPaging} />
                }
            </div>
        )
    }
}

export default Table;