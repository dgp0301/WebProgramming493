/*

*/
const bcrypt = require("bcrypt");
const mysql = require('./mysql');
const cm = require('./contactMethods');

const PREFIX = process.env.MYSQL_TABLE_PREFIX ||"";
const SALT_ROUNDS = process.env.SALT_ROUNDS || 8;
const Types = { ADMIN : 5, USER : 6 };

async function getAll(){
    //throw {status:501, message: "This is a fake error"}
    //await Promise.resolve()
    console.log("Called get all")
    return await mysql.query(`SELECT * FROM ${PREFIX}Users`);
}
async function add(FirstName, LastName, DOB, Password, User_Type){
    const sql = `INSERT INTO ${PREFIX}Users (created_at,  FirstName, LastName, DOB, Password, User_Type) VALUES ? ; `;
    const params=[[ new Date(), FirstName, LastName,new Date(DOB), Password, User_Type]];
    return await mysql.query(sql,[params]);
}
async function update(id, FirstName, LastName, DOB, Password, User_Type){
    const sql = `UPDATE ${PREFIX}Users SET ? WHERE id = ?; `;
    const params={ FirstName, LastName, DOB:new Date(DOB), Password, User_Type};
    return await mysql.query(sql,[params, id]);
}
async function remove(id){
    const sql = `DELETE FROM ${PREFIX}Users WHERE id = ? ;`;
    return await mysql.query(sql,[id]);
}
async function getTypes(){
    return await mysql.query(`SELECT id, Name FROM ${PREFIX}Types WHERE Type_id = 2`);
}
async function get(id){
    const sql = `SELECT
    *,
    (SELECT Value FROM ${PREFIX}ContactMethods Where User_id = ${PREFIX}Users.id AND Type='${cm.Types.EMAIL}' AND isPrimary = true) as PrimaryEmail
    FROM ${PREFIX}Users WHERE id=?`;
    const rows=await mysql.query(sql, [id]);
    if(!rows){throw {status:404, message: "Sorry, there is no such user"}}
    return rows[0];
}
async function login(email, password){
    const sql = `SELECT *
    FROM ${PREFIX}Users U Join ${PREFIX}ContactMethods CM ON U.id=CM.User_id WHERE CM.Value=?`;
    const rows = await mysql.query(sql,[email]);
    if(!rows.length) throw { status: 404, message: 'Sorry, that email is not registered'};

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const res = await bcrypt.compare(password, rows[0].Password);
    console.log({hash, ahh: rows[0].Password });
    if(!res) throw {status: 403, message: 'Wrong Password'};
    return get(rows[0].User_id);
}
async function register(FirstName, LastName, DOB, Password, User_Type, email) {
    if( await cm.exists(email)){
        throw{ status: 409, message: 'You already signed up with this email' }
    }
    const hash = await bcrypt.hash(Password, SALT_ROUNDS);
    const res = await add(FirstName, LastName, DOB, hash, User_Type);
    const emailRes = await cm.add(cm.Types.EMAIL, email, true, true, res.insertId);
    const user = await get(res.insertId);
    return user;
}
const search = async q => await mysql.query(`SELECT id, FirstName, LastName FROM ${PREFIX}Users Where LastName LIKE ? OR FirstName LIKE ?; `,[`%${q}%`,`%${q}%`]);

module.exports = { remove, update, get, getTypes, getAll, add, register, login, search, Types }