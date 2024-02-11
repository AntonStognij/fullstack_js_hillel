//task 1
let myStr = "ami";
myStr =`${myStr/0}${myStr}`;
console.log("task 1 ==>", myStr);
//task 2
let myObj = {
    "name":"Anton",
    "nickname":"Superman",
    "phone":"+380635683187",
    "mail":"Anton@gmail.com",
    "sex":"man",
    "hobby":"basketball",
    "lovesPizza":true
};

let obj2 = {
    "name":"Kristina",
    "nickname":"Kris",
    "phone":"+380632474547",
    "mail":"Kris777@gmail.com",
    "sex":"woman",
    "hobby":"Board games",
    "lovesPizza":true
};
let obj3 = {
    "name":"Valera",
    "nickname":"Black mamba",
    "phone":"+380631122333",
    "mail":"Mamba1992@gmail.com",
    "sex":"man",
    "hobby":"fishing",
    "lovesPizza":false
};
let arrInfo =[myObj, obj2, obj3];

console.log("task 2 ==>", arrInfo);