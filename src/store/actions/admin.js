import * as types from '../mutation-types'
import api from '../../api'

export const getAdminTopics = ({commit, state: {route: { path, params: { page } }}}, config) => {
    config.page = page
    return api.get('admin/topics', config).then(({ data }) => {
        commit(types.RECEIVE_ADMIN_TOPICS, {
            ...data,
            path
        })
    })
}
export const getAdminArticle = ({ state: {route: { params: { id }}} }) => {
    return api.get('admin/article', {
        id
    })
}

export const deleteArticle = ({commit}, config) => {
    api.get('admin/article/delete', config).then(() => {
        commit(types.DELETE_ARTICLE, config.id)
    })
}

export const recoverArticle = ({commit}, config) => {
    api.get('admin/article/recover', config).then(() => {
        commit(types.RECOVER_ARTICLE, config.id)
    })
}
