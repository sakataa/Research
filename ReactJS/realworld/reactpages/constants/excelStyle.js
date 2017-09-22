export const titleCellStyle = {
    font: { color: { rgb: "FFFFFF" } },
    fill: {
        patternType: "solid",
        fgColor: { rgb: "4C6375" }
    }
}

export const headerCellStyle = {
    font: { bold: true, color: { rgb: "2C2C2C" }, sz: "12" },
    alignment: { horizontal: "center", vertical: "center" },
    fill: { patternType: "solid", fgColor: { rgb: "9EB4C3" } },
    border: { left: { style: "thin", color: { rgb: "D6D6D6" } } }
}

const bodyTextStyle = { alignment: { vertical: "center" } };
const bodyDecimalStyle = { numFmt: "#,##0.00" };
export const bodyCellStyle = {
    rowspan: bodyTextStyle,
    center: { alignment: {...bodyTextStyle.alignment, horizontal: "center" } },
    number: { numFmt: "#,##0" },
    decimal: bodyDecimalStyle,
    negativeDecimal: {...bodyDecimalStyle, font: { color: { rgb: "FF0000" } } }
}

const totalTextStyle = { font: { bold: true } };
const totalDecimalStyle = {...totalTextStyle, numFmt: "#,##0.00" };
export const totalCellStyle = {
    default: totalTextStyle,
    number: {...totalTextStyle, numFmt: "#,##0" },
    decimal: totalDecimalStyle,
    negativeDecimal: {...totalDecimalStyle, font: { bold: true, color: { rgb: "FF0000" } } }
}

const grandTotalTextStyle = {
    font: { bold: true },
    fill: {
        patternType: "solid",
        fgColor: { rgb: "B8C3C9" }
    }
};
const decimalGrandTotalStyle = {...grandTotalTextStyle, numFmt: "#,##0.00" };
export const grandTotalCellStyle = {
    default: grandTotalTextStyle,
    number: {...grandTotalTextStyle, numFmt: "#,##0" },
    decimal: decimalGrandTotalStyle,
    negativeDecimal: {...decimalGrandTotalStyle, font: { bold: true, color: { rgb: "FF0000" } } }
}