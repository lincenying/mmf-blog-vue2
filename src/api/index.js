import axios from 'axios'
import qs from 'qs'
import store from '../store'
import { inBrowser } from '../utils'
import config from 'api-config'

axios.interceptors.request.use(config => {
    store.dispatch('gProgress', 50)
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    store.dispatch('gProgress', 100)
    return response
}, error => {
    store.dispatch('gProgress', 100)
    return Promise.reject(error)
})

function checkStatus(response) {
    if (response.status === 200 || response.status === 304) {
        return response
    }
    return {
        data: {
            code: -400,
            message: response.statusText
        }
    }
}

function checkCode(res) {
    if (inBrowser && res.data.code === -500) {
        window.location.href = '/login'
        return
    } else if (res.data.code !== 200) {
        store.dispatch('showMsg', res.data.message)
    }
    return res
}

export default {
    post(url, data) {
        return axios({
            method: 'post',
            url: config.api + url,
            data: qs.stringify(data),
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus).then(checkCode)
    },
    get(url, params) {
        return axios({
            method: 'get',
            url: config.api + url,
            params,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus).then(checkCode)
    }
}
