import axiosIstance from './request';

export const reqLogin = (username,password) => {
    return axiosIstance({
        method: 'POST',
        url: '/login',
        data:{
            username,
            password
        }
    })
}