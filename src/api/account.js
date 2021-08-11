import request  from "../request/index"
export function createAccount(data){
   return request({
       url:'account/create',
       method:'POST',
       data
   })
}

export function login(data){
    return request({
        url:'/account/login',
        method:'POST',
        data
    })
}