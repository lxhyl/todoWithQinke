import request from "../request/index";

export function addStatus(data){
    return request({
        url:'/status/add',
        method:'post',
        data
    })
}

export function getAllStatus(){
    return request.get('/status/getAll')
}