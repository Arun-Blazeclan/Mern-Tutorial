const express = require("express");
const cors = require("cors");
const dal = require("./dal/data");

const instance = express();

// Configure Middlewares for reading headers
instance.use(express.urlencoded({ extended: false }));
// parse json
instance.use(express.json());

// configure cors
instance.use(
    cors({
        origin: "*", // all oriogins are allowd OR specify orogins as per your demand
        allowedHeaders: "*", // allow all headers OR specifiy headers
        methods: "*", // allow all method OR specify http methods
    })
);

// instance of DataAccess classes
const dalObject = new dal();

// API method for get all records
instance.get("/api/products", (req, resp) => {
    if (auth(req, resp) === 1) {
        let products = dalObject.getProducts();
        resp.status(200).send({ data: products });
    }
});

// http://localhost:9081/api/products/Prd-001
// API method for get record by id
instance.get("/api/products/:id", (req, resp) => {
    if (auth(req, resp) === 1) {
        // read the header id
        let id = req.params.id;
        let product = dalObject.getProductsById(id);

        if (product == null || product === undefined || !product) 
            resp.status(404).send({ message: "Record not found, it may be deleted" });
        else
            resp.status(200).send({ data: product });
    }
});

// Api method to add data in array
instance.post("/api/products", (req, resp) => {
    if (auth(req, resp) === 1) {
        // read data from body
        let product = req.body;
        let products = dalObject.createProduct(product);
        resp.status(200).send({ data: products });
    }

});

//Api method to update existing data in array by id
instance.put("/api/products/:id", (req, resp) => {
    if (auth(req, resp) === 1) {
        let id = req.params.id;
        let product = req.body;
        let products = dalObject.updateProduct(id, product);
        if (products === 0)
            resp.status(404).send({ message: "Record not found, Enter Valid ID" });
        else
            resp.status(200).send({ data: products });
    }

});

//Api method to delete existing data from array by id
instance.delete("/api/products/:id", (req, resp) => {
    if (auth(req, resp) === 1) {
        let id = req.params.id;
        let product = req.body;
        let products = dalObject.deleteProduct(id);
        if (products === 0)
            resp.status(404).send({ message: "Record not found, may be deleted" });
        else
            resp.status(200).send({ data: products });
    }
});

//Check authentication only valid user can modify data
function auth(req, resp) {
    // read authorization Headers
    let authHeader = req.headers.authorization;
    console.log(`AUTH Headers ${authHeader}`);

    let credentials = authHeader.split(" ");
    console.log(`Credentials ${credentials}`);
    let userName = credentials[0]; // UserName
    let password = credentials[1]; // PAssword
    let d = dalObject.getUser();

    console.log(d.has(userName), d.get(userName));
    if (d.has(userName) && password === d.get(userName))
        return 1;

    else
        resp.status(401).send({ message: "Credentials are invalid" });
}

//Call Api on port
instance.listen(9081, () => {
    console.log("http://localhost:9081");
});



