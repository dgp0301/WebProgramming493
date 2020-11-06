/*

*/
const bcrypt = require("bcrypt");
const mysql = require('./mysql');
const PREFIX = process.env.MYSQL_TABLE_PREFIX ||"";
const Types = { EMAIL : 'Email', CELL_PHONE : 'Cell Phone' };

//const data = [{name: 'Moshe', age: 43},{name: "Dan",age: 20}]

async function getAll(){
    //throw {status:501, message: "This is a fake error"}
    //await Promise.resolve()
    console.log("Called get all")
    return await mysql.query(`SELECT * FROM ${PREFIX}ContactMethods`);
}
async function add(Type, Value, IsPrimary = 0, CanSpam = 1, User_id){
    const sql = `INSERT INTO ${PREFIX}ContactMethods (created_at,  Type, Value, IsPrimary, CanSpam, User_id) VALUES ? ; `;
    const params=[[ new Date(), Type, Value, IsPrimary, CanSpam, User_id]];
    return await mysql.query(sql,[params]);
}
async function update(id, Type, Value, IsPrimary, CanSpam, User_id){
    const sql = `UPDATE ${PREFIX}ContactMethods SET ? WHERE id = ?; `;
    const params={ Type, Value, IsPrimary, CanSpam, User_id};
    return await mysql.query(sql,[params, id]);
}
async function remove(id){
    const sql = `DELETE FROM ${PREFIX}ContactMethods WHERE id = ? ;`;
    return await mysql.query(sql,[id]);
}
async function getTypes(){
    return await mysql.query(`SELECT id, Name FROM ${PREFIX}Types WHERE Type_id = 4`);
}
async function get(id){
    const rows=await mysql.query(`SELECT * FROM ${PREFIX}ContactMethods WHERE id = ?`, [id]);
    if(!rows){throw {status:404, message: "Sorry, there is no such user"}}
    return rows[0];
}

async function exists(email){
    const rows = await mysql.query(`SELECT * FROM ${PREFIX}ContactMethods WHERE Value=?`, [email]);
    return rows.length;
}
const search = async q => await mysql.query(`SELECT id, FirstName, LastName FROM ${PREFIX}ContactMethods Where LastName LIKE ? OR FirstName LIKE ?; `,[`%${q}%`,`%${q}%`]);

module.exports = { remove, update, get, exists, getTypes, getAll, add, search, Types }