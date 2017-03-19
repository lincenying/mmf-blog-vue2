import api from '~api'

const state = {
    lists: [],
    item: {}
}

const actions = {
    async ['getCategoryList']({ commit, state }, config) {
        if (state.lists.length) return
        const { data: { data, code} } = await api.get('backend/category/list', {...config, cache: true})
        if (data && code === 200) {
            commit('receiveCategoryList', data.list)
        }
    },
    async ['getCategoryItem'] ({commit, rootState: {route: { params: { id } }}}) {
        const { data: { data, code} } = await api.get('backend/category/item', { id })
        if (data && code === 200) {
            commit('receiveCategoryItem', data)
        }
    }
}

const mutations = {
    ['receiveCategoryList'](state, payload) {
        state.lists = payload
    },
    ['receiveCategoryItem'](state, payload) {
        state.item = payload
    },
    ['insertCategoryItem'](state, payload) {
        state.lists = [payload].concat(state.lists)
    },
    ['updateCategoryItem'](state, payload) {
        state.item = payload
        const index = state.lists.findIndex(ii => ii._id === payload._id)
        if (index > -1) {
            state.lists.splice(index, 1, payload)
        }
    }
}

const getters = {
    ['getCategoryList'] (state) {
        return state.lists
    },
    ['getCategoryItem'] (state) {
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
