// class Person{
//     constructor(name,age){
//         this.name = name;
//         this.age =age;
//     }

//     getUserDesc(){
//         return `${this.name} is ${this.age} years old`;
//     }
// };

// var me = new Person('kumar',25);
// console.log(me.getUserDesc());

class Users{
    constructor(){
        this.users = [];
    }

    addUser(id,name,room){
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        var user = this.getUser(id);
        if(user){
            this.users = this.users.filter((user)=> user.id !== id);
        }
        return user;
    }

    getUser(id){
        return this.users.filter((user)=> user.id === id)[0];
    }

    getUserList(room){
        var users = this.users.filter((user)=>{
            return user.room === room;
        });

        //map is used to get individual objects
        var namesArray = users.map((user)=>{
            return user.name;
        });
        return namesArray;
    }
};

module.exports ={
    Users
}