import "babel-polyfill";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FixedTable from './FixedTable';
import FakeData from './fakeData';

const columnLayout = [300, 70, 150, 150, 200, 200, 100];
/* const columnLayout = ["20%", "10%", "10%", "10%", "10%", "10%", "30%"]; */
const { Table, Header, Body, Footer, Row, Cell } = FixedTable;
const { headers, data, totalData, grantTotal } = FakeData;

const container = document.getElementById("root");
const containerWidth = container.clientWidth;

class App extends Component {
    constructor(props) {
        super(props);
    }

    get header() {
        return (
            <Row>
                <th>Operator</th>
                <th>Currency</th>
                <th>Products</th>
                <th>Bet Count</th>
                <th>Turnover</th>
                <th>Customer Win Loss</th>
                <th>Operator WL/Comm</th>
            </Row>
        )
    }

    get body() {
        let rows = [];
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const rowSpan = item.Details.length;

            let isFirstRow = true;
            for (let j = 0; j < item.Details.length; j++) {
                const detail = item.Details[j];
                rows.push(
                    <Row key={`tr${i}${j}`}>
                        {isFirstRow ? <Cell rowSpan={rowSpan}>{item.Operator}</Cell> : undefined}
                        {isFirstRow ? <Cell rowSpan={rowSpan} className="center-align">{item.Currency}</Cell> : undefined}
                        <Cell className="center-align">{detail.Products}</Cell>
                        <Cell className="right-align">{detail.BetCount}</Cell>
                        <Cell className="right-align">{detail.Turnover}</Cell>
                        <Cell className="right-align">{detail.CustomerWinLoss}</Cell>
                        <Cell className="right-align">{detail.OperatorWinLoss}</Cell>
                    </Row>
                );

                isFirstRow = false;
            }
        }

        return rows;
    }

    get footer() {
        return totalData.map((item, index) => {
            return (
                <Row className="fixed-table-total" key={`total${index}`}>
                    <Cell>{`Total ${item.Operator}`}</Cell>
                    <Cell>{`Based ${item.Based}`}</Cell>
                    <Cell></Cell>
                    <Cell className="right-align">{item.BetCount}</Cell>
                    <Cell className="right-align">{item.Turnover}</Cell>
                    <Cell className="right-align">{item.CustomerWinLoss}</Cell>
                    <Cell className="right-align">{item.OperatorWinLoss}</Cell>
                </Row>
            )
        })
    }

    get grantTotal() {
        return (
            <Row className="fixed-table-grant-total" key="grantTotal">
                <Cell>Total</Cell>
                <Cell>{`Based ${grantTotal.Based}`}</Cell>
                <Cell></Cell>
                <Cell className="right-align">{grantTotal.BetCount}</Cell>
                <Cell className="right-align">{grantTotal.Turnover}</Cell>
                <Cell className="right-align">{grantTotal.CustomerWinLoss}</Cell>
                <Cell className="right-align">{grantTotal.OperatorWinLoss}</Cell>
            </Row>
        )
    }

    render() {
        return (
            <Table
                maxWidth={containerWidth}
                width={800}
                autoWidth={false}
                columnLayout={columnLayout}
                {...this.props}>

                <Header>
                    {this.header}
                </Header>

                <Body maxHeight={500}>
                    {this.body}
                </Body>

                <Footer>
                    {this.footer}
                    {this.grantTotal}
                </Footer>
            </Table>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));