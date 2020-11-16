//Uses request api
const API_ROOT =  process.env.API_ROOT||'http://localhost:3001/'
export function myfetch(url){
    return fetch( API_ROOT+url ).then(x=>x.json())
}

