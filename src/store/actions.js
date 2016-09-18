/* global document, window */

import * as types from './mutation-types'
import api from '../api'
import toastr from 'toastr'
toastr.options.positionClass = 'toast-top-center'

export const gProgress = ({commit}, num) => {
    commit(types.GLOBAL_PROGRESS, num)
}

export const showMsg = ({commit}, config) => {
    let content, type
    if (typeof config === 'string') {
        content = config
        type = 'error'
    } else {
        content = config.content
        type = config.type
    }
    toastr[type](content)
}

export const hideMsg = () => {
    toastr.clear()
}

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

export const getAdminTopics = ({commit, state: {route: { path, params: { page } }}}, config) => {
    config.page = page
    return api.getFromConfig(config).then(({ data }) => {
        commit(types.RECEIVE_ADMIN_TOPICS, {
            ...data,
            path
        })
    })
}
export const getAdminArticle = ({ state: {route: { params: { id }}} }) => {
    return api.getFromConfig({
        action: "getArticle",
        id
    })
}

export const deleteArticle = ({commit}, config) => {
    api.getFromConfig(config).then(() => {
        commit(types.DELETE_ARTICLE, config.id)
    })
}

export const recoverArticle = ({commit}, config) => {
    api.getFromConfig(config).then(() => {
        commit(types.RECOVER_ARTICLE, config.id)
    })
}
