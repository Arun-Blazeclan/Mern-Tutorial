function del(id){
    let pid=id.slice(1,);
    let auth = localStorage.getItem('Cred');
    let response=delData(auth,pid);
    response.then(function(resp){
        document.getElementById('msg').innerHTML = resp;
        allProd();
    }).catch(function(e){
        document.getElementById('msg').innerHTML = e;      
    });
}

function upd(id) {
    localStorage.setItem('Prod',id.slice(1,));
    document.getElementById('updproduct').click();
    
}

function setTable(product){
    document.getElementById('prod').innerHTML='<table class="table table-bordered table-striped"><thead id="thead"></thead><tbody id="tbody"></tbody></table>';
    let heads=[];
    let i,j;
    if(product[0]===undefined){
        let tablehead='<tr class="table-dark">';
        for(i in product){
            heads.push(i);
            tablehead=`${tablehead}<th>${i}</th>`;   
        }
        tablehead=`${tablehead}<th>Update</th><th>Delete</th></tr>`;
        let tablerow="<tr>";
        document.getElementById("thead").innerHTML=tablehead;
        for(i in product){
            tablerow=`${tablerow}<td>${product[i]}</td>`
        }
        tablerow=`${tablerow}<td><button class="btn btn-warning btn-sm" id="U${product.ProductId}" onclick="upd(this.id)">Update</button></td><td><button class="btn btn-danger btn-sm" id="D${product.ProductId}" onclick="del(this.id)">Delete</button></td>`;
        document.getElementById("tbody").innerHTML=tablerow;
        
    }else{
        let tablehead='<tr class="table-dark">';
        for(i in product[0]){
            heads.push(i);
            tablehead=`${tablehead}<th>${i}</th>`;   
        }
        tablehead=`${tablehead}<th>Update</th><th>Delete</th></tr>`;
        let tablerow="";
        document.getElementById("thead").innerHTML=tablehead;
        for(i=0;i<product.length;i++){
            tablerow=`${tablerow}<tr>`;
            for(j=0;j<heads.length;j++){
                tablerow=`${tablerow}<td>${product[i][heads[j]]}</td>`;
            }
            tablerow=`${tablerow}<td><button class="btn btn-warning btn-sm" id="U${product[i].ProductId}" onclick="upd(this.id)">Update</button></td><td><button class="btn btn-danger btn-sm" id="D${product[i].ProductId}" onclick="del(this.id)">Delete</button></td>`;
            tablerow=`${tablerow}</tr>`;
        }
        document.getElementById("tbody").innerHTML=tablerow;
    }

}


function getData(auth,id) {
    return new Promise((resolve, reject) => {
        let http = new XMLHttpRequest();     
        http.onload = function () {
            
            resolve(http.response); 
        };
        http.onerror = function (e) {
            
            reject(e); 
        };
        if( id === undefined || id===''){
            http.open(
                "GET",
                "http://localhost:9081/api/products"
            );
        }else{
            http.open(
                "GET",
                `http://localhost:9081/api/products/${id}`
            );
        }
        http.setRequestHeader('Authorization',auth);    
        http.send();
    });
}

function delData(auth,id) {
    return new Promise((resolve, reject) => {
        let http = new XMLHttpRequest();     
        http.onload = function () { 
            resolve(http.response); 
        };
        http.onerror = function (e) {
            reject(e); 
        };
        http.open(
            "DELETE",
            `http://localhost:9081/api/products/${id}`
        );
        http.setRequestHeader('Authorization',auth);    
        http.send();
    });
}

function allProd(id){
    let auth = localStorage.getItem('Cred');
    if(id===undefined||id===''){
        var response = getData(auth);
    }else{
        var response = getData(auth,id);

    }
    response.then(function(resp){
        let prod=JSON.parse(resp);

        if(typeof(prod)==='string'){
                document.getElementById('prod').innerHTML = resp;    
        }else{
                setTable(prod); 
        }
        
    }).catch(function(e){
        document.getElementById('prod').innerText = e;
        
    });
}

window.onload=function(){
    let user=localStorage.getItem('Cred');
    let credentials = user.split(" ")[1];
    let username = credentials.split(":")[0]; 
    document.getElementById('logged').innerHTML=`${username} is logged in`.fontcolor("green");

    allProd();
    document.getElementById('searchbtn').addEventListener('click',function(){
        let searchid=document.getElementById('searchid').value;
        document.getElementById('msg').innerHTML="";
        if(searchid===undefined||searchid.length===0||searchid===''){
            allProd();
        }
        else{
            allProd(searchid);
        }
    },false);

    document.getElementById('logout').addEventListener('click',function(){
        localStorage.clear();
        document.getElementById('Logoutbtn').click();
    },false);

    document.getElementById('addpro').addEventListener('click',function(){
        document.getElementById('addproduct').click();
    },false);
    
}