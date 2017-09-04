function exportExcel() {
    var table = document.getElementById("table");

    var blob = new Blob([table.outerHTML], {
        type: "data:application/vnd.ms-excel"
    });

    var fileName = "jsexport.xls";
    saveAs(blob, fileName);
}