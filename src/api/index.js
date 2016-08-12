/* global $ */
import store from '../store'

$.ajaxSetup({
    url: '/api/',
    global: true,
    type: 'POST',
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
    getFromConfig(config) {
        return $.ajax({ data: config })
    },
    getData(config) {
        return $.ajax({
            global: false,
            data: config
        })
    }
}
