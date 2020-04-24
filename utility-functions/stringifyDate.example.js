import stringifyDate from "./stringifyDate";

//stringify a date from existing Date object
const dateCreated = new Date("April 24, 2020 18:49:00");
console.log(stringifyDate("Y-m-d", dateCreated))
//2020-04-24

//if you don't specify a date, the current date/time is used
console.log(stringifyDate("H:i:s A"));
//Your current time in the form "6:55:05 PM"