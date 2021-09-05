var mydb, tbl;
var count=0;
var dbEntries;
var categoryList = ['Electrical','Electronics','Food','Fashion'];
var manufacturerList = ['Tata','IBM','HP','Lenovo','Bajaj','Google','Microsoft','Amazon','BIBA','Levis','OnePlus'];
var header = ['ProductRowId', 'ProductId', 'ProductName', 'CategoryName', 'Manufacturer', 'Price', 'Description'];
// create DataBase
function createDb() {
    mydb = window.indexedDB.open('ProductDb', 1);
    mydb.onupgradeneeded = function (e) {
        var dbReference = e.target.result;
        var columnConstraints = { unique: false };
        tbl = dbReference.createObjectStore('Prod', { keyPath: 'ProductRowId' });
        tbl.createIndex('ProductRowId1', 'ProductRowId', { unique: true });
        tbl.createIndex('ProductId1', 'ProductId', { unique: true, autoIncrement: true });
        tbl.createIndex('ProductName1', 'ProductName', columnConstraints);
        tbl.createIndex('CategoryName1', 'CategoryName', columnConstraints);
        tbl.createIndex('Manufacturer1', 'Manufacturer', columnConstraints);
        tbl.createIndex('Price1', 'Price', columnConstraints);
        tbl.createIndex('Description1', 'Description', columnConstraints);
        console.log("Database has been created successfully");
    }
}

// convert to 4 digit number:- 
function convertToFour(num) {
    num = String(num);
    if (num.length < 4) {
        return ('0'.repeat(4 - num.length) + num);
    } else { return (num); }
}

// Generate Product Id
function genratePId(num) {
    return 'Prd-' + convertToFour(num);
}

// Store data to database:
function getData() {
    totalEnteries();
    var rpId = count + 1;
    var pId = genratePId(rpId);
    var data = {
        ProductRowId: rpId,
        ProductId: pId
    }
    for (var ind = 2; ind < header.length; ind++) {
        let temp = document.getElementById(header[ind]).value;
        temp = temp[0].toUpperCase() + temp.substring(1);
        data[header[ind]] = temp;
        temp = '';
    }
    return (data);
}

function storeData() {
    var data = getData();
    mydb = window.indexedDB.open('ProductDb');
    if (mydb) {
        mydb.onsuccess = function (e) {
            var tx = e.target.result.transaction('Prod', 'readwrite');
            tbl = tx.objectStore('Prod');
            var operation = tbl.add(data);
            operation.onsuccess = function (e) {
                console.log("Data has store successfully.....");
            }
            operation.onerror = function (e) {
                console.log("Their is some error in storing the data.....");
            }
        }
    }
    else {
        console.log("Unable to open DataBase...");
    }
}

// total number of entries in database....
function totalEnteries() {
    mydb = window.indexedDB.open('ProductDb');
    if (mydb) {
        mydb.onsuccess = function (e) {
            var tx = e.target.result.transaction('Prod', 'readonly');
            tbl = tx.objectStore('Prod');
            var objTotal = tbl.count();
            objTotal.onsuccess = function (e) {
                count = e.target.result;
            }
        }

    }
    else {
        console.log("Unable to load database...");
    }
}

// get all entries stored in database
function getAllEntries() {
    mydb = window.indexedDB.open('ProductDb');
    if (mydb) {
        mydb.onsuccess = function (e) {
            var tx = e.target.result.transaction('Prod', 'readonly');
            tbl = tx.objectStore('Prod');
            var objTotal = tbl.getAll();
            objTotal.onsuccess = function (e) {
                dbEntries = e.target.result;
            }
        }

    }
    else {
        console.log("Unable to load database...");
    }
}


// function to delete entry from database

function deleteEntry(ProductRId)
{
    mydb = window.indexedDB.open('ProductDb');
    if (mydb) {
        mydb.onsuccess = function (e) {
            var tx = e.target.result.transaction('Prod', 'readwrite');
            tbl = tx.objectStore('Prod');
            var objTotal = tbl.delete(ProductRId,1);
            objTotal.onsuccess = function (e) {
                getAllEntries();
            }
        }

    }
    else {
        console.log("Unable to load database...");
    }
}

// Delete DataBase:- 
function deleteDb()
{
    var dbDeleteRequest = window.indexedDB.deleteDatabase("ProductDb");
    dbDeleteRequest.onsuccess = function(){
    
    console.log("Deleted succesfully");
    }
}

// function to edit entry from database
function editEntry(ProductRId)
{
    console.log(ProductRId);
}




function generateHeading() {
    var headHTML = "<tr>";
    for (var ind in header) {
        headHTML += "<th>" + header[ind] + "</th>";
    }
    headHTML += "<th>Edit</th><th>Delete</th></tr>"
    return headHTML;
}
function generateBody() {
    var bodyHTML = "";
    for(var ind in dbEntries)
    {
        var rowHTML = "<tr>"
        for(var ind2 in header)
        {
            rowHTML += "<td>"+dbEntries[ind][header[ind2]]+"</td>"
        }
        rowHTML += "<td><button id = 'edt+"+dbEntries[ind]['ProductRowId']+"' value = '"+dbEntries[ind]['ProductRowId']+"' onclick = 'editEntry("+dbEntries[ind]['ProductRowId']+")'>Edit</button></td><td><button id='dlt"+dbEntries[ind]['ProductRowId']+"' value = '"+dbEntries[ind]['ProductRowId']+"' onclick = 'deleteEntry("+dbEntries[ind]['ProductRowId']+")'>Delete</button></td></tr>"
        bodyHTML += rowHTML;
    }
    return bodyHTML;
}

function dropDown(dropDownList)
{   
    var temp = "<option value=''>--Select--</option>";
    for(var i in dropDownList)
    {
        temp+= "<option value='"+dropDownList[i]+"'>"+dropDownList[i]+"</option>";
    }
    return temp;
}