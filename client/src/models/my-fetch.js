//Uses request api

export function myfetch(url){
    return fetch( url ).then(x=>x.json())
}

