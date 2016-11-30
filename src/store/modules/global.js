import toastr from 'toastr'
import {inBrowser} from '../../utils'
import {
    GLOBAL_HIDEMSG,
    GLOBAL_LOADDING,
    GLOBAL_PROGRESS,
    GLOBAL_SHOWMSG
} from '../mutation-types'

toastr.options.positionClass = 'toast-top-center'

const state = {
    loading: false,
    progress: 0,
    message: {
        type: '',
        content: '',
        title: ''
    }
}

const actions = {
    ['gProgress']({commit}, num) {
        commit(GLOBAL_PROGRESS, num)
    },
    ['showMsg']({commit}, config) {
        let content, type
        if (typeof config === 'string') {
            content = config
            type = 'error'
        } else {
            content = config.content
            type = config.type
        }
        if (inBrowser) toastr[type](content)
    },
    ['hideMsg']() {
        toastr.clear()
    }
}

const mutations = {
    [GLOBAL_LOADDING](state, status) {
        state.loading = status
    },
    [GLOBAL_PROGRESS](state, num) {
        state.progress = num
    },
    [GLOBAL_SHOWMSG](state, action) {
        state.message = {...action}
    },
    [GLOBAL_HIDEMSG](state) {
        state.message = {
            type: '',
            content: '',
            title: ''
        }
    }
}

const getters = {
    ['getGlobal'](state) {
        return state
    }
}

export default {
    actions,
    state,
    mutations,
    getters
}
