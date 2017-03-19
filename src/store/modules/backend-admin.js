import api from '~api'

const state = {
    lists: {
        hasNext: false,
        hasPrev: false,
        path: '',
        page: 1,
        data: []
    },
    item: {
        data: {},
        path: ''
    }
}

const actions = {
    async ['getAdminList'] ({commit, rootState: {route: { path }}}, config) {
        const { data: { data, code} } = await api.get('backend/admin/list', {...config, cache: true})
        if (data && code === 200) {
            commit('receiveAdminList', {
                ...data,
                path,
                page: config.page
            })
        }
    },
    async ['getAdminItem'] ({commit, rootState: {route: { path, params: { id } }}}) {
        const { data: { data, code} } = await api.get('backend/admin/item', { id })
        if (data && code === 200) {
            commit('receiveAdminItem', {
                data,
                path
            })
        }
    }
}

const mutations = {
    ['receiveAdminList'](state, {list, path, hasNext, hasPrev, page}) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.lists.data.concat(list)
        }
        page++
        state.lists = {
            data: list, hasNext, hasPrev, page, path
        }
    },
    ['receiveAdminItem'](state, payload) {
        state.item = payload
    },
    ['updateAdminItem'](state, payload) {
        state.item.data = payload
        const index = state.lists.data.findIndex(ii => ii._id === payload._id)
        if (index > -1) {
            state.lists.data.splice(index, 1, payload)
        }
    },
    ['deleteAdmin'](state, id) {
        const obj = state.lists.data.find(ii => ii._id === id)
        if (obj) obj.is_delete = 1
    },
    ['recoverAdmin'](state, id) {
        const obj = state.lists.data.find(ii => ii._id === id)
        if (obj) obj.is_delete = 0
    }
}

const getters = {
    ['getAdminList'] (state) {
        return state.lists
    },
    ['getAdminItem'] (state) {
        return state.item
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
