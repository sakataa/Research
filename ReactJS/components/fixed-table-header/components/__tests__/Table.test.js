import React from 'react'
import renderer from 'react-test-renderer'

import Table from '../Table'
import Row from '../Row'
import Cell from '../Cell'
import { MAX_WIDTH, DEFAULT_MILLISECOND_FOR_WAITING, DEFAULT_COLUMN_WIDTH, BODY_WIDTH } from '../../constants'

const defaultHeader = [
    <Row>
        <Cell rowspan="3" colWidth={120}>Cell 1</Cell>
        <Cell rowspan="3" colWidth={200}>Cell 2</Cell>
        <Cell colSpan="3">Cell 3</Cell>
        <Cell rowspan="3" colSpan={2}>Cell 4</Cell>
    </Row>,
    <Row>
        <Cell colSpan="2">Cell 3.1</Cell>
        <Cell rowspan="2">Cell 3.2</Cell>

        <Cell colWidth={300}>Cell 4.1</Cell>
        <Cell>Cell 4.2</Cell>
    </Row>,
    <Row>
        <Cell>Cell 3.1.1</Cell>
        <Cell colWidth={50}>Cell 3.1.2</Cell>
    </Row>
]

const defaultProps = {
    width: MAX_WIDTH,
    maxWidth: MAX_WIDTH,
    minWidth: undefined,
    autoWidth: true,
    bodyHeight: undefined,
    header: defaultHeader,
    body: undefined,
    footer: undefined
}

describe('Table ', () => {
    afterAll(() => {
        jest.resetAllMocks();
    })

    describe('initial internal state', () => {
        it('diffWidth should be correct value', () => {
            const expectedResult = BODY_WIDTH - defaultProps.maxWidth;

            const table = new Table(defaultProps);

            const result = table.diffWidth;

            expect(result).toBe(expectedResult);
        })

        describe('columnsWidth', () => {
            it('header is a empty array - columnsWidth should be null', () => {
                const props = Object.assign({}, defaultProps, { header: [] });
                const table = new Table(props);

                const result = table.columnsWidth;

                expect(result).toBeNull();
            })

            it('header is a Row - columnsWidth should be correct value', () => {
                const expectedResult = [120, 200, 100, 50, 100, 300, 100];

                const table = new Table(defaultProps);

                const result = table.columnsWidth;

                expect(result).toEqual(expectedResult);
            })
        })

        describe('state', () => {
            it('initial state should be correct value', () => {
                const expectedResult = {
                    maxWidth: defaultProps.maxWidth
                }

                const table = new Table(defaultProps);

                const result = table.state;

                expect(result).toEqual(expectedResult)
            })
        })
    })

    describe('columnWidthSum', () => {
        it('columnsWidth is an array of number - value should be correct', () => {
            const expectedResult = 970;

            const table = new Table(defaultProps);

            const result = table.columnWidthSum;

            expect(result).toBe(expectedResult);
        })

        it('columnsWidth is an empty array - return null', () => {
            const props = Object.assign({}, defaultProps, { header: [] });
            const table = new Table(props);

            const result = table.columnWidthSum;

            expect(result).toBeNull();
        })

        it('columnsWidth is an array of string - return null', () => {
            const header = (
                <Row>
                    <Cell colWidth="10%">Cell 1</Cell>
                    <Cell colWidth="20%">Cell 2</Cell>
                </Row>
            )
            const props = Object.assign({}, defaultProps, { header });
            const table = new Table(props);

            const result = table.columnWidthSum;

            expect(result).toBeNull();
        })
    })

    describe('_getUpdatedColumnLayout', () => {
        it('autoWidth = true - sumOfColumnWidth is maxWidth - return correct value', () => {
            const expectedResult = [120, 180];
            const header = (
                <Row>
                    <Cell colWidth={80}>Cell 1</Cell>
                    <Cell colWidth={120}>Cell 2</Cell>
                </Row>
            )

            const props = Object.assign({}, defaultProps, { maxWidth: 319, header });
            const table = new Table(props);

            const result = table._getUpdatedColumnLayout();

            expect(result).toEqual(expectedResult);
        })

        it('autoWidth = false - sumOfColumnWidth is width - return correct value', () => {
            const expectedResult = [200, 200];
            const header = (
                <Row>
                    <Cell colWidth={100}>Cell 1</Cell>
                    <Cell colWidth={100}>Cell 2</Cell>
                </Row>
            )

            const props = Object.assign({}, defaultProps, { autoWidth: false, width: 419, header });
            const table = new Table(props);

            const result = table._getUpdatedColumnLayout();

            expect(result).toEqual(expectedResult);
        })
    })

    describe('render', () => {
        it('columnsWidth is null - return null', () => {
            const header = [];
            const props = Object.assign({}, defaultProps, { header });
            const table = new Table(props);

            const result = table.render();

            expect(result).toBeNull();
        })

        it('columnsWidth is not null - return content that match with snapshot', () => {
            const header = [<Row key="header"><Cell>Header 1</Cell></Row>];
            const body = [<Row key="body"><Cell>Body 1</Cell></Row>];
            const footer = [<Row key="footer"><Cell>Footer 1</Cell></Row>];

            const options = {
                createNodeMock: (element) => {
                    return {
                        offsetHeight: 1,
                        offsetTop: 1
                    };
                }
            };

            const props = Object.assign({}, defaultProps, { header, body, footer });
            const table = renderer.create(<Table {...props} />, options);

            const result = table.toJSON();

            expect(result).toMatchSnapshot();
        })

        it('isPaging is true - return content with paging that match with snapshot', () => {
            const header = [<Row key="header"><Cell>Header 1</Cell></Row>];
            const body = [<Row key="body"><Cell>Body 1</Cell></Row>];
            const footer = [<Row key="footer"><Cell>Footer 1</Cell></Row>];
            const paging = {
                isPaging: true,
                pageOption: {
                    PageIndex: 1,
                    PageSize: 5,
                    PageList: [5, 10, 20],
                    TotalItem: 15
                }
            };

            const options = {
                createNodeMock: (element) => {
                    return {
                        offsetHeight: 1,
                        offsetTop: 1
                    };
                }
            };
            const props = Object.assign({}, defaultProps, paging, { header, body, footer });
            const table = renderer.create(<Table {...props} />, options);

            const result = table.toJSON();

            expect(result).toMatchSnapshot();
        })
    })

    describe('_handleResize', () => {
        const event = {
            preventDefault: jest.fn()
        }

        it('contentHeight of state = bodyHeight of calculation - do nothing', () => {
            const table = new Table(defaultProps);
            table.setState = jest.fn();
            table._calculateBodyHeight = jest.fn(() => defaultProps.bodyHeight);

            table._handleResize(event);

            expect(table.setState).not.toHaveBeenCalled();
        })

        it('contentHeight of state = bodyHeight of calculation - do nothing', () => {
            const table = new Table(defaultProps);
            table.setState = jest.fn();
            table._calculateBodyHeight = jest.fn(() => defaultProps.bodyHeight);

            table._handleResize(event);

            expect(table.setState).not.toHaveBeenCalled();
        })

        it('maxWidth of state = document.body.clientWidth - this.diffWidth - do nothing', () => {
            const table = new Table(defaultProps);
            table.setState = jest.fn();

            const bodyHeight = defaultProps.bodyHeight - 1;
            table._calculateBodyHeight = jest.fn(() => bodyHeight);

            const expectedState = {
                contentHeight: bodyHeight
            }

            table._handleResize(event);

            expect(table.setState).toHaveBeenCalledWith(expectedState);
        })

        it('maxWidth of state != document.body.clientWidth - this.diffWidth - setState function should be called with correct parameter', () => {
            const table = new Table(defaultProps);
            table._calculateBodyHeight = jest.fn(() => defaultProps.bodyHeight);
            table.diffWidth = 50;
            const expectedState = {
                maxWidth: document.body.clientWidth - table.diffWidth
            }

            table.setState = jest.fn();

            table._handleResize(event);

            expect(table.setState).toHaveBeenCalledWith(expectedState);
        })
    })

    describe('componentDidMount', () => {
        it('_handleResize function should be called', () => {
            const table = new Table(defaultProps);
            table._handleResize = jest.fn();

            table.componentDidMount();

            expect(table._handleResize).toHaveBeenCalled();
        })

        it('window.addEventListener function should be called with correct event name', () => {
            const originalAddEventListenerFunction = window.addEventListener;
            const table = new Table(defaultProps);
            table._handleResize = jest.fn();
            window.addEventListener = jest.fn();

            table.componentDidMount();

            expect(window.addEventListener.mock.calls[0][0]).toBe('resize');

            window.addEventListener = originalAddEventListenerFunction;
        })

        it('window.resize fired - _handleResize function should be called after 500ms', () => {
            jest.useFakeTimers();
            const table = new Table(defaultProps);
            table._handleResize = jest.fn();

            table.componentDidMount();

            window.dispatchEvent(new Event('resize'));
            jest.runTimersToTime(400);
            window.dispatchEvent(new Event('resize'));
            jest.runTimersToTime(501);

            expect(table._handleResize.mock.calls.length).toBe(2);
        })
    })

    describe('componentWillUnmount', () => {
        it('window.removeEventListener function should be called with correct event name', () => {
            const originalRemoveEventListenerFunction = window.removeEventListener;
            const table = new Table(defaultProps);
            table._handleResize = jest.fn();
            window.removeEventListener = jest.fn();

            table.componentWillUnmount();

            expect(window.removeEventListener.mock.calls[0][0]).toBe('resize');

            window.removeEventListener = originalRemoveEventListenerFunction;
        })
    })
})