let headers = ['Patient_Id', 'Patient_Name', 'Doctor_Name', 'Age', 'Gender', 'Disease', 'Ward', 'Room_No'];
let Gender = ["Male", "Female", "Others"];
let groupBy = ["Doctor_Name", "Disease", "Ward"];
let diseases = ['General', 'Cancer', 'Heart', 'Sugar', 'Typhoid', 'Pneumonia', 'Malaria', 'TB'];
let wards = ['General', 'Cardiology', 'Dialysis', 'Endocrinology', 'Gastroenterology', 'Hematology', 'Neurology', 'Oncology', 'Rheumatology'];
let PId = 7;
let fil='';
let data = [
    { Patient_Id: 1, Patient_Name: "Rahul", Doctor_Name: "Yash", Age: 18, Gender: "Male", Disease: "General", Ward: "General", Room_No: 23 },
    { Patient_Id: 2, Patient_Name: "Ankit", Doctor_Name: "Palkesh", Age: 20, Gender: "Male", Disease: "Heart", Ward: "Cadiology", Room_No: 13 },
    { Patient_Id: 3, Patient_Name: "Ayushi", Doctor_Name: "Yash", Age: 32, Gender: "Female", Disease: "Sugar", Ward: "General", Room_No: 23 },
    { Patient_Id: 4, Patient_Name: "Shruti", Doctor_Name: "Ayush", Age: 14, Gender: "Female", Disease: "General", Ward: "General", Room_No: 23 },
    { Patient_Id: 5, Patient_Name: "Piyush", Doctor_Name: "Ayush", Age: 20, Gender: "Male", Disease: "Malaria", Ward: "Neurology", Room_No: 3 },
    { Patient_Id: 6, Patient_Name: "Arvind", Doctor_Name: "Palkesh", Age: 24, Gender: "Male", Disease: "TB", Ward: "Dialysis", Room_No: 2 }
];
let doctor = new Set();
doctor.add("Yash");
doctor.add("Palkesh");
doctor.add("Ayush");

//Window load
window.onload = function () {
    document.getElementById('pdisease').innerHTML = dropDown(diseases, "disease");
    document.getElementById('pward').innerHTML = dropDown(wards, "ward");
    document.getElementById("gender").innerHTML = radioList(Gender, "Gender");
    document.getElementById("radiolist").innerHTML = radioList(groupBy, "group", 1);
    showTable();
    document.getElementById("pid").value=PId;
    document.getElementById('btnsubmit').addEventListener('click', () => {
        dataStore();
        document.getElementById("pid").value=PId;

    }, false)
}

//filter using radio
let filterRadio=()=> {
    let grpRadio = document.getElementsByName("group");

    for (let i = 0; i < grpRadio.length; i++) {
        if (grpRadio[i].checked) {

            if (grpRadio[i].value == 'Disease') {
                document.getElementById("txtdrop").innerText = "Select Disease from below drop-down";
                document.getElementById('selectdropdown').innerHTML = dropDown(diseases, "filterdisease", 1);
            }
            else if (grpRadio[i].value == 'Ward') {
                document.getElementById("txtdrop").innerText = "Select Ward from below drop-down";
                document.getElementById('selectdropdown').innerHTML = dropDown(wards, "filterward", 1);
            }
            else {
                document.getElementById("txtdrop").innerText = "Select Doctor-Name from below drop-down";
                document.getElementById('selectdropdown').innerHTML = dropDown(Array.from(doctor), "filterdoctor", 1);
            }
            fil=grpRadio[i].value;
        }

    }
}

//filter from dropdown
let filterDropDown=(id)=>{
    //fil = property selected by radio
    // id.value for which we show data
    //console.log(fil,id.value);
    filterData(fil,id);
}

//Generate Radio list
let radioList = (option, name, c = 0) => {
    let temp = "";
    if (c == 1) {
        option.forEach((v) => {
            temp += `<input type='radio' onchange = 'filterRadio()' name='${name}' value='${v}' > ${v} </input>`;
        }
        )
    }
    else {
        option.forEach((v) => {
            temp += `<input type='radio' name='${name}' value='${v}' > ${v} </input>`;
        }
        )
    }
    return temp;
}

//Genrate Dropdown list
let dropDown = (option, id, f = 0) => {
    let temp = '';
    if (f == 1) {
        temp = `<select id = '${id}' onchange = 'filterDropDown(${id})' required><option value = ''>--Select--</option>`;
    }
    else {
        temp = `<select id='${id}' required><option value = ''>--Select--</option>`;
    }
    option.forEach((unit) => {
        temp += `<option value='${unit}'>${unit}</option>`;
    }
    )
    temp += `</select>`;
    return temp;
}

//Print Table
let showTable = () => {
    document.getElementById('printtable').innerHTML = generateHeading() + generateBody(data);
}

//Store value in table
let dataStore = () => {
    let temp = {};
    temp[headers[0]] = PId;
    let pname = document.getElementById("pname").value;
    document.getElementById("pname").value='';
    pname = pname[0].toUpperCase() + pname.substring(1);
    temp[headers[1]] = pname;
    let dname = document.getElementById("dname").value;
    document.getElementById("dname").value='';
    dname = dname[0].toUpperCase() + dname.substring(1);
    doctor.add(dname);
    temp[headers[2]] = dname;
    let Age = document.getElementById("age").value;
    document.getElementById("age").value='';
    temp[headers[3]] = Age;
    let g = document.getElementsByName("Gender");
    for (let i = 0; i < g.length; i++) {
        if (g[i].checked)
            temp[headers[4]] = g[i].value;

    }

    let Disease = document.getElementById("disease").value;
    document.getElementById("disease").value='';
    temp[headers[5]] = Disease;
    let Ward = document.getElementById("ward").value;
    document.getElementById("ward").value='';
    temp[headers[6]] = Ward;
    let RoomNo = document.getElementById("proom").value;
    document.getElementById("proom").value='';
    temp[headers[7]] = RoomNo;


    PId++;
    data.push(temp);
    console.log(doctor);

    //console.log(data);
    showTable();
}

//Gropuping
let filterData = (head , attVal) =>{
    let filteredData = [];
    data.map((item) =>{
        if(item[head] == attVal.value)
        {
            filteredData.push(item);
        }
    })
    if(filteredData.length==0){
        document.getElementById("printtable").innerText="No Record Found"
    }
    else{
    document.getElementById('printtable').innerHTML =  generateHeading() + generateBody(filteredData);
    }
}

//Generate Heading of dynamic table
let generateHeading = () => {
    let headHTML = "<tr>";
    for (let i in headers) {
        headHTML += "<th>" + headers[i] + "</th>";
    }
    headHTML += "</tr>"
    return headHTML;
}

//Generate body of table
let generateBody = (DataVal = data) => {
    let bodyHTML = "";
    for(let ind in DataVal)
    {
        let rowHTML = "<tr>"
        for(let ind2 in headers)
        {
            rowHTML += "<td id ='entry"+ind+headers[ind2]+"'>"+DataVal[ind][headers[ind2]]+"</td>"
        }
        bodyHTML += rowHTML;
    }
    return bodyHTML;
}

