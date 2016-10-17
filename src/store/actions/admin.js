import * as types from '../mutation-types'
import api from '../../api'

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
