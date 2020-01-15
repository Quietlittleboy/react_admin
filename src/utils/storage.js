
const localStorage = window.localStorage;

// 读取数据
export function getItem(key) {
    const value = localStorage.getItem(key)
    try {
        return JSON.parse(value)
    } catch (e) {
        return value
    }

}

// 存储数据
export function setItem(key, value) {
    value = JSON.stringify(value)
    localStorage.setItem(key, value)

}

// 删除数据
export function removeItem(key) {
    localStorage.removeItem(key)

}

