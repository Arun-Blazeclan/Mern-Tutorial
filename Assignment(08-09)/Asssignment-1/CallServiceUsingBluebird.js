const http = require('http');

const bluebird  =require('bluebird');
class ServiceConsumer {
    
    getData(options){
        let defer  =bluebird.defer();
        let request; // request object
        let products; // obejct to store the result
        if(!options){
            defer.reject('The Server Information is missing');
        }else {
            request = http.request(options, (result)=>{
                result.on('data', (data)=>{
                    products = data;
                });

                result.on('end', ()=>{
                    try {
                        // if the data received and processed Successfully
                        defer.resolve(products);
                    }catch(ex){
                        // if any error occur
                        defer.reject(`Error Occured ${ex}`);
                    }
                });
            });
        }
        request.end();
        // return the promise object
        return defer.promise;
    }

    postData(options,product){
        let defer  =bluebird.defer();
        let request; 
        let products; 
        if(!options){
            defer.reject('The Server Information is missing');
        }else {
            request = http.request(options, (result)=>{
                result.on('data', (data)=>{
                    products = data;
                });

                result.on('end', ()=>{
                    try {
                        defer.resolve(products);
                    }catch(ex){
                        defer.reject(`Error Occured ${ex}`);
                    }
                });
            });
        }
        request.write(product);
        request.end();

        return defer.promise;
    }

    delData(options){
        let defer  =bluebird.defer();
        let request; 
        let products; 
        if(!options){
            defer.reject('The Server Information is missing');
        }else {
            request = http.request(options, (result)=>{
                result.on('data', (data)=>{
                    products = data;
                });

                result.on('end', ()=>{
                    try {
                        defer.resolve(products);
                    }catch(ex){
                        defer.reject(`Error Occured ${ex}`);
                    }
                });
            });
        }
        //request.write(product);
        request.end();

        return defer.promise;
    }

    putData(options,product){
        let defer  =bluebird.defer();
        let request; 
        let products; 
        if(!options){
            defer.reject('The Server Information is missing');
        }else {
            request = http.request(options, (result)=>{
                result.on('data', (data)=>{
                    products = data;
                });

                result.on('end', ()=>{
                    try {
                        defer.resolve(products);
                    }catch(ex){
                        defer.reject(`Error Occured ${ex}`);
                    }
                });
            });
        }
        request.write(product);
        request.end();

        return defer.promise;
    }
}

module.exports = ServiceConsumer;