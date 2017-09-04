function exportExcel()
{
    let table = document.getElementById("table");

    window.open('data:application/vnd.ms-excel;filename=name_of_excel_file.xls, ' + encodeURIComponent(table.outerHTML));
}