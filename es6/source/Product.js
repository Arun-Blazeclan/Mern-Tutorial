class Product {
    constructor() {
        this.ProductId = 0;
        this.ProductName = '';
        this.CategoryName = '';
        this.Manufacturers = '';
        this.Price = 0;
    }
}

class Constants {
    constructor() {
        this.Categories = ['ECT', 'ECL', 'FOD', 'FSN'];
        this.Manufacturers = ['IBM', 'TATA', 'HP', 'Bajaj'];
    }
}

class ProductLogic {
    constructor() {
        this.Products = [
            { ProductId: 1, ProductName: 'Laptop', CategoryName: 'ECT', Manufacturers: 'HP', Price: 100000 },
            { ProductId: 2, ProductName: 'TV', CategoryName: 'ECT', Manufacturers: 'Bajaj', Price: 40000 }
        ];
    }

    getProducts(product) {
        return this.Products;
    }

    validateProduct(val) {
        let errors = [];
        const regex = /\d/;
        for (let i = 0; i < headers.length; i++) {
            if (headers[i] == "ProductName") {
                if (val[i] == '')
                    errors.push("Enter Name");
                else if (regex.test(val[i]))
                    errors.push("Name should not contain number");
            }
            else if (headers[i] == "CategoryName") {
                if (val[i] == '')
                    errors.push("Select Category");
            }
            else if (headers[i] == "Manufacturers") {
                if (val[i] == '')
                    errors.push("Select Manufacturer");
            }
            else if (headers[i] == "Price") {
                if (val[i] == '')
                    errors.push("Enter Price");
                else if (val[i] < 0)
                    errors.push("Enter valid Price");
            }
        }
        return errors;
    }

    registerNewProduct(head) {
        let ob = new Product();
        ob.ProductId = P_id;
        P_id += 1;
        let pname = document.getElementById("ProductName").value;
        if (pname.length > 0)
            pname = pname[0].toUpperCase() + pname.substring(1);
        ob.ProductName = pname;
        ob.CategoryName = document.getElementById("CategoryName").value;
        ob.Manufacturers = document.getElementById("Manufacturers").value;
        ob.Price = document.getElementById("Price").value;

        let val = Object.values(ob);

        if (this.validateProduct(val).length == 0) {
            return prodObj.Products.push(ob);
        }

        else {
            alert(this.validateProduct(val));
            return 0;
        }
    }

    updateProduct(pid) {
        // search for Product, if found update and return an array with updated properuct
        // if product is not found then return error message 'ProductNot FOund'
        for (let i in this.Products) {
            if (this.Products[i].ProductId === pid) {
                document.getElementById("ProductId").value = this.Products[i].ProductId;
                document.getElementById("ProductName").value = this.Products[i].ProductName;
                document.getElementById("CategoryName").value = this.Products[i].CategoryName;
                document.getElementById("Manufacturers").value = this.Products[i].Manufacturers;
                document.getElementById("Price").value = this.Products[i].Price;

                document.getElementById("btnsub").style.display = "none";
                document.getElementById("create").style.display = 'block';
                document.getElementById("reg").style.display = 'block';
                document.getElementById('update').innerHTML = "<input type='button' id='btnupdate' value='Update'>";
                document.getElementById("btnupdate").addEventListener('click', () => {
                    let pname=document.getElementById("ProductName").value;
                    pname=pname[0].toUpperCase() + pname.substring(1);
                    this.Products[i].ProductName = pname;
                    this.Products[i].CategoryName = document.getElementById("CategoryName").value;
                    this.Products[i].Manufacturers = document.getElementById("Manufacturers").value;
                    this.Products[i].Price = document.getElementById("Price").value;
                    let val = Object.values(this.Products[i]);

                    if (this.validateProduct(val).length == 0) {
                        document.getElementById("create").style.display = 'none';
                        document.getElementById("status").innerText = "Data updated successfully...";
                        clearInput();
                        showTable();
                    }

                    else {
                        alert(this.validateProduct(val));
                        return 0;
                    }

                }, false);
            }
        }
    }

    deleteProduct(pid) {
        for (let i in this.Products) {
            if (this.Products[i].ProductId === pid) {
                delete this.Products[i];
            }
        }
        document.getElementById("status").innerText = "Data Deleted Succesfully...";
        showTable();
    }

    searchProduct(criteria) {
        // e.g. criteria will be CategoryName=='ECT', then return all product for ECT
        // if criteria is undefined then return all reoducts
        //here fil is property selected by dropdown
        let fil = document.getElementById(criteria.id).value;
        document.getElementById("msg").innerText = `Enter ${fil} :- `;
        document.getElementById("filterbox").innerHTML = "<input type='text' id='searchbox'>";
        document.getElementById("btn").innerHTML = "<input type='button' value='Search' id='btnsearch'>"
        document.getElementById("btnsearch").addEventListener('click', () => {
            let val = document.getElementById("searchbox").value;
            filter(fil, val);
        }, false)

        let filter = (head, attVal) => {
            let filteredData = [];
            this.getProducts().map((item) => {
                if (typeof (item[head]) == "string") {
                    if (item[head].toLowerCase() == attVal.toLowerCase())
                        filteredData.push(item);
                }
                else if (item[head] == attVal.toLowerCase())
                    filteredData.push(item);
            })
            if (filteredData.length == 0)
                //showTable();
                document.getElementById("showTable").innerText = "No Record Found"

            else
                document.getElementById('showTable').innerHTML = generateHeading() + generateBody(filteredData);
        }
    }

    showProductGroup(groupKey) {
        // return all product by groupKey
    }

}

//take headers from class
let headers = Object.keys(new Product());

let P_id = 3;

//make obj of product logic class
let prodObj = new ProductLogic();

//load on window
window.onload = function () {
    document.getElementById('cname').innerHTML = dropDown(new Constants().Categories, "CategoryName");
    document.getElementById('manu').innerHTML = dropDown(new Constants().Manufacturers, "Manufacturers");
    document.getElementById("dropdown").innerHTML = dropDown(headers, "group", 1);
    document.getElementById("create").style.display = 'none';
    showTable();
    document.getElementById("btnregister").addEventListener('click', () => {
        document.getElementById("ProductId").value = P_id;
        document.getElementById("create").style.display = 'block';
        document.getElementById("reg").style.display = 'none';
        document.getElementById("btnsub").style.display = 'block';
        document.getElementById("btnupdate").style.display = "none";
        clearInput();

    }, false);
    document.getElementById("btnsub").addEventListener('click', () => {
        if (prodObj.registerNewProduct(headers) == 0) {
            P_id -= 1;
        }
        else {
            document.getElementById("create").style.display = 'none';
            document.getElementById("reg").style.display = 'block';
            document.getElementById("status").innerText = "Register Successfully....";
            clearInput();
            showTable();
        }
    }, false)

}

//Generate Drop-Down
let dropDown = (option, id, f = 0) => {
    let temp = '';
    if (f == 1) {
        temp = `<select id = '${id}' onchange = 'prodObj.searchProduct(${id})' required><option value =''>--Select--</option>`;
    }
    else {
        temp = `<select id='${id}' class='data'><option value =''>--Select--</option>`;
    }
    option.forEach((unit) => {
        temp += `<option value='${unit}'>${unit}</option>`;
    }
    )
    temp += `</select>`;
    return temp;
}


//Generate Heading of dynamic table
let generateHeading = () => {
    let headHTML = "<tr>";
    for (let i in headers) {
        headHTML += "<th>" + headers[i] + "</th>";
    }
    headHTML += "<th>Edit</th><th>Delete</th></tr>"
    headHTML += "</tr>"
    return headHTML;
}

//Generate body of table
let generateBody = (DataVal) => {
    let bodyHTML = "";
    for (let ind in DataVal) {
        let rowHTML = "<tr>"
        for (let ind2 in headers) {
            rowHTML += "<td id ='entry" + ind + headers[ind2] + "'>" + DataVal[ind][headers[ind2]] + "</td>"
        }
        rowHTML += "<td><button onclick = 'prodObj.updateProduct(" + prodObj.Products[ind].ProductId + ")'>Edit</button></td>"
        rowHTML += "<td><button onclick = 'prodObj.deleteProduct(" + prodObj.Products[ind].ProductId + ")'>Delete</button></td></tr>"
        bodyHTML += rowHTML;
    }
    return bodyHTML;
}

//Print Table
let showTable = () => {
    document.getElementById('showTable').innerHTML = generateHeading() + generateBody(prodObj.getProducts());
}

//clear input fields
let clearInput = () => {
    let field = document.getElementsByClassName("data");
    document.getElementById("ProductId").value = P_id;
    for (var i = 0; i < field.length; i++)
        field[i].value = '';
}

