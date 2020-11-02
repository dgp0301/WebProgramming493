/*

*/
const mysql = require('./mysql');

//const data = [{name: 'Moshe', age: 43},{name: "Dan",age: 20}]

async function getAll(){
    //throw {status:501, message: "This is a fake error"}
    //await Promise.resolve()
    console.log("Called get all")
    return await mysql.query(`SELECT * FROM Users`);
}
async function add(name,age){
    data.push({name,age});
}
async function getTypes(){
    return await mysql.query(`SELECT id, Name FROM Types WHERE Type_id = 2`);
}
async function get(id){
    return await mysql.query(`SELECT * FROM Users WHERE id = ?`, [id]);
}
const search = async q => await mysql.query(`SELECT id, FirstName, LastName FROM Users Where LastName LIKE ? OR FirstName LIKE ?; `,[`%${q}%`,`%${q}%`]);

module.exports = { get, getTypes, getAll, add, search }