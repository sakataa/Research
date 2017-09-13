function exportToSheet1() {
    const option = { bookType: 'xlsx', bookSST: false, type: 'binary' };
    const worksheet = getWorkSheetFromJsonData1();
    const workbook = { SheetNames: ['Subsidiary'], Sheets: {}, Props: {} };
    workbook.Sheets['Subsidiary'] = worksheet;
    var fname = 'jsontosheet.xlsx';

    var workbookOutput = XLSX.write(workbook, option);
    download(workbookOutput, fname);
}

function getWorkSheetFromJsonData1() {
    var summaryData = data.Data;
    var startOfDataRow = 1;
    var worksheet = getWorkSheetHeader();

    var range = getRangeOfSheet();
    var mergeRows = [];

    var nextRowIndex = startOfDataRow;
    for (var rowIndex = 0; rowIndex < summaryData.length; ++rowIndex) {
        var item = summaryData[rowIndex];
        var currentIndex = nextRowIndex;

        var details = item.Details;
        nextRowIndex = details.length + currentIndex;

        var col1 = getCellAddress({ c: 0, r: currentIndex });
        worksheet[col1] = { t: "s", v: item.Subsidiary };
        var col2 = getCellAddress({ c: 1, r: currentIndex });
        worksheet[col2] = { t: "s", v: item.Currency };

        mergeRows.push({ s: { r: currentIndex, c: 0 }, e: { r: currentIndex + details.length - 1, c: 0 } });
        mergeRows.push({ s: { r: currentIndex, c: 1 }, e: { r: currentIndex + details.length - 1, c: 1 } });

        for (var detailIndex = 0; detailIndex < details.length; ++detailIndex) {
            var detail = details[detailIndex];

            var col3 = getCellAddress({ c: 2, r: currentIndex + detailIndex });
            worksheet[col3] = { t: "s", v: detail.Product };
            var col4 = getCellAddress({ c: 3, r: currentIndex + detailIndex });
            worksheet[col4] = { t: "n", v: detail.BetCount, z: "#,##0" };
            var col5 = getCellAddress({ c: 4, r: currentIndex + detailIndex });
            worksheet[col5] = { t: "n", v: detail.Turnover, z: "#,##0.00" };
            var col6 = getCellAddress({ c: 5, r: currentIndex + detailIndex });
            worksheet[col6] = { t: "n", v: detail.CustomerWinLoss, z: "#,##0.00" };
            var col7 = getCellAddress({ c: 6, r: currentIndex + detailIndex });
            worksheet[col7] = { t: "n", v: detail.SubsidiaryWinLoss, z: "#,##0.00" };
        }
    }

    var cellStart = getCellAddress(range.s);
    var cellEnd = getCellAddress(range.e);

    worksheet["!merges"] = mergeRows;
    worksheet["!ref"] = cellStart + ":" + cellEnd;
    var wscols = [{ wpx: 150 }, { wpx: 120 }, { wpx: 180 }, { wpx: 120 }, { wpx: 250 }, { wpx: 250 }, { wpx: 250 }];
    var wsrows = [{ hpx: 20 }];

    worksheet['!cols'] = wscols;
    worksheet['!rows'] = wsrows;

    return worksheet;
}

function getWorkSheetHeader() {
    return {
        A1: { t: "s", v: "Subsidiary" },
        B1: { t: "s", v: "Currency" },
        C1: { t: "s", v: "Product" },
        D1: { t: "s", v: "Bet Count" },
        E1: { t: "s", v: "Turnover" },
        F1: { t: "s", v: "Customer Win Loss" },
        G1: { t: "s", v: "Subsidiary WL/ Comm" }
    }
}

function getRangeOfSheet() {
    var summaryData = data.Data;
    var numberOfColumn = 7;
    var count = 0;
    for (var index = 0; index < summaryData.length; index++) {
        var item = summaryData[index];

        count += item.Details.length;
    }

    return {
        s: { r: 0, c: 0 },
        e: { r: count, c: numberOfColumn }
    };
}

function getCellAddress(cellObject) {
    return indexToColumnName(cellObject.c) + (cellObject.r + 1).toString();
}

function indexToColumnName(num) {
    var ret = '',
        a = 1,
        b = 26;

    num += 1; //we assume index is start from 0

    while ((num -= a) >= 0) {
        ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
        a = b;
        b *= 26;
    }
    return ret;
}