import * as XLSX from 'xlsx-style';

//var type = "xlsx";
//var bookType = "xlsx";

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

function sheetToArrayBuffer(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

function download(wbout, fname) {
    const base64String = sheetToArrayBuffer(wbout);
    const blob = new Blob([base64String], {
        type: "application/octet-stream"
    });

    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = fname;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}

const type = "xlsx";
const bookType = "xlsx";

function exportExcel() {
    const worksheet = getWorkSheet();
    const workbook = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
    workbook.Sheets['Sheet1'] = worksheet;
    const fname = 'jsontosheet.' + type;

    const option = { bookType: bookType, bookSST: false, type: 'binary' };
    const workbookOutput = XLSX.write(workbook, option);
    download(workbookOutput, fname);
}

function getWorkSheet() {
    return {
        A1: { t: "s", v: "Subsidiary" },
        B1: { t: "s", v: "Currency" },
        C1: { t: "s", v: "Product" },
        D1: { t: "s", v: "BetCount" },
        E1: { t: "s", v: "Turnover" },

        A2: { t: "s", v: "New York" },
        B2: { t: "s", v: "EUR" },
        C2: { t: "s", v: "Sportsbook" },
        D2: { t: "n", v: 1500, z: "#,##0" },
        E2: { t: "n", v: 891237.55, z: "#,##0.00" },

        A3: { t: "s", v: "Chicago" },
        C3: { t: "s", v: "Racing" },
        D3: { t: "n", v: 2000, z: "#,##0" },
        E3: { t: "n", v: 891237.55, z: "#,##0.00" },

        "!ref": "A1:E3",
        "!merges": [
            { s: { r: 1, c: 1 }, e: { r: 2, c: 1 } } /* B1:B2 */
        ],
        "!cols": [{ wpx: 150 }, { wpx: 120 }, { wpx: 180 }, { wpx: 120 }, { wpx: 200 }],
        "!rows": [{ hpx: 100 }]
    }
}

window.onload = function() {
    console.log("AAA");
    console.log(XLSX);
    console.log(XLSX.utils.encode_cell({ c: 1, r: 1 }));

    const button = document.getElementById("btnExportExcel");
    button.addEventListener("click", function() {
        exportExcel();
    })
}