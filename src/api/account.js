import request  from "../request/index"
export function createAccount(data){
   return request({
       url:'account/create',
       method:'POST',
       data
   })
}