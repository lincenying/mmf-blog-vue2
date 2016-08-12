import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import topics from './modules/topics'
import admin from './modules/admin'
import global from './modules/global'

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        topics,
        admin,
        global
    }
})
