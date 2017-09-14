function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

function download1(wbout, fname) {
    try {
        var base64String = s2ab(wbout);
        var blob = new Blob([base64String], { type: "application/octet-stream" });

        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = fname;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    } catch (e) {
        if (typeof console != 'undefined') console.log(e, wbout);
    }
}

function exportToSheet1() {
    var option = { bookType: 'xlsx', bookSST: false, type: 'binary' };
    var worksheet = getWorkSheetFromJsonData1();
    var workbook = { SheetNames: ['Subsidiary'], Sheets: {}, Props: {} };
    workbook.Sheets['Subsidiary'] = worksheet;
    var fname = 'jsontosheet.xlsx';

    var workbookOutput = XLSX.write(workbook, option);
    download1(workbookOutput, fname);
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
        worksheet[col1] = { t: "s", v: item.Subsidiary, s: { alignment: { vertical: "center" } } };
        var col2 = getCellAddress({ c: 1, r: currentIndex });
        worksheet[col2] = { t: "s", v: item.Currency, s: { alignment: { vertical: "center", horizontal: "center" } } };

        mergeRows.push({ s: { r: currentIndex, c: 0 }, e: { r: currentIndex + details.length - 1, c: 0 } });
        mergeRows.push({ s: { r: currentIndex, c: 1 }, e: { r: currentIndex + details.length - 1, c: 1 } });

        for (var detailIndex = 0; detailIndex < details.length; ++detailIndex) {
            var detail = details[detailIndex];

            var col3 = getCellAddress({ c: 2, r: currentIndex + detailIndex });
            worksheet[col3] = { t: "s", v: detail.Product };
            var col4 = getCellAddress({ c: 3, r: currentIndex + detailIndex });
            worksheet[col4] = { t: "n", v: detail.BetCount, s: { numFmt: "#,##0" } };
            var col5 = getCellAddress({ c: 4, r: currentIndex + detailIndex });
            worksheet[col5] = { t: "n", v: detail.Turnover, s: { numFmt: "#,##0.00" } };
            var col6 = getCellAddress({ c: 5, r: currentIndex + detailIndex });
            worksheet[col6] = { t: "n", v: detail.CustomerWinLoss, s: { numFmt: "#,##0.00" } };
            var col7 = getCellAddress({ c: 6, r: currentIndex + detailIndex });
            worksheet[col7] = { t: "n", v: detail.SubsidiaryWinLoss, s: { numFmt: "#,##0.00" } };
        }
    }

    var cellStart = getCellAddress(range.s);
    var cellEnd = getCellAddress(range.e);

    worksheet["!merges"] = mergeRows;
    worksheet["!ref"] = cellStart + ":" + cellEnd;
    var wscols = [{ wpx: 150 }, { wpx: 120 }, { wpx: 180 }, { wpx: 120 }, { wpx: 250 }, { wpx: 250 }, { wpx: 250 }];
    var wsrows = [{ hpx: 40 }];

    worksheet['!cols'] = wscols;
    worksheet['!rows'] = wsrows;

    return worksheet;
}

function getWorkSheetHeader() {
    var headerStyle = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        alignment: { horizontal: "center" },
        fill: {
            patternType: "solid",
            fgColor: { rgb: "4C6375" }
        },
        border: { left: { style: "thin", color: { rgb: "D6D6D6" } } }
    };
    return {
        A1: { t: "s", v: "Subsidiary", s: headerStyle },
        B1: { t: "s", v: "Currency", s: headerStyle },
        C1: { t: "s", v: "Product", s: headerStyle },
        D1: { t: "s", v: "Bet Count", s: headerStyle },
        E1: { t: "s", v: "Turnover", s: headerStyle },
        F1: { t: "s", v: "Customer Win Loss", s: headerStyle },
        G1: { t: "s", v: "Subsidiary WL/ Comm", s: headerStyle }
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