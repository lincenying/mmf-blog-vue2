import Vue from 'vue'
import ls from 'store2'
import toastr from 'toastr'
import get from 'lodash.get'

toastr.options.positionClass = 'toast-top-center'

export const inBrowser = typeof window !== 'undefined'

export const ua = () => {
    const userAgentInfo = inBrowser ? navigator.userAgent : ''
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod']
    let flag = 'PC'
    for (let vv = 0; vv < Agents.length; vv++) {
        if (userAgentInfo.indexOf(Agents[vv]) > 0) {
            flag = Agents[vv]
            break
        }
    }
    return flag
}

export const UTC2Date = (utc, format, add) => {
    if (!format) format = 'y-m-d'
    if (utc && typeof utc === 'string') utc = utc.replace(/-/g, '/').replace('.000000', '')
    let newDate = utc ? new Date(utc) : new Date()
    if (add) newDate = new Date(newDate.setDate(newDate.getDate() + add))
    const year = newDate.getFullYear()
    let month = newDate.getMonth() + 1
    let date = newDate.getDate()
    let hours = newDate.getHours()
    let minutes = newDate.getMinutes()
    let seconds = newDate.getSeconds()
    let mseconds = newDate.getMilliseconds()
    month = month < 10 ? '0' + month : month
    date = date < 10 ? '0' + date : date
    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
    if (mseconds < 100 && mseconds > 9) {
        mseconds = '0' + mseconds
    } else if (mseconds < 10) {
        mseconds = '00' + mseconds
    }
    return format
        .replace(/y/gi, year)
        .replace(/m/gi, month)
        .replace(/d/gi, date)
        .replace(/h/gi, hours)
        .replace(/i/gi, minutes)
        .replace(/s/gi, seconds)
        .replace(/v/gi, mseconds)
}

export const ssp = path => {
    if (!inBrowser) return
    const clientHeight = document.documentElement.clientHeight,
        scrollTop = ls.get(path)
    if (scrollTop) {
        Vue.nextTick().then(() => {
            if (document.body.clientHeight >= scrollTop + clientHeight) {
                window.scrollTo(0, scrollTop)
            }
            ls.remove(path)
        })
    }
}

export const strlen = str => {
    let charCode = -1
    const len = str.length
    let realLength = 0
    for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) realLength += 1
        else realLength += 2
    }
    return realLength
}

export const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const showMsg = message => {
    let content, type
    if (typeof message === 'string') {
        content = message
        type = 'error'
    } else {
        content = message.content
        type = message.type
    }
    toastr[type](content)
}

export const oc = (props, property, def) => {
    return get(props, property, def)
}
