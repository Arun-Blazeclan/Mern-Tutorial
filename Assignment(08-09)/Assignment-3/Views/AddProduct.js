let Categories = ["Electronic", "Electricals", "Food", "Fashion"];
let Manufacturer = ['Tata', 'IBM', 'HP', 'Lenovo', 'Bajaj', 'Google', 'Microsoft', 'Amazon', 'BIBA', 'Levis', 'OnePlus'];

function posData(auth, prod) {
    return new Promise((resolve, reject) => {
        let http = new XMLHttpRequest();
        http.onload = function () {
            resolve(http.response);
        };
        http.onerror = function (e) {
            reject(e);
        };
        http.open(
            "POST",
            `http://localhost:9081/api/products/`
        );
        http.setRequestHeader('Authorization', auth);
        http.setRequestHeader('Content-Type', 'application/json');
        http.send(JSON.stringify(prod));
    });
}

let dropDown = (option, id) => {
    let temp = '';
    temp = `<select id='${id}' required><option value = ''>--Select--</option>`;
    option.forEach((unit) => {
        temp += `<option value='${unit}'>${unit}</option>`;
    }
    )
    temp += `</select>`;
    return temp;
}

window.onload = function () {
    let user = localStorage.getItem('Cred');
    let credentials = user.split(" ")[1];
    let username = credentials.split(":")[0];
    document.getElementById('cat').innerHTML = dropDown(Categories, "Categories");
    document.getElementById('man').innerHTML = dropDown(Manufacturer, "Manufacturer");
    document.getElementById('logged').innerHTML = `${username} is logged in`.fontcolor("green");

    document.getElementById('clrbtn').addEventListener('click', function () {
        let clr = document.getElementsByName('clr');
        for (let i = 0; i < clr.length; i++) {
            clr[i].value = "";
        }
    }, false);

    document.getElementById('sbtbtn').addEventListener('click', function () {
        let product = {
            ProductId: document.getElementById('prodid').value,
            ProductName: document.getElementById('prodname').value,
            CategoryName: document.getElementById('Categories').value,
            Manufacturer: document.getElementById('Manufacturer').value,
            Description: document.getElementById('proddes').value,
            Price: parseInt(document.getElementById('prodprice').value)

        };
        let flag=0;
        let c = document.getElementsByName('clr');
        for (let i = 0; i < c.length; i++) {
            if(c[i]===null || c[i]===""){
                flag=0;
                break;
            }
            else
            flag=1;

        }
        if(flag===0)
            document.getElementById("msg").innerHTML="Enter All Details";

        else {
            let auth = localStorage.getItem('Cred');
            let response = posData(auth, product);
            response.then(function (resp) {
                document.getElementById('msg').innerHTML = resp;
                document.getElementById('clrbtn').click();
            }).catch(function (e) {
                document.getElementById('msg').innerHTML = e;
            });
            document.getElementById('Products').click();
        }
    }, false);


    document.getElementById('logout').addEventListener('click', function () {
        localStorage.clear();
        document.getElementById('Logoutbtn').click();
    }, false);

}