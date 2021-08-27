let gender = ["Male","Female","Transgender"]
let ward = ["General","Private","Special"]
let disease = ["General","Cancer","Heart","Sugar","Pneuomonia","Skin Care","Bone"];
let field = ['PatientId','PatientName','DoctorName','Age','Gender','Disease','Ward','RoomNo']
let data = [];
let count = 0;
let dName = new Set();
// *map function donot work on Set*
// auto drop down functionality
function dropDownList(ddList,id,flag = 0,value=""){
    let temp = "";
    if(flag ==1 )
    {
        console.log("Hello Inside diff drop down");
        temp = `<select id = '${id}' onchange = "filterCat()" required><option value = ''>--Select--</option>`;    
    }
    else if(flag == 2 )
    {
        console.log("Hello Inside diff drop down");
        temp = `<select id = '${id}' onchange = "filteredCat(${id})" required><option value = ''>--Select--</option>`;    
    }
    else
    temp = `<select id = '${id}' required><option value = ''>--Select--</option>`;
    ddList.map(item=>{
        console.log(item);
            temp+= `<option value='${item}'>${item}</option>`;
        }
    )
    temp+= "</select>"
    return temp;
}
// "<select id="gender">
//     <option value ="">--Select--</option>
//     <option value ="Value1">Value1</option>
//     <option value ="Value1">Value1</option>
//     <option value ="Value1">Value1</option>
// </select>"

// onload functionality
window.onload = function(){
    document.getElementById('gender').innerHTML = dropDownList(gender,"Gender");
    document.getElementById('ward').innerHTML = dropDownList(ward,"Ward");
    document.getElementById('disease').innerHTML = dropDownList(disease,"Disease");
    document.getElementById('submit').addEventListener('click',()=>{
        storeData();
    },false)
}

// Make checkbox
// let makeRadio = () =>{
//     let makeCheckHTML = "";
//     makeCheckHTML +=`<input type="radio" name='filterBy' id = 'idDoctor' value='Doctor'>Doctor</input>`;
//     makeCheckHTML +=`<input type="radio" name='filterBy' id = 'idDisease' value='Disease'>Disease</input>`;
//     makeCheckHTML +=`<input type="radio" name='filterBy' id = 'idWard' value='Ward'>Ward</input>`;
//     makeCheckHTML += `<div id='dvFilter'></div>`
//     return makeCheckHTML;    
// }
function filteredCat(onVal)
{
    console.log("Inside FilteredCat function..........");
    filterData(document.getElementById('filter').value,onVal);
}
// filter funtionality
function filterCat(){
    console.log('Inside filter cat');
    let raioBt = document.getElementById('filter');
    let radioBtval = raioBt.value;
    console.log(radioBtval);
    console.log(dName);
    if(radioBtval == 'Doctor')
    {
        document.getElementById('dvfilter2').innerHTML = dropDownList(Array.from(dName),'filterDoctor',2);
    }
    else if(radioBtval == "Disease")
    {
        document.getElementById('dvfilter2').innerHTML = dropDownList(disease,'filterDisease',2);
    }
    else{
        document.getElementById('dvfilter2').innerHTML = dropDownList(ward,'filterWard',2);
    }
}


// filter data as per the choice..
let filterData = (onAtt , attVal) =>{
    console.log("OnAtt:- ",onAtt);
    console.log('AttVal:- ',attVal.value);
    let filteredData = [];
    data.map((item) =>{
        console.log("ITEM",item);
        console.log("DATA[ITEM]",data[item]);
        if(item[onAtt] == attVal.value)
        {
            filteredData.push(item);
        }
    })
    console.log("Filtered Data:- ",filteredData);
    document.getElementById('tableData').innerHTML =  generateHeading() + generateBody(filteredData);
}
// print table function

let showTable = () =>{
    document.getElementById('dvfilter').innerHTML = dropDownList(['Doctor','Disease','Ward'],'filter',1);
    document.getElementById('tableData').innerHTML = generateHeading() + generateBody();
}

// Store value into global variable
let storeData =()=>{
    let temp = {};
    temp[field[0]] = "Pt-"+String(count+1);
    for(let i=1; i<field.length; i++){
        if(field[i] == "DoctorName")
        dName.add(document.getElementById(field[i]).value);
        let te = document.getElementById(field[i]).value;
        te = te[0].toUpperCase() + te.substring(1);
        temp[field[i]] = document.getElementById(field[i]).value;
        document.getElementById(field[i]).value = "";
    }
    count++;
    data.push(temp);
    console.log(data);
    console.log("DNAME FIELD:-      ",dName);
    showTable();
}



let generateHeading = () => {
    let headHTML = "<tr>";
    for (let ind in field) {
        headHTML += "<th>" + field[ind] + "</th>";
    }
    headHTML += "</tr>"
    return headHTML;
}
let generateBody = (DataVal = data) => {
    console.log("Inside generate body function...");
    let bodyHTML = "";
    for(let ind in DataVal)
    {
        let rowHTML = "<tr>"
        for(let ind2 in field)
        {
            rowHTML += "<td id ='entry"+ind+field[ind2]+"'>"+DataVal[ind][field[ind2]]+"</td>"
            // console.log(data[ind][field[ind2]]);
            console.log("entry"+ind+field[ind2])
        }
        bodyHTML += rowHTML;
    }
    return bodyHTML;
}
