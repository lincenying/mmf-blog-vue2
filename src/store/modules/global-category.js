import api from '~api'

const state = {
    lists: [],
    item: {}
}

const actions = {
    async ['getCategoryList']({ commit }, config) {
        const { data: { data, code} } = await api.get('backend/category/list', config)
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
        state.item = {
            ...state.item,
            ...payload
        }
        const obj = state.lists.find(ii => ii._id === payload.id)
        if (obj) {
            obj.cate_name = payload.cate_name
            obj.cate_order = payload.cate_order
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
