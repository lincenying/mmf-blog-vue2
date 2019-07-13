import cookies from 'js-cookie'
import { inBrowser } from '@/utils'

export default {
    beforeRouteEnter(to, from, next) {
        if (inBrowser && !cookies.get('b_user')) {
            window.location.href = '/backend'
        }
        next()
    }
}
