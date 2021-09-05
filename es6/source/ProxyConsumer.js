//Create class
class Person {
    constructor() {
        this.name = "Anshul Rajput";
        this.age = 25;
        this.email = "anushul.raj@gmail.com";
        this.email_alt = "anushul12@care.co.in";
        this._Secret = "DXPP0923P";
        this.occupation = "Job";
    }
}

//Create handler for consumer1
const handler1 = {
    //apply validation
    get(target, prop) {
        if (prop.startsWith('email')) {
            if (target[prop].endsWith("co.in"))
                return target[prop];
            else
                return 'Not Supported, Domain should be "co.in" for consumer';
        }
        else if (prop.startsWith("_"))
            return "Not Accessible";
        else
            return target[prop];
    },

    //All values can be changed
    set(target, prop, val) {
        target[prop] = val;
        return true;
    },

    // Not showing  secret as a property
    ownKeys(target) {
        let keys = Object.keys(target);
        // filter properties starts with '_'
        let properties = keys.filter((p, i) => {
            return p[0] !== '_';
        });
        return properties;
    },

    // show values of all properties except secret
    ownValues(target, prop) {
        let values = target[prop];
        return values;
    }
};

//Create handler for consumer2
const handler2 = {
    //apply validation
    get(target, prop) {
        if (prop.startsWith('email')) {
            if (target[prop].endsWith(".com"))
                return target[prop];
            else
                return 'Not Supported, Domain should be ".com" for consumer';
        }
        else if (prop.startsWith("_"))
            return "Not Accessible";
        else
            return target[prop];
    },

    //All values can be changed 
    set(target, prop, val) {
        target[prop] = val;
        return true;
    },

    // Not showing  secret as a property
    ownKeys(target) {
        let keys = Object.keys(target);
        // filter properties starts with '_'
        let properties = keys.filter((p, i) => {
            return p[0] !== '_';
        });
        return properties;
    },

    // show values of all properties except secret
    ownValues(target, prop) {
        let values = target[prop];
        return values;
    }
};

//Create handler for consumer3
const handler3 = {
    //apply validation
    get(target, prop) {
        if (prop.startsWith('email') || prop.startsWith('occu') || prop.startsWith('_'))
            return 'Not Accessible';
        else
            return target[prop];
    },

    //All values will be changed
    set(target, prop, val) {
        target[prop] = val;
        return true;
    },

    // Not showing  secret as a property
    ownKeys(target) {
        let keys = Object.keys(target);
        // filter properties starts with '_'
        let properties = keys.filter((p, i) => {
            return p[0] !== '_';
        });
        return properties;
    },

    // show values of all properties except secret
    ownValues(target, prop) {
        let values = target[prop];
        return values;
    }
};

//Create handler for consumer4
const handler4 = {
    //apply validation
    get(target, prop) {
        return target[prop];
    },

    //Prevent of changing value of Secret 
    set(target, prop, val) {
        if (prop.startsWith("_"))
            throw new Error("You can't change the value of secret");
        else {
            target[prop] = val;
            return true;
        }
    },

    // show values of all properties
    ownValues(target, prop) {
        let values = target[prop];
        return values;
    }
};

// create proxy for all consumers
const consumer1 = new Proxy(new Person(), handler1);
const consumer2 = new Proxy(new Person(), handler2);
const consumer3 = new Proxy(new Person(), handler3);
const consumer4 = new Proxy(new Person(), handler4);

//show all properties and values on console for consumer1
function Consumer1() {

    console.log(Object.keys(consumer1)); // read all properties
    console.log(Object.values(consumer1)); // read all values

    console.log("-----------------------------------------------");
    console.log(`Name :- ${consumer1.name}`);
    console.log(`Name :- ${consumer1.age}`);
    console.log(`Email ID :- ${consumer1.email}`);
    console.log(`Alternate Email ID :- ${consumer1.email_alt}`);
    console.log(`Occupation :- ${consumer1.occupation}`);
    console.log(`Secret :- ${consumer1._Secret}`);

    console.log("-----------------------------------------------");
    consumer1.email_alt = "arr@value.com";
    console.log(`After Change Alternate Email ID :- ${consumer1.email_alt}`);
    consumer1.email_alt = "arr@value.co.in";
    console.log(`After Change Alternate Email ID :- ${consumer1.email_alt}`);
}

//show all properties and values on console for consumer2
function Consumer2() {

    console.log(Object.keys(consumer2)); // read all properties
    console.log(Object.values(consumer2)); // read all values

    console.log("-----------------------------------------------");
    console.log(`Name :- ${consumer2.name}`);
    console.log(`Name :- ${consumer2.age}`);
    console.log(`Email ID :- ${consumer2.email}`);
    console.log(`Alternate Email ID :- ${consumer2.email_alt}`);
    console.log(`Occupation :- ${consumer2.occupation}`);
    console.log(`Secret :- ${consumer2._Secret}`);

    console.log("-----------------------------------------------");
    consumer2.email = "arr@value.com";
    console.log(`After Change Email ID :- ${consumer2.email}`);
    consumer2.email = "arr@value.co.in";
    console.log(`After Change Email ID :- ${consumer2.email}`);
}

//show all properties and values on console for consumer3
function Consumer3() {

    console.log(Object.keys(consumer3)); // read all properties
    console.log(Object.values(consumer3)); // read all values

    console.log("-----------------------------------------------");
    console.log(`Name :- ${consumer3.name}`);
    console.log(`Name :- ${consumer3.age}`);
    console.log(`Email ID :- ${consumer3.email}`);
    console.log(`Alternate Email ID :- ${consumer3.email_alt}`);
    console.log(`Occupation :- ${consumer3.occupation}`);
    console.log(`Secret :- ${consumer3._Secret}`);

}

//show all properties and values on console for consumer4
function Consumer4() {

    console.log(Object.keys(consumer4)); // read all properties
    console.log(Object.values(consumer4)); // read all values

    console.log("-----------------------------------------------");
    console.log(`Name :- ${consumer4.name}`);
    console.log(`Email ID :- ${consumer4.email}`);
    console.log(`Alternate Email ID :- ${consumer4.email_alt}`);
    console.log(`Occupation :- ${consumer4.occupation}`);
    console.log(`Secret :- ${consumer4._Secret}`);

    console.log("-----------------------------------------------");
    consumer4._Secret = "secret";
    console.log(`After Change secret :- ${consumer1._Secret}`);
}

try {
    //Consumer1();
    //Consumer2();
    //Consumer3();
    Consumer4();
} catch (e) {
    console.log(e.message);
}