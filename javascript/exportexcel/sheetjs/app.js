var type = "xlsx";

const data = [{
    Id: 0,
    Operator: "New York",
    Currency: "USD",

    Details: [{
        Products: "All",
        BetCount: 50,
        Turnover: "100,000.00",
        CustomerWinLoss: "10,000",
        OperatorWinLoss: "-10,000"
    },
    {
        Products: "Sportsbook",
        BetCount: 25,
        Turnover: "50,000.00",
        CustomerWinLoss: "5,000",
        OperatorWinLoss: "4950,000"
    },
    {
        Products: "BA",
        BetCount: 25,
        Turnover: "50,000.00",
        CustomerWinLoss: "5,000",
        OperatorWinLoss: "50,000"
    }
    ]
},
{
    Id: 1,
    Operator: "India",
    Currency: "THB",
    Details: [{
        Products: "All",
        BetCount: 50,
        Turnover: "100,000.00",
        CustomerWinLoss: "10,000",
        OperatorWinLoss: "-10,000"
    }]
},
{
    Id: 2,
    Operator: "New York",
    Currency: "USD",

    Details: [{
        Products: "All",
        BetCount: 50,
        Turnover: "100,000.00",
        CustomerWinLoss: "10,000",
        OperatorWinLoss: "-10,000"
    }]
}
];

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

function sheetToArrayBuffer(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

function download(wbout, fname) {
    try {
        console.log(wbout)
        var base64String = s2ab(wbout);
        console.log(base64String);
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

function exportExcel() {
    var table = document.getElementById('table');
    var workbook = XLSX.utils.table_to_book(table);

    var wbout = XLSX.write(workbook, { bookType: type, bookSST: true, type: 'binary' });
    var fname = 'test.' + type;

    download(wbout, fname);
}

function jsonToSheet() {
    var data1 = [
        { "agentNo": "324234", "subName": "30, Jul 2013 09:24 AM", "A": 5, "B": 6, "C": 7 },
        { "agentNo": "444443", "subName": "30, Jul 2013 09:24 AM", "A": 5, "B": 6, D: 8 }
    ];
    const option = { bookType: 'xlsx', bookSST: false, type: 'binary' };
    const worksheet = XLSX.utils.json_to_sheet(data1);
    const workbook = { SheetNames: ['Export'], Sheets: {}, Props: {} };
    workbook.Sheets['Export'] = worksheet;
    var fname = 'jsontosheet.' + type;

    var workbookOutput = XLSX.write(workbook, option);
    download(workbookOutput, fname);
}

function exportExcelManually() {
    const option = { bookType: 'xlsx', bookSST: false, type: 'binary' };
    const worksheet = getWorkSheetHeader();
    const workbook = { SheetNames: ['Export'], Sheets: {}, Props: {} };
    workbook.Sheets['Export'] = worksheet;
    var fname = 'jsontosheet.' + type;

    var workbookOutput = XLSX.write(workbook, option);
    download(workbookOutput, fname);
}

function getWorkSheet() {
    return {
        "!ref": "A1:G7",
        A1: { t: "s", v: "Subsidiary" },                    // <-- General format
        B1: { t: "s", v: "Currency" },           // <-- Builtin format
        C1: { t: "s", v: 10000, z: "#,##0.00" },  // <-- Custom format
        A2: { t: "s", v: 20000 },                    // <-- General format
        B2: { t: "s", v: 20000, z: "0%" },           // <-- Builtin format
        C2: { t: "s", v: 20000, z: "#,##0.00" },  // <-- Custom format
        "!merges": [
            { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } } /* A1:A2 */
        ]
    }
}

function getWorkSheetHeader() {
    return {
        "!ref": "A1:G7",
        A1: { t: "s", v: "Subsidiary" },
        B1: { t: "s", v: "Currency" },           
        C1: { t: "s", v: "Product" },
        C2: { t: "s", v: "SB" },
        D2: { t: "s", v: "BA" },
        E2: { t: "s", v: "RC" },
        "!merges": [
            { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
            { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
            { s: { r: 0, c: 2 }, e: { r: 0, c: 4 } }
        ]
    }
}

function exportExcelFromJsonData() {
}

function getWorkSheetFromJsonData() {
    var columnCount = 7;
    var worksheet = {}

    var numberOfHeaderRow = 2;
    var totalRowCount = 0;

    var range = getRangeOfSheet();

    for (var R = range.s.r; R <= range.e.r; ++R) {
        for (var C = range.s.c; C <= range.e.c; ++C) {
            var cell_address = { c: C, r: R };
            var v = data[R];
        }
    }
}

function getRangeOfSheet() {
    var count = 0;
    for (var index = 0; index < data.length; index++) {
        var item = data[index];

        count += item.Details.length;
    }

    return {
        s: { r: 0, c: 0 },
        e: { r: count, c: 7 }
    };
}