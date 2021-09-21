const http = require("http");
//const { REPL_MODE_SLOPPY } = require("repl");

const emps = [
    { eno: 101, ename: "A", sal: 3100 },
    { eno: 102, ename: "B", sal: 3200 },
    { eno: 103, ename: "C", sal: 3300 },
    { eno: 104, ename: "D", sal: 3400 },
    { eno: 105, ename: "E", sal: 3500 },
];

const server = http.createServer((request, response) => {
    let id = request.headers.id;
    if (request.method === "GET") {
        if (id === undefined || id === 0) {
            // write a response Header
            response.writeHead(200, { "Content-Type": "application/json" });
            // write response data in header
            response.write(JSON.stringify(emps));
            // end the response
            response.end();
        } else {
            // write a response Header
            response.writeHead(200, { 'Content-Type': 'application/json' });
            // write response data in header
            let res = emps.filter((e, i) => { return e.eno === parseInt(id); });
            //console.log(`Data in Else ${JSON.stringify(res)}`)
            response.write(JSON.stringify(res));
            // end the response
            response.end();
        }
    }
    if (request.method === "POST") {
        // the global object for current request to save the received data
        let receivedData;
        request.on('data', (chunk) => {
            // read data and store locally
            // wrte logic to validate the data, etc

            receivedData = JSON.parse(chunk);
        });
        // end the request and finally complete the processing
        request.on('end', () => {
            emps.push((receivedData));
            response.end(JSON.stringify(emps));
        });
    }

    if (request.method === "PUT") {
        let res = emps.filter((e, i) => {
            return e.eno === parseInt(id);
        });
        if (res.length === 0)
            response.end("No Record Found");
        
        else {
            let receivedData;
            request.on('data', (chunk) => {
                receivedData = JSON.parse(chunk);
            });
            request.on('end', () => {
                response.write("Before Update Array is :- ");
                response.write(JSON.stringify(emps)+"\n");
                res[0].eno=receivedData.eno;
                res[0].ename=receivedData.ename;
                res[0].sal=receivedData.sal;
                response.write("After Update Array is :- ");
                response.end(JSON.stringify(emps));
            });
        }
    }

    if (request.method === "DELETE") {
        let flag = 0;
        for (let i = 0; i < emps.length; i++) {
            if (parseInt(id) === emps[i].eno) {
                flag = 1;
                emps.splice(i, 1);
            }
        }
        if (flag === 0)
            response.write("No Record Found \n\n");
        else
            response.write("Record Deleted Successfully....\n\n");

        response.write("Records in Array :- ");
        response.write(JSON.stringify(emps));
        response.end();
    }


});

// start listening on a port
server.listen(9080);
console.log("STarted listening on port 9080");
