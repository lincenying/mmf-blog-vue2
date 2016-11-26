import Vue from 'vue'
import Vuex from 'vuex'
import frontend from './modules/frontend'
import admin from './modules/admin'
import global from './modules/global'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        frontend,
        admin,
        global
    }
})
