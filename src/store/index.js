import Vue from 'vue'
import Vuex from 'vuex'
import backendAdmin from './modules/backend-admin'
import backendArticle from './modules/backend-article'
import backendUser from './modules/backend-user'
import frontendArticle from './modules/frontend-article'
import global from './modules/global'
import globalCategory from './modules/global-category'
import globalComment from './modules/global-comment'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        backend: {
            namespaced: true,
            modules: {
                admin: backendAdmin,
                article: backendArticle,
                user: backendUser
            }
        },
        frontend: {
            namespaced: true,
            modules: {
                article: frontendArticle
            }
        },
        global: {
            namespaced: true,
            ...global,
            modules: {
                category: globalCategory,
                comment: globalComment
            }
        }
    }
})
