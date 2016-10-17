import * as types from '../mutation-types'
import api from '../../api'

export const getTopics = ({commit, state: {route: { path }}}, config) => {
    return api.getFromConfig(config).then(({ data }) => {
        commit(types.RECEIVE_TOPICS, {
            ...config,
            ...data,
            path
        })
    })
}

export const getArticle = ({ commit, state: {route: { params: { id }}} }) => {
    return api.getFromConfig({
        action: "article",
        markdown: 1,
        id
    }).then(json => {
        commit(types.RECEIVE_ARTICLE, {
            ...json
        })
    })
}

export const getComment = ({ commit, state: {route: { path, params: { id }}} }, { page, limit }) => {
    return api.getFromConfig({
        action: "comment",
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
    return api.getFromConfig(config).then(json => {
        if (json.code === 200) {
            commit(types.POST_COMMENT, json.data)
        }
    })
}
