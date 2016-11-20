/* global $ */
import store from '../store'
import config from '../config'

$.ajaxSetup({
    global: true,
    dataType: 'json',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': 'Basic dGVzdDpwYXNzd2Q='
    }
})

$(document).ajaxStart(function() {
    store.dispatch('gProgress', 50)
})
$(document).ajaxComplete(function() {
    store.dispatch('gProgress', 100)
})

export default {
    get(url, data, global = true) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: config.api + url,
                type: 'get',
                data,
                global
            }).then(data => {
                resolve(data)
            }, error => {
                store.dispatch('showMsg', error.responseText || error.statusText)
                reject(error)
            })
        })
    },
    post(url, data, global = true) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: config.api + url,
                type: 'post',
                data,
                global
            }).then(data => {
                resolve(data)
            }, error => {
                store.dispatch('showMsg', error.responseText || error.statusText)
                reject(error)
            })
        })
    },
}
