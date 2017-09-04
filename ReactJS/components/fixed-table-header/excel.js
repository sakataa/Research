function isIE() {
    var userAgent = window.navigator.userAgent;
    return userAgent.indexOf("MSIE ") !== -1 ||  !!(userAgent.match(/Trident/)); 
}

function exportExcel() {
    var layoutRow = document.getElementsByClassName("first-row")[0].outerHTML;
    var thTags = document.getElementsByClassName("table")[0].getElementsByTagName("tr");
    var bodyTags = document.getElementsByClassName("table")[1].getElementsByTagName("tr");
    var footerTags = document.getElementsByClassName("table")[2].getElementsByTagName("tr");

    var header = [],
        body = [],
        footer = [];
    for (var i = 1; i < thTags.length; i++) {
        var thHtml = thTags[i].outerHTML;
        header.push(thHtml);
    }

    for (var i = 1; i < bodyTags.length; i++) {
        var tdHtml = bodyTags[i].outerHTML;
        body.push(tdHtml);
    }

    for (var i = 1; i < footerTags.length; i++) {
        var tdHtml = footerTags[i].outerHTML;
        footer.push(tdHtml);
    }

    var headerStyle = "<th style='border:1px solid #cccccc; background:#4C6375; color:#ffffff;'";

    var headerHtml = "<thead>" + header.join("").replace(/<th/g, headerStyle) + "</thead>";
    var bodyHtml = "<tbody>" + body.join("").replace(/<td/g, "<td style='border: 1px solid #ccc'") + "</tbody>";
    var footerHtml = "<tfoot>" + footer.join("").replace(/<td/g, "<td style='border: 1px solid #ccc'") + "</tfoot>";

    var html = "<table style='border: 1px solid #ccc; width: 100%'>" + headerHtml + bodyHtml + footerHtml + "</table>";
    /* console.log(headerHtml); */

    if (isIE()) {
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([html], {
                type: "text/html"
            });
            navigator.msSaveBlob(blob, "jsexport.xls");
        }
    } else {
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
    }
}