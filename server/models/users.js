/*

*/

const data = [{name: 'Moshe', age: 43},{name: "Dan",age: 20}]

async function getAll(){
    throw {status:501, message: "This is a fake error"}
    //await Promise.resolve()
    console.log("Called get all")
    return data;
}
async function add(name,age){
    data.push({name,age});
}

module.exports = { getAll, add,search: async q => data.filter(x=>x.name==q) }