import {
    GLOBAL_HIDEMSG,
    GLOBAL_LOADDING,
    GLOBAL_PROGRESS,
    GLOBAL_SHOWMSG
} from '../mutation-types'

const state = {
    loading: false,
    progress: 0,
    message: {
        type: '',
        content: '',
        title: ''
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

export default {
    state,
    mutations
}
