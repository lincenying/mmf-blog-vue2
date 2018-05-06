const state = () => ({
    lists: {
        data: [],
        path: '',
        hasNext: 0,
        hasPrev: 0,
        page: 1
    }
})

const actions = {
    async ['getArticleList'](
        {
            commit,
            state,
            rootState: { $api }
        },
        config
    ) {
        if (state.lists.data.length > 0 && config.path === state.lists.path && config.page === 1) return
        const {
            data: { data, code }
        } = await $api.get('backend/article/list', config)
        if (data && code === 200) {
            commit('receiveArticleList', {
                ...data,
                ...config
            })
        }
    },
    async ['getArticleItem'](
        {
            rootState: { $api }
        },
        config
    ) {
        const {
            data: { data, code }
        } = await $api.get('backend/article/item', config)
        if (data && code === 200) {
            return data
        }
    },
    async ['deleteArticle'](
        {
            commit,
            rootState: { $api }
        },
        config
    ) {
        const {
            data: { code }
        } = await $api.get('backend/article/delete', config)
        if (code === 200) {
            commit('deleteArticle', config.id)
        }
    },
    async ['recoverArticle'](
        {
            commit,
            rootState: { $api }
        },
        config
    ) {
        const {
            data: { code }
        } = await $api.get('backend/article/recover', config)
        if (code === 200) {
            commit('recoverArticle', config.id)
        }
    }
}

const mutations = {
    ['receiveArticleList'](state, { list, path, hasNext, hasPrev, page }) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.lists.data.concat(list)
        }
        state.lists = {
            data: list,
            path,
            hasNext,
            hasPrev,
            page
        }
    },
    ['insertArticleItem'](state, payload) {
        if (state.lists.path) {
            state.lists.data = [payload].concat(state.lists.data)
        }
    },
    ['updateArticleItem'](state, data) {
        const index = state.lists.data.findIndex(ii => ii._id === data._id)
        if (index > -1) {
            state.lists.data.splice(index, 1, data)
        }
    },
    ['deleteArticle'](state, id) {
        const obj = state.lists.data.find(ii => ii._id === id)
        if (obj) obj.is_delete = 1
    },
    ['recoverArticle'](state, id) {
        const obj = state.lists.data.find(ii => ii._id === id)
        if (obj) obj.is_delete = 0
    }
}

const getters = {
    ['getArticleList'](state) {
        return state.lists
    },
    ['getArticleItem'](state) {
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
