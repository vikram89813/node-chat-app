const moment = require('moment');

// var date = new Date();
// var months = ['jan','feb','march']
// console.log(months[date.getMonth()]);

var date = moment();
console.log(date.format('MMM Do YYYY'));