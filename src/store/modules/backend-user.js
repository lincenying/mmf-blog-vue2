const state = () => ({
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
})

const actions = {
    async ['getUserList'](
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
        } = await $api.get('backend/user/list', { ...config, cache: true })
        if (data && code === 200) {
            commit('receiveUserList', {
                ...data,
                ...config
            })
        }
    },
    async ['getUserItem'](
        {
            commit,
            rootState: { $api }
        },
        config
    ) {
        const {
            data: { data, code }
        } = await $api.get('backend/user/item', config)
        if (data && code === 200) {
            commit('receiveUserItem', {
                data,
                ...config
            })
        }
    }
}

const mutations = {
    ['receiveUserList'](state, { list, path, hasNext, hasPrev, page }) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.lists.data.concat(list)
        }
        page++
        state.lists = {
            data: list,
            hasNext,
            hasPrev,
            page,
            path
        }
    },
    ['receiveUserItem'](state, payload) {
        state.item = payload
    },
    ['updateUserItem'](state, payload) {
        state.item.data = payload
        const index = state.lists.data.findIndex(ii => ii._id === payload._id)
        if (index > -1) {
            state.lists.data.splice(index, 1, payload)
        }
    },
    ['deleteUser'](state, id) {
        const obj = state.lists.data.find(ii => ii._id === id)
        if (obj) obj.is_delete = 1
    },
    ['recoverUser'](state, id) {
        const obj = state.lists.data.find(ii => ii._id === id)
        if (obj) obj.is_delete = 0
    }
}

const getters = {
    ['getUserList'](state) {
        return state.lists
    },
    ['getUserItem'](state) {
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
