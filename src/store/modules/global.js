const state = () => ({
    loading: false,
    cookies: {},
    showLoginModal: false,
    showRegisterModal: false
})

const actions = {}

const mutations = {
    ['showLoginModal'](state, payload) {
        state.showLoginModal = payload
    },
    ['showRegisterModal'](state, payload) {
        state.showRegisterModal = payload
    },
    ['setCookies'](state, cookies) {
        state.cookies = cookies
    }
}

const getters = {
    ['get'](state) {
        return state
    }
}

export default {
    actions,
    state,
    mutations,
    getters
}
