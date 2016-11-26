import api from '../../api'
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

const actions = {
    ['admin/getTopics'] ({commit, rootState: {route: { path, params: { page } }}}, config) {
        config.page = page
        return api.get('admin/topics', config).then(({ data }) => {
            commit(RECEIVE_ADMIN_TOPICS, {
                ...data.data,
                path
            })
        })
    },
    ['admin/getArticle'] ({ rootState: {route: { params: { id }}} }) {
        return api.get('admin/article', {
            id
        })
    },
    ['admin/deleteArticle'] ({commit}, config) {
        api.get('admin/article/delete', config).then(() => {
            commit(DELETE_ARTICLE, config.id)
        })
    },
    ['admin/recoverArticle'] ({commit}, config) {
        api.get('admin/article/recover', config).then(() => {
            commit(RECOVER_ARTICLE, config.id)
        })
    }
}

const mutations = {
    [RECEIVE_ADMIN_TOPICS](state, {list, path, hasNext, hasPrev}) {
        state.topic = {
            list,  path, hasNext, hasPrev
        }
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

const getters = {
    ['admin/getTopics'] (state) {
        return state.topic
    },
    ['admin/getArticle'] (state) {
        return state.article
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
