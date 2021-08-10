const store = new Map()
const log = []

const checkKey = key => {
    if (key === undefined || key === null || key === '') return new Error('键不能为空')
}

export const setData = (key, value) => {
    checkKey()
    log.push(`设置${key}=${JSON.stringify(value)}`)
    store.set(key, value)
}

export const deleteData = key => {
    checkKey()
    log.push(`删除${key}`)
    store.delete(key)
}

export const getData = key => {
    checkKey()
    log.push(`获取${key}，当前值:${JSON.stringify(store.get(key))}`)
    return store.get(key)
}

export const getAllData = () => {
    checkKey()
    const data = {}
    store.forEach((item, key) => {
        data[key] = item
    })
    log.push(`获取所有数据:${JSON.stringify(data)}`)
    return data
}


