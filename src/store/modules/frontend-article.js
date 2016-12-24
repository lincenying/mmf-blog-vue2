import api from '~api'

const state = {
    lists: {
        data: [],
        hasNext: 0,
        page: 1,
        path: ''
    },
    item: {
        data: {},
        path: ''
    },
    trending: []
}

const actions = {
    async ['getArticleList']({commit, rootState: {route: { path }}}, config) {
        const { data: { data, code} } = await api.get('frontend/article/list', config)
        if (data && code === 200) {
            commit('receiveArticleList', {
                ...config,
                ...data,
                path
            })
        }
    },
    async ['getArticleItem']({ commit, rootState: {route: { path, params: { id }}} }) {
        const { data: { data, code} } = await api.get('frontend/article/item', { markdown: 1, id })
        if (data && code === 200) {
            commit('receiveArticleItem', {
                data,
                path
            })
        }
    },
    async ['getTrending']({ commit }) {
        const { data: { data, code} } = await api.get('frontend/trending')
        if (data && code === 200) {
            commit('receiveTrending', data)
        }
    }
}

const mutations = {
    ['receiveArticleList'](state, {list, hasNext, hasPrev, page, path}) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.lists.data.concat(list)
        }
        state.lists = {
            data: list, hasNext, hasPrev, page, path
        }
    },
    ['receiveArticleItem'](state, {data, path}) {
        state.item = {
            data, path
        }
    },
    ['receiveTrending'](state, data) {
        state.trending = data.list
    }
}

const getters = {
    ['getArticleList'](state) {
        return state.lists
    },
    ['getArticleItem'](state) {
        return state.item
    },
    ['getTrending'](state) {
        return state.trending
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
