"use strict";

var gender = ["Male", "Female", "Transgender"];
var ward = ["General", "Private", "Special"];
var disease = ["General", "Cancer", "Heart", "Sugar", "Pneuomonia", "Skin Care", "Bone"];
var field = ['PatientId', 'PatientName', 'DoctorName', 'Age', 'Gender', 'Disease', 'Ward', 'RoomNo'];
var data = [];
var count = 0;
var dName = new Set(); // *map function donot work on Set*
// auto drop down functionality

function dropDownList(ddList, id) {
  var flag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var temp = "";

  if (flag == 1) {
    console.log("Hello Inside diff drop down");
    temp = "<select id = '".concat(id, "' onchange = \"filterCat()\" required><option value = ''>--Select--</option>");
  } else if (flag == 2) {
    console.log("Hello Inside diff drop down");
    temp = "<select id = '".concat(id, "' onchange = \"filteredCat(").concat(id, ")\" required><option value = ''>--Select--</option>");
  } else temp = "<select id = '".concat(id, "' required><option value = ''>--Select--</option>");

  ddList.map(function (item) {
    console.log(item);
    temp += "<option value='".concat(item, "'>").concat(item, "</option>");
  });
  temp += "</select>";
  return temp;
} // "<select id="gender">
//     <option value ="">--Select--</option>
//     <option value ="Value1">Value1</option>
//     <option value ="Value1">Value1</option>
//     <option value ="Value1">Value1</option>
// </select>"
// onload functionality


window.onload = function () {
  document.getElementById('gender').innerHTML = dropDownList(gender, "Gender");
  document.getElementById('ward').innerHTML = dropDownList(ward, "Ward");
  document.getElementById('disease').innerHTML = dropDownList(disease, "Disease");
  document.getElementById('submit').addEventListener('click', function () {
    storeData();
  }, false);
}; // Make checkbox
// let makeRadio = () =>{
//     let makeCheckHTML = "";
//     makeCheckHTML +=`<input type="radio" name='filterBy' id = 'idDoctor' value='Doctor'>Doctor</input>`;
//     makeCheckHTML +=`<input type="radio" name='filterBy' id = 'idDisease' value='Disease'>Disease</input>`;
//     makeCheckHTML +=`<input type="radio" name='filterBy' id = 'idWard' value='Ward'>Ward</input>`;
//     makeCheckHTML += `<div id='dvFilter'></div>`
//     return makeCheckHTML;    
// }


function filteredCat(onVal) {
  console.log("Inside FilteredCat function..........");
  filterData(document.getElementById('filter').value, onVal);
} // filter funtionality


function filterCat() {
  console.log('Inside filter cat');
  var raioBt = document.getElementById('filter');
  var radioBtval = raioBt.value;
  console.log(radioBtval);
  console.log(dName);

  if (radioBtval == 'Doctor') {
    document.getElementById('dvfilter2').innerHTML = dropDownList(Array.from(dName), 'filterDoctor', 2);
  } else if (radioBtval == "Disease") {
    document.getElementById('dvfilter2').innerHTML = dropDownList(disease, 'filterDisease', 2);
  } else {
    document.getElementById('dvfilter2').innerHTML = dropDownList(ward, 'filterWard', 2);
  }
} // filter data as per the choice..


var filterData = function filterData(onAtt, attVal) {
  console.log("OnAtt:- ", onAtt);
  console.log('AttVal:- ', attVal.value);
  var filteredData = [];
  data.map(function (item) {
    console.log("ITEM", item);
    console.log("DATA[ITEM]", data[item]);

    if (item[onAtt] == attVal.value) {
      filteredData.push(item);
    }
  });
  console.log("Filtered Data:- ", filteredData);
  document.getElementById('tableData').innerHTML = generateHeading() + generateBody(filteredData);
}; // print table function


var showTable = function showTable() {
  document.getElementById('dvfilter').innerHTML = dropDownList(['Doctor', 'Disease', 'Ward'], 'filter', 1);
  document.getElementById('tableData').innerHTML = generateHeading() + generateBody();
}; // Store value into global variable


var storeData = function storeData() {
  var temp = {};
  temp[field[0]] = "Pt-" + String(count + 1);

  for (var i = 1; i < field.length; i++) {
    if (field[i] == "DoctorName") dName.add(document.getElementById(field[i]).value);
    var te = document.getElementById(field[i]).value;
    te = te[0].toUpperCase() + te.substring(1);
    temp[field[i]] = document.getElementById(field[i]).value;
    document.getElementById(field[i]).value = "";
  }

  count++;
  data.push(temp);
  console.log(data);
  console.log("DNAME FIELD:-      ", dName);
  showTable();
};

var generateHeading = function generateHeading() {
  var headHTML = "<tr>";

  for (var ind in field) {
    headHTML += "<th>" + field[ind] + "</th>";
  }

  headHTML += "</tr>";
  return headHTML;
};

var generateBody = function generateBody() {
  var DataVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : data;
  console.log("Inside generate body function...");
  var bodyHTML = "";

  for (var ind in DataVal) {
    var rowHTML = "<tr>";

    for (var ind2 in field) {
      rowHTML += "<td id ='entry" + ind + field[ind2] + "'>" + DataVal[ind][field[ind2]] + "</td>"; // console.log(data[ind][field[ind2]]);

      console.log("entry" + ind + field[ind2]);
    }

    bodyHTML += rowHTML;
  }

  return bodyHTML;
};
