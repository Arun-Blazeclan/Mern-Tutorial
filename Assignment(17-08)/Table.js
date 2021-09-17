function generateRadio(cName){
    var opt="";
    for(var i=0;i<cName.length;i++){
        opt+='<input type="radio" name="ch" value="'+ i + '" >' + cName[i] + '</input>';
    }
    document.getElementById('radioList').innerHTML = opt;
   }

function getHeader(headers){
    var headerRow = '';
    for(var i=0;i<headers.length;i++){
        headerRow+="<th>"+headers[i]+"&nbsp&nbsp</th>";
    };
    document.getElementById("thead").innerHTML = headerRow;
};