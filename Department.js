function del(id){
    let pid=id.slice(1,);
    console.log(pid);
    let auth = localStorage.getItem('Cred');
    let response=delData(auth,pid);
    response.then(function(resp){
        document.getElementById('msg').innerHTML = resp;
        allDept();
    }).catch(function(e){
        document.getElementById('msg').innerHTML = e;      
    });
}

function upd(id) {
    localStorage.setItem('Dept',id.slice(1,));
    document.getElementById('upddepartment').click();
    
}

function setTable(product){
    document.getElementById('prod').innerHTML='<table class="table table-bordered table-striped table-hover"><thead id="thead"></thead><tbody id="tbody"></tbody></table>';
    let heads=[];
    let i,j;
    if(product[0]===undefined){//if there is only one record
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
        tablerow=`${tablerow}<td><button class="btn btn-warning btn-sm" id="U${product.DeptNo}" onclick="upd(this.id)">Update</button></td><td><button class="btn btn-danger btn-sm" id="D${product.DeptNo}" onclick="del(this.id)">Delete</button></td>`;
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
            tablerow=`${tablerow}<td><button class="btn btn-warning btn-sm" id="U${product[i].DeptNo}" onclick="upd(this.id)">Update</button></td><td><button class="btn btn-danger btn-sm" id="D${product[i].DeptNo}" onclick="del(this.id)">Delete</button></td>`;
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
                "http://localhost:9081/api/departments"
            );
        }else{
            http.open(
                "GET",
                `http://localhost:9081/api/departments/${id}`
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
            `http://localhost:9081/api/departments/${id}`
        );
        http.setRequestHeader('Authorization',auth);    
        http.send();
    });
}

function allDept(id){
    let auth = localStorage.getItem('Cred');
    if(id===undefined||id===''){
        var response = getData(auth);
    }else{
        var response = getData(auth,id);

    }
    response.then(function(resp){
        let prod=JSON.parse(resp);
        //console.log(typeof(prod));
        if(typeof(prod)==='string'){
                document.getElementById('prod').innerHTML = resp;    
        }else{
            //console.log(prod.rows);    
            if(parseInt(prod.rowCount)===0){
                document.getElementById('msg').innerHTML="No Records Available for this DeptNo";
                document.getElementById('prod').innerHTML="";
            }else{
                setTable(prod.rows); 
            }
        }
        
    }).catch(function(e){
        document.getElementById('prod').innerText = e;
        
        
    });
}

window.onload=function(){
    let user=localStorage.getItem('Cred');
    if(user===undefined || user ===null){
        document.getElementById('out').innerHTML="Please Login Again!";
        document.getElementById('show').style.display="none";
    }
    else{
    let credentials = user.split(" ")[1];
    let username = credentials.split(":")[0]; 
    document.getElementById('logged').innerHTML=`${username} is logged in`.fontcolor("green");

    allDept();
    document.getElementById('searchbtn').addEventListener('click',function(){
        document.getElementById('msg').innerHTML="";
        let searchid=document.getElementById('searchid').value;
        document.getElementById('msg').innerHTML="";
        if(searchid===undefined||searchid.length===0||searchid===''){
            allDept();
        }
        else{
            allDept(searchid);
        }
    },false);

    

    document.getElementById('addDept').addEventListener('click',function(){
        document.getElementById('adddepartment').click();
    },false);
}
document.getElementById('logout').addEventListener('click',function(){
    localStorage.clear();
    document.getElementById('Logoutbtn').click();
},false);
    
}