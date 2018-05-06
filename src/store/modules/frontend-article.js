const state = () => ({
    lists: {
        data: [],
        hasNext: 0,
        page: 1,
        path: ''
    },
    item: {
        data: {},
        path: '',
        isLoad: false
    },
    trending: []
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
        } = await $api.get('frontend/article/list', { ...config, cache: true })
        if (data && code === 200) {
            commit('receiveArticleList', {
                ...config,
                ...data
            })
        }
    },
    async ['getArticleItem'](
        {
            commit,
            state,
            rootState: { $api }
        },
        config
    ) {
        if (config.path === state.item.path) return
        const {
            data: { data, code }
        } = await $api.get('frontend/article/item', { ...config, markdown: 1, cache: true })
        if (data && code === 200) {
            commit('receiveArticleItem', {
                data,
                ...config
            })
        }
    },
    async ['getTrending']({ commit, state, rootState: { $api } }) {
        if (state.trending.length) return
        const {
            data: { data, code }
        } = await $api.get('frontend/trending', { cache: true })
        if (data && code === 200) {
            commit('receiveTrending', data)
        }
    }
}

const mutations = {
    ['receiveArticleList'](state, { list, hasNext, hasPrev, page, path }) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.lists.data.concat(list)
        }
        state.lists = {
            data: list,
            hasNext,
            hasPrev,
            page,
            path
        }
    },
    ['receiveArticleItem'](state, { data, path }) {
        state.item = {
            data,
            path,
            isLoad: true
        }
    },
    ['receiveTrending'](state, data) {
        state.trending = data.list
    },
    ['modifyLikeStatus'](state, { id, status }) {
        if (state.item.data._id === id) {
            if (status) state.item.data.like++
            else state.item.data.like--
            state.item.data.like_status = status
        }
        const obj = state.lists.data.find(item => item._id === id)
        if (obj) {
            if (status) obj.like++
            else obj.like--
            obj.like_status = status
        }
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
