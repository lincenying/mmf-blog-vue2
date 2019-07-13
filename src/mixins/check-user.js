import cookies from 'js-cookie'
import { inBrowser } from '@/utils'

export default {
    beforeRouteEnter(to, from, next) {
        if (inBrowser && !cookies.get('user')) {
            window.location.href = '/'
        }
        next()
    }
}
