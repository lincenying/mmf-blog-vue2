function pluralize(time, label) {
    return time + label
}

export function timeAgo(time) {
    const preg = /^[\d]+$/
    const timestamp = preg.test(time)
    if (!timestamp) {
        const tmp = Date.parse(time)
        time = tmp / 1000
    }
    const between = Date.now() / 1000 - Number(time)
    if (between < 60) {
        return '刚刚'
    } else if (between < 3600) {
        return pluralize(parseInt(between / 60, 10), ' 分钟前')
    } else if (between < 86400) {
        return pluralize(parseInt(between / 3600, 10), ' 小时前')
    }
    return pluralize(parseInt(between / 86400, 10), ' 天前')
}

export function timeYmd(timestamp) {
    const preg = /^[\d]+$/
    const isTimestamp = preg.test(timestamp)
    if (!isTimestamp) {
        let time = Date.parse(timestamp)
        time /= 1000
        timestamp = time
    }
    const tmp = new Date(timestamp * 1000)
    var year = tmp.getFullYear()
    var month = tmp.getMonth() + 1
    var date = tmp.getDate()
    return year + "-" + (month < 10 ? '0' + month : month) + "-" + (date < 10 ? '0' + date : date)
}
