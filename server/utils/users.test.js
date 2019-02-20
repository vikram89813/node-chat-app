const {Users} = require('./users');
const expect = require('expect');

describe('Users class tests',()=>{

    var users;

    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id: '1',
            name: 'kumar',
            room: 'Node Course'
        },{
            id:'2',
            name: 'Jen',
            room: 'React course'
        },{
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }];
    });

    it('should add new user',()=>{
        var users = new Users();
        var user = {
            id: '123',
            name: 'kumar',
            room: 'office'
        };

        var res = users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
    });

    it('should names for node course',()=>{
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['kumar','Julie']);
    });

    it('should find user',()=>{
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should remove a user',()=>{
        var userId = '3';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });
});