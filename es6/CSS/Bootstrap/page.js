window.onload = function () {
    let rows_show = 5;
    let rows = document.getElementsByClassName("data");
    let no_of_rows = rows.length;
    let partition = parseInt(no_of_rows / rows_show);
    if (no_of_rows % rows_show !== 0)
        partition += 1;
    //console.log(no_of_rows, partition
    document.getElementById("dvpaging").innerHTML = generatePage(partition);
    showTable(1, rows_show, rows);
    for (let i = 1; i <= partition; i++) {
        document.getElementById(i).addEventListener('click', () => {
            showTable(i, rows_show, rows);
        }, false);

    }
}



let generatePage = (p) => {
    let pageHTML = '';
    pageHTML += `<ul class="pagination justify-content-end">`;
    for (let i = 1; i <= p; i++) {
        pageHTML += `<li class="page-item"><a class="page-link" href="#" id="${i}">${i}</a></li>`;
    }
    pageHTML += `</ul>`;
    return pageHTML;
}
let showTable = (i, rows_show, rows) => {
    let tableHTML = '';
    for (let j = (i - 1) * rows_show; j < (rows_show * i); j++) {
        if (rows[j] === undefined)
            break;
        else
            tableHTML += `<tr> ${rows[j].innerHTML} </tr>`;
    }
    document.getElementById("table").innerHTML = tableHTML;
    tableHTML = '';
}