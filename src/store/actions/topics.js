import * as types from '../mutation-types'
import api from '../../api'

export const getTopics = ({commit, state: {route: { path }}}, config) => {
    return api.get('frontend/topics', config).then(({ data }) => {
        commit(types.RECEIVE_TOPICS, {
            ...config,
            ...data,
            path
        })
    })
}

export const getArticle = ({ commit, state: {route: { params: { id }}} }) => {
    return api.get('frontend/article', {
        markdown: 1,
        id
    }).then(json => {
        commit(types.RECEIVE_ARTICLE, {
            ...json
        })
    })
}

export const getComment = ({ commit, state: {route: { path, params: { id }}} }, { page, limit }) => {
    return api.get('frontend/comment/list', {
        page,
        id,
        limit
    }).then(({ data }) => {
        commit(types.RECEIVE_COMMENT, {
            ...data,
            page,
            path
        })
    })
}

export const postComment = ({ commit, state: {route: { path, params: { id }}} }, config) => {
    return api.post('frontend/comment/post', config).then(json => {
        if (json.code === 200) {
            commit(types.POST_COMMENT, json.data)
            return json
        }
    })
}
