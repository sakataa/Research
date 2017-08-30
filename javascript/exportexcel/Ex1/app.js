function exportExcel()
{
    let table = document.getElementById("table");

    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(table.outerHTML));
}