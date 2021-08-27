"use strict";

var headers = ['Patient_Id', 'Patient_Name', 'Doctor_Name', 'Age', 'Gender', 'Disease', 'Ward', 'Room_No'];
var Gender = ["Male", "Female", "Others"];
var groupBy = ["Doctor_Name", "Disease", "Ward"];
var diseases = ['General', 'Cancer', 'Heart', 'Sugar', 'Typhoid', 'Pneumonia', 'Malaria', 'TB'];
var wards = ['General', 'Cardiology', 'Dialysis', 'Endocrinology', 'Gastroenterology', 'Hematology', 'Neurology', 'Oncology', 'Rheumatology'];
var PId = 7;
var fil = '';
var data = [{
  Patient_Id: 1,
  Patient_Name: "Rahul",
  Doctor_Name: "Yash",
  Age: 18,
  Gender: "Male",
  Disease: "General",
  Ward: "General",
  Room_No: 23
}, {
  Patient_Id: 2,
  Patient_Name: "Ankit",
  Doctor_Name: "Palkesh",
  Age: 20,
  Gender: "Male",
  Disease: "Heart",
  Ward: "Cadiology",
  Room_No: 13
}, {
  Patient_Id: 3,
  Patient_Name: "Ayushi",
  Doctor_Name: "Yash",
  Age: 32,
  Gender: "Female",
  Disease: "Sugar",
  Ward: "General",
  Room_No: 23
}, {
  Patient_Id: 4,
  Patient_Name: "Shruti",
  Doctor_Name: "Ayush",
  Age: 14,
  Gender: "Female",
  Disease: "General",
  Ward: "General",
  Room_No: 23
}, {
  Patient_Id: 5,
  Patient_Name: "Piyush",
  Doctor_Name: "Ayush",
  Age: 20,
  Gender: "Male",
  Disease: "Malaria",
  Ward: "Neurology",
  Room_No: 3
}, {
  Patient_Id: 6,
  Patient_Name: "Arvind",
  Doctor_Name: "Palkesh",
  Age: 24,
  Gender: "Male",
  Disease: "TB",
  Ward: "Dialysis",
  Room_No: 2
}];
var doctor = new Set();
doctor.add("Yash");
doctor.add("Palkesh");
doctor.add("Ayush"); //Window load

window.onload = function () {
  document.getElementById('pdisease').innerHTML = dropDown(diseases, "disease");
  document.getElementById('pward').innerHTML = dropDown(wards, "ward");
  document.getElementById("gender").innerHTML = radioList(Gender, "Gender");
  document.getElementById("radiolist").innerHTML = radioList(groupBy, "group", 1);
  showTable();
  document.getElementById('btnsubmit').addEventListener('click', function () {
    dataStore();
  }, false);
}; //filter using radio


var filterRadio = function filterRadio() {
  var grpRadio = document.getElementsByName("group");

  for (var i = 0; i < grpRadio.length; i++) {
    if (grpRadio[i].checked) {
      if (grpRadio[i].value == 'Disease') {
        document.getElementById("txtdrop").innerText = "Select Disease from below drop-down";
        document.getElementById('selectdropdown').innerHTML = dropDown(diseases, "filterdisease", 1);
      } else if (grpRadio[i].value == 'Ward') {
        document.getElementById("txtdrop").innerText = "Select Ward from below drop-down";
        document.getElementById('selectdropdown').innerHTML = dropDown(wards, "filterward", 1);
      } else {
        document.getElementById("txtdrop").innerText = "Select Doctor-Name from below drop-down";
        document.getElementById('selectdropdown').innerHTML = dropDown(Array.from(doctor), "filterdoctor", 1);
      }

      fil = grpRadio[i].value;
    }
  }
}; //filter from dropdown


var filterDropDown = function filterDropDown(id) {
  filterData(fil, id);
}; //Generate Radio list


var radioList = function radioList(option, name) {
  var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var temp = "";

  if (c == 1) {
    option.forEach(function (v) {
      temp += "<input type='radio' onchange = 'filterRadio()' name='".concat(name, "' value='").concat(v, "' > ").concat(v, " </input>");
    });
  } else {
    option.forEach(function (v) {
      temp += "<input type='radio' name='".concat(name, "' value='").concat(v, "' > ").concat(v, " </input>");
    });
  }

  return temp;
}; //Genrate Dropdown list


var dropDown = function dropDown(option, id) {
  var f = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var temp = '';

  if (f == 1) {
    temp = "<select id = '".concat(id, "' onchange = 'filterDropDown(").concat(id, ")' required><option value = ''>--Select--</option>");
  } else {
    temp = "<select id='".concat(id, "' required><option value = ''>--Select--</option>");
  }

  option.forEach(function (unit) {
    temp += "<option value='".concat(unit, "'>").concat(unit, "</option>");
  });
  temp += "</select>";
  return temp;
}; //Print Table


var showTable = function showTable() {
  document.getElementById('printtable').innerHTML = generateHeading() + generateBody(data);
}; //Store value in table


var dataStore = function dataStore() {
  var temp = {};
  temp[headers[0]] = PId;
  var pname = document.getElementById("pname").value;
  document.getElementById("pname").value = '';
  pname = pname[0].toUpperCase() + pname.substring(1);
  temp[headers[1]] = pname;
  var dname = document.getElementById("dname").value;
  document.getElementById("dname").value = '';
  dname = dname[0].toUpperCase() + dname.substring(1);
  doctor.add(dname);
  temp[headers[2]] = dname;
  var Age = document.getElementById("age").value;
  document.getElementById("age").value = '';
  temp[headers[3]] = Age;
  var g = document.getElementsByName("Gender");

  for (var i = 0; i < g.length; i++) {
    if (g[i].checked) temp[headers[4]] = g[i].value;
    g[i].unchecked;
  }

  var Disease = document.getElementById("disease").value;
  document.getElementById("disease").value = '';
  temp[headers[5]] = Disease;
  var Ward = document.getElementById("ward").value;
  document.getElementById("ward").value = '';
  temp[headers[6]] = Ward;
  var RoomNo = document.getElementById("proom").value;
  document.getElementById("proom").value = '';
  temp[headers[7]] = RoomNo;
  PId++;
  data.push(temp);
  console.log(doctor); //console.log(data);

  showTable();
}; //Gropuping


var filterData = function filterData(head, attVal) {
  var filteredData = [];
  data.map(function (item) {
    if (item[head] == attVal.value) {
      filteredData.push(item);
    }
  });

  if (filteredData.length == 0) {
    document.getElementById("printtable").innerText = "No Record Found";
  } else {
    document.getElementById('printtable').innerHTML = generateHeading() + generateBody(filteredData);
  }
}; //Generate Heading of dynamic table


var generateHeading = function generateHeading() {
  var headHTML = "<tr>";

  for (var i in headers) {
    headHTML += "<th>" + headers[i] + "</th>";
  }

  headHTML += "</tr>";
  return headHTML;
}; //Generate body of table


var generateBody = function generateBody() {
  var DataVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : data;
  var bodyHTML = "";

  for (var ind in DataVal) {
    var rowHTML = "<tr>";

    for (var ind2 in headers) {
      rowHTML += "<td id ='entry" + ind + headers[ind2] + "'>" + DataVal[ind][headers[ind2]] + "</td>";
    }

    bodyHTML += rowHTML;
  }

  return bodyHTML;
};
