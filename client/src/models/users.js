/* AHHH

*/
import { myfetch } from "./my-fetch";



export function getList() {
    return myfetch('http://localhost:3001/users')
}