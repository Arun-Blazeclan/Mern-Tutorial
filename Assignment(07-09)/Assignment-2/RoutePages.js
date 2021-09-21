const http = require("http");
const fs = require("fs");
const path = require("path");

const serverPath = path.join(__dirname, "./../Nodejs/Views");

const server = http.createServer((req, resp) => {
    //console.log(req.url);
    fs.readFile(`${serverPath}${req.url}.html`, { encoding: "ascii" }, (error, file) => {
        if (error) {
            resp.writeHead(404, { "Content-Type": "text/html" });
            resp.write(`File Not Found ${error.message}`);
            resp.end();
        }
        resp.writeHead(200, { "Content-Type": "text/html" });
        resp.write(file);
        resp.end();
    }
    );
});

server.listen(9080);
console.log("Started on 9080");