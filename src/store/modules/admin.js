import {
    DELETE_ARTICLE,
    RECEIVE_ADMIN_TOPICS,
    RECOVER_ARTICLE,
    UPDATE_ADMIN_ARTICLE,
    RECEIVE_ADMIN_ARTICLE
} from '../mutation-types'

const state = {
    topic: {
        list: [],
        path: '',
        hasNext: 0,
        hasPrev: 0
    },
    article: {}
}

const mutations = {
    [RECEIVE_ADMIN_TOPICS](state, {list, path, hasNext, hasPrev}) {
        state.topic.list = list
        state.topic.path = path
        state.topic.hasNext = hasNext
        state.topic.hasPrev = hasPrev
    },
    [RECEIVE_ADMIN_ARTICLE](state, { data }) {
        state.article = data
    },
    [UPDATE_ADMIN_ARTICLE](state, data) {
        const obj = state.topic.list.find(ii => ii._id === data._id)
        for (const jj in obj) {
            if (obj.hasOwnProperty(jj) && data[jj]) {
                obj[jj] = data[jj]
            }
        }
    },
    [DELETE_ARTICLE](state, id) {
        const obj = state.topic.list.find(ii => ii._id === id)
        obj.is_delete = 1
    },
    [RECOVER_ARTICLE](state, id) {
        const obj = state.topic.list.find(ii => ii._id === id)
        obj.is_delete = 0
    }
}

export default {
    state,
    mutations
}
