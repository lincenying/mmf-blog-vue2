import api from '../../api'
import {
    RECEIVE_TOPICS, RECEIVE_ARTICLE, RECEIVE_COMMENT, POST_COMMENT
} from '../mutation-types'

const state = {
    topic: {
        list: [],
        hasNext: 0,
        page: 1,
        path: ''
    },
    article: {
        data: {},
        prev: {},
        next: {},
        path: ''
    },
    comment: {
        list: [],
        hasNext: 0,
        page: 1,
        path: ''
    }
}

const actions = {
    ['frontend/getTopics']({commit, rootState: {route: { path }}}, config) {
        return api.get('frontend/topics', config).then(({ data }) => {
            commit(RECEIVE_TOPICS, {
                ...config,
                ...data.data,
                path
            })
        })
    },
    ['frontend/getArticle']({ commit, rootState: {route: { path, params: { id }}} }) {
        return api.get('frontend/article', {
            markdown: 1,
            id
        }).then(({data}) => {
            commit(RECEIVE_ARTICLE, {
                ...data,
                path
            })
        })
    },
    ['frontend/getComment']({ commit, rootState: {route: { path, params: { id }}} }, { page, limit }) {
        return api.get('frontend/comment/list', {
            page,
            id,
            limit
        }).then(({ data }) => {
            commit(RECEIVE_COMMENT, {
                ...data.data,
                page,
                path
            })
        })
    },
    ['frontend/postComment']({ commit, rootState: {route: { path, params: { id }}} }, config) {
        return api.post('frontend/comment/post', config).then(({data}) => {
            if (data.code === 200) {
                commit(POST_COMMENT, data.data)
                return data
            }
        })
    }
}

const mutations = {
    [RECEIVE_TOPICS](state, {hasNext, list, page, path}) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.topic.list.concat(list)
        }
        state.topic = {
            list, hasNext, page, path
        }
    },
    [RECEIVE_ARTICLE](state, {data, prev, next, path}) {
        state.article = {
            data, prev, next, path
        }
    },
    [RECEIVE_COMMENT](state, {hasNext, list, path, page}) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.comment.list.concat(list)
        }
        state.comment = {
            list, hasNext, path, page
        }
    },
    [POST_COMMENT](state, data) {
        state.comment.list = [data].concat(state.comment.list)
    }
}

const getters = {
    ['frontend/getTopics'](state) {
        return state.topic
    },
    ['frontend/getArticle'](state) {
        return state.article
    },
    ['frontend/getComment'](state) {
        return state.comment
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
