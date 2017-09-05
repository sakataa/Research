function exportExcel() {
    let table = document.getElementById("table");
    var data = table.outerHTML;

    var blob = new Blob([data], { type: 'application/octet-binary' });
    var elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = "filename.xls";
    console.log(elem.outerHTML);

    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);

    //window.open('data:application/vnd.ms-excel;filename=filename.xls, ' + encodeURIComponent(table.outerHTML));
}