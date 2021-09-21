const express = require("express");
const cors = require("cors");
const path = require('path');
const dal = require("./Dal/Async");

const instance = express();
instance.use(express.urlencoded({ extended: false }));

instance.use(express.json());

instance.use(
    express.static(path.join(__dirname, './../../node_modules/bootstrap/dist/css'))
);

instance.use(
    express.static(path.join(__dirname, './Views'))
);

let router = express.Router();
instance.use(router);

instance.use(
  cors({
    origin: "*", 
    allowedHeaders: "*", 
    methods: "*", 
  })
);


const dalObject = new dal();

router.get("/",(req,resp) => {
    resp.sendFile('Login.html', {
        root: path.join(__dirname, './Views')
    });
});

router.get("/Products",(req,resp) => {
    resp.sendFile('Products.html', {
        root: path.join(__dirname, './Views')
    });
});

router.get("/Logout",(req,resp)=>{
    resp.sendFile('Logout.html', {
        root: path.join(__dirname, './Views')
    });
});

router.get("/AddProduct",(req,resp)=>{
    resp.sendFile('AddProduct.html', {
        root: path.join(__dirname, './Views')
    });
});

router.get("/UpdateProduct",(req,resp)=>{
    resp.sendFile('UpdateProduct.html', {
        root: path.join(__dirname, './Views')
    });
});

router.get("/login",dalObject.login);

router.get("/api/products", dalObject.getProduct);

router.get("/api/products/:id", dalObject.getProductById );

router.delete("/api/products/:id",dalObject.deleteProduct) ;

router.post("/api/products", dalObject.createProduct);

router.put("/api/products/:id", dalObject.updateProduct);

instance.listen(9081, () => {
  console.log("REST APIs are on port 9081");
});
