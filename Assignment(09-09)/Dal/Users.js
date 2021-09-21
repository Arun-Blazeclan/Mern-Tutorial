class Users{
    #users=[];
    constructor(){
        this.#users = [
            {
                UserName:'Arun',
                Password:'arun@parmar'
            },
            {
              UserName:'Aryan',
              Password:'arayn@jain'
            },
            {
              UserName:'Rahul',
              Password:'rahul@pal'
            },
          ];
    }
    validateUser(authHeader){
        console.log('In Validation');
        let credentials = authHeader.split(" ")[1];
        let userName = credentials.split(":")[0]; 
        let password = credentials.split(":")[1];
        for(let i=0;i<this.#users.length;i++){
            if(userName===this.#users[i].UserName){
                if(password===this.#users[i].Password){
                    return true;
                }
            }
        }
        return false;
    }
}

module.exports=Users;