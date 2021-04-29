const fs = require("fs");

let employees = [];
let departments = [];


module.exports.initialize = function () {
    return new Promise( (resolve, reject) => {
        fs.readFile('./data/departments.json','utf8', (err, departmentData) => {
            if (err) {
                reject("unable to load departments"); return;
            }

            fs.readFile('./data/employees.json','utf8', (err, employeeData) => {
                if (err) {
                    reject("unable to load employees"); return;
                }

                departments = JSON.parse(departmentData);
                employees = JSON.parse(employeeData);
                resolve();
            });
        });
    });
}

module.exports.getAllEmployees = function(){
    return new Promise((resolve,reject)=>{
        if (employees.length == 0) {
            reject("query returned 0 results"); return;
        }

        resolve(employees);
    })
}

module.exports.getManagers = function () {
    return new Promise(function (resolve, reject) {
        var filteredEmployeees = [];

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].isManager == true) {
                filteredEmployeees.push(employees[i]);
            }
        }

        if (filteredEmployeees.length == 0) {
            reject("query returned 0 results"); return;
        }

        resolve(filteredEmployeees);
    });
};

module.exports.getDepartments = function(){
   return new Promise((resolve,reject)=>{
    if (departments.length == 0) {
        reject("query returned 0 results"); return;
    }

    resolve(departments);
   });
}

module.exports.getEmployeesByDepartment = function(department){
    return new Promise((resolve,reject)=>{
        var employeeByDepartment = [];
        for (let i = 0; i < employees.length; i++){
            if(employees[i].department == department){
                employeeByDepartment.push(employees[i]);
            }
        }
        if (employeeByDepartment.length == 0) {
            reject({message:"no results"}); return;
        }
        resolve(employeeByDepartment);
    });
};

module.exports.getEmployeeByNum = function(num){
    return new Promise((resolve,reject)=>{
        var employeeByNum = [];
        for (let i = 0; i < employees.length; i++){
            if(employees[i].employeeNum == parseInt(num)){
               employeeByNum = employees[i];
            }
        }
        if (employeeByNum.length == 0){
            reject({message:"no results"}); return;
        }
        resolve (employeeByNum);
    });
};
