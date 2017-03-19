import api from '~api'

const state = {
    lists: {
        data: [],
        hasNext: 0,
        page: 1,
        path: ''
    }
}

const actions = {
    async ['getCommentList']({commit, rootState: {route: { path, params: { id } }}}, config) {
        const { data: { data, code} } = await api.get('frontend/comment/list', { ...config, id, cache: true })
        if (data && code === 200) {
            commit('recevieCommentList', {
                ...config,
                ...data,
                path
            })
        }
    }
}

const mutations = {
    ['recevieCommentList'](state, {list, hasNext, hasPrev, page, path}) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.lists.data.concat(list)
        }
        state.lists = {
            data: list, hasNext, hasPrev, page, path
        }
    },
    ['insertCommentItem'](state, data) {
        state.lists.data = [data].concat(state.lists.data)
    },
    ['deleteComment'](state, id) {
        const obj = state.lists.data.find(ii => ii._id === id)
        obj.is_delete = 1
    },
    ['recoverComment'](state, id) {
        const obj = state.lists.data.find(ii => ii._id === id)
        obj.is_delete = 0
    }
}

const getters = {
    ['getCommentList'](state) {
        return state.lists
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
