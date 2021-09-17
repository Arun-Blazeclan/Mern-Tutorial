let PatientData = [
    { Patient_Id: 1, Patient_Name: "Rahul", Doctor_Name: "Yash", Age: 18, Gender: "Male", Disease: "General", Ward: "General", Room_No: 23 },
    { Patient_Id: 2, Patient_Name: "Ankit", Doctor_Name: "Palkesh", Age: 20, Gender: "Male", Disease: "Heart", Ward: "Cadiology", Room_No: 13 },
    { Patient_Id: 3, Patient_Name: "Ayushi", Doctor_Name: "Yash", Age: 32, Gender: "Female", Disease: "Sugar", Ward: "General", Room_No: 23 },
    { Patient_Id: 4, Patient_Name: "Shruti", Doctor_Name: "Ayush", Age: 14, Gender: "Female", Disease: "General", Ward: "General", Room_No: 23 },
    { Patient_Id: 5, Patient_Name: "Piyush", Doctor_Name: "Ayush", Age: 20, Gender: "Male", Disease: "Malaria", Ward: "Neurology", Room_No: 3 },
    { Patient_Id: 6, Patient_Name: "Arvind", Doctor_Name: "Palkesh", Age: 24, Gender: "Male", Disease: "TB", Ward: "Dialysis", Room_No: 2 }
];

// function* is an indicator that internally the iterator will be called
function* dataGenerator(start,step,end=Infinity){
    for(let i=start;i<end;i+=step){
    
        if(PatientData[i].Ward=='General')
            yield PatientData[i]; // read, return and movenext
    } 
}

const generator = dataGenerator(0, 1,PatientData.length);
// start iterating from first record
let dataReader = generator.next();
while(!dataReader.done){
    console.log(`The Current Value is = ${JSON.stringify(dataReader.value)}`);
    dataReader = generator.next(); // move next
}