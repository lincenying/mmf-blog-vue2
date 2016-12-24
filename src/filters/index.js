function pluralize(time, label) {
    return time + label
}

export function timeAgo(time) {
    const between = Date.now() / 1000 - Number(time)
    if (between < 3600) {
        return pluralize(parseInt(between / 60, 10), ' 分钟前')
    } else if (between < 86400) {
        return pluralize(parseInt(between / 3600, 10), ' 小时前')
    }
    return pluralize(parseInt(between / 86400, 10), ' 天前')
}

export function timeYmd(timestamp) {
    var time = new Date(timestamp * 1000)
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var date = time.getDate()
    return year + "-" + (month < 10 ? '0' + month : month) + "-" + (date < 10 ? '0' + date : date)
}
