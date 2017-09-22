import "babel-polyfill";
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import { Table, Header, Body, Footer, Row, Cell } from './FixedTable';
import FakeData from './fakeData';
import NumberFormat from './numberFormat';

const container = document.getElementById("root");
const containerWidth = container.clientWidth;

class App extends Component {
    constructor(props) {
        super(props);

        this.reportTitle = "";

        this.data = FakeData;
    }

    get header() {
        return (
            <Row style={{ height: 32 }}>
                <Cell width={150} header={true}>Subsidiary</Cell>
                <Cell width={150} header={true}>Currency</Cell>
                <Cell width={200} header={true}>Product</Cell>
                <Cell width={150} header={true}>BetCount</Cell>
                <Cell width={200} header={true}>Turnover</Cell>
                <Cell width={200} header={true}>Customer W/L</Cell>
                <Cell width={200} header={true}>SubsidiaryWL/ Comm</Cell>
            </Row>
        )
    }

    get body() {
        /* const data = this.props.gridData.Data; */
        const data = this.data.Data;
        let rows = [];
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const rowSpan = item.Details.length;

            let isFirstRow = true;
            for (let j = 0; j < item.Details.length; j++) {
                const detail = item.Details[j];
                const betcount = NumberFormat.format(detail.BetCount),
                    turnover = NumberFormat.formatDecimal(detail.Turnover),
                    customerWinLoss = NumberFormat.formatDecimal(detail.CustomerWinLoss),
                    subsidiaryWinLoss = NumberFormat.formatDecimal(detail.SubsidiaryWinLoss);

                rows.push(
                    <Row key={`tr${i}${j}`}>
                        {isFirstRow ? <Cell title={item.Subsidiary} rowSpan={rowSpan}>{item.Subsidiary}</Cell> : undefined}
                        {isFirstRow ? <Cell title={item.CurrencyName} rowSpan={rowSpan} className="center-align">{item.CurrencyName}</Cell> : undefined}
                        <Cell title={detail.Product}>{detail.Product}</Cell>
                        <Cell title={betcount} className="right-align">{betcount}</Cell>
                        <Cell title={turnover} className="right-align">{turnover}</Cell>
                        <Cell title={customerWinLoss} className="right-align">{customerWinLoss}</Cell>
                        <Cell title={subsidiaryWinLoss} className={`right-align ${detail.SubsidiaryWinLoss < 0 ? "negative" : ""}`}>
                            {subsidiaryWinLoss}
                        </Cell>
                    </Row>
                );

                isFirstRow = false;
            }
        }

        return rows;
    }

    get footer() {
        /* const totalData = this.props.gridData.Total; */
        const totalData = this.data.Total;
        return totalData.map((item, index) => {
            const betcount = NumberFormat.format(item.BetCount),
                turnover = NumberFormat.formatDecimal(item.Turnover),
                customerWinLoss = NumberFormat.formatDecimal(item.CustomerWinLoss),
                subsidiaryWinLoss = NumberFormat.formatDecimal(item.SubsidiaryWinLoss);

            return (
                <Row className="fixed-table-total" key={`total${index}`}>
                    <Cell title={item.Subsidiary}>{item.Subsidiary}</Cell>
                    <Cell title={item.CurrencyName}>{item.CurrencyName}</Cell>
                    <Cell></Cell>
                    <Cell title={betcount} className="right-align">{betcount}</Cell>
                    <Cell title={turnover} className="right-align">{turnover}</Cell>
                    <Cell title={customerWinLoss} className="right-align">{customerWinLoss}</Cell>
                    <Cell title={subsidiaryWinLoss} className={`right-align ${item.SubsidiaryWinLoss < 0 ? "negative" : ""}`}>
                        {subsidiaryWinLoss}
                    </Cell>
                </Row>
            )
        })
    }

    get grandTotal() {
        /* const grandTotal = this.props.gridData.GrandTotal; */
        const grandTotal = this.data.GrandTotal;
        if (!grandTotal) {
            return null;
        }

        const betcount = NumberFormat.format(grandTotal.BetCount),
            turnover = NumberFormat.formatDecimal(grandTotal.Turnover),
            customerWinLoss = NumberFormat.formatDecimal(grandTotal.CustomerWinLoss),
            subsidiaryWinLoss = NumberFormat.formatDecimal(grandTotal.SubsidiaryWinLoss);

        return (
            <Row className="fixed-table-grant-total">
                <Cell title={grandTotal.Subsidiary}>{grandTotal.Subsidiary}</Cell>
                <Cell title={grandTotal.CurrencyName}>{grandTotal.CurrencyName}</Cell>
                <Cell></Cell>
                <Cell title={betcount} className="right-align">{betcount}</Cell>
                <Cell title={turnover} className="right-align">{turnover}</Cell>
                <Cell title={customerWinLoss} className="right-align">{customerWinLoss}</Cell>
                <Cell title={subsidiaryWinLoss} className="right-align">{subsidiaryWinLoss}</Cell>
            </Row>
        )
    }

    render() {
        /* const { Data } = this.props.gridData; */
        const { Data } = this.data;
        if (!Data) {
            return null;
        }

        if (!Data.length) {
            return this._renderNodata();
        }

        return (
            <div className="result-content">
                <Table
                    minWidth={600}
                    autoWidth={true}
                    {...this.props}>

                    <Header>
                        {this.header}
                    </Header>

                    <Body maxHeight={300}>
                        {this.body}
                    </Body>

                    <Footer>
                        {this.footer}
                        {this.grandTotal}
                    </Footer>
                </Table>
            </div>
        );
    }
}

ReactDOM.render(< App />, document.getElementById("root"));