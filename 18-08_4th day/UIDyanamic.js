function headingHTML(head)
{
    var temp = "<tr>";
    for(var headerName in head)
    {
        temp+= "<th>" +head[headerName]+ "</th>";
    }
    temp+="</tr>";
    return temp;
}
function bodyHTML(ProductList,head)
{
    var final = "";
    for(var i = 0; i < ProductList.length;i++)
    {
        var temp = "<tr>";
        for(var j = 0; j < head.length;j++)
        {
            temp+= "<td>"+ProductList[i][head[j]]+"</td>"
        }
        temp+= "</tr>"
        final+=temp;
    }
    return final;
}
function listOfPerson(PersonDetail,head)
{
    return headingHTML(head) + bodyHTML(PersonDetail,head);
}