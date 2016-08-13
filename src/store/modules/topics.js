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
        next: {}
    },
    comment: {
        list: [],
        hasNext: 0,
        page: 1,
        path: ''
    }
}

const mutations = {
    [RECEIVE_TOPICS](state, {hasNext, list, page, path}) {
        if (page === 1) {
            state.topic.list = [].concat(list)
        } else {
            state.topic.list = state.topic.list.concat(list)
        }
        state.topic.hasNext = hasNext
        state.topic.page = page
        state.topic.path = path
    },
    [RECEIVE_ARTICLE](state, {data, prev, next}) {
        state.article.data = data
        state.article.prev = prev
        state.article.next = next
    },
    [RECEIVE_COMMENT](state, {hasNext, list, path, page}) {
        if (page === 1) {
            state.comment.list = [].concat(list)
        } else {
            state.comment.list = state.comment.list.concat(list)
        }
        state.comment.hasNext = hasNext
        state.comment.path = path
        state.comment.page = page
    },
    [POST_COMMENT](state, data) {
        state.comment.list = [data].concat(state.comment.list)
    }
}

export default {
    state,
    mutations
}
