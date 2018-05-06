/* eslint-disable valid-jsdoc */
/**
 * @file app shell store
 * @author lincenying(lincenying@qq.com)
 */

export function createAppShellState() {
    const state = {
        /**
         * 是否需要页面切换动画
         *
         * @type {boolean}
         */
        needPageTransition: true,

        /**
         * 多个页面是否处于切换中
         *
         * @type {boolean}
         */
        isPageSwitching: false,

        /**
         * 多个页面切换效果名称
         *
         * @type {string}
         */
        pageTransitionName: '',

        /**
         * 上个页面 scroll 的信息
         *
         * @type {Object}
         */
        historyPageScrollTop: {}
    }

    const actions = {
        /**
         * 开启页面切换动画
         *
         * @param {Function} commit commit
         */
        enablePageTransition({ commit }) {
            commit('enablePageTransition', true)
        },

        /**
         * 关闭页面切换动画
         *
         * @param {Function} commit commit
         */
        disablePageTransition({ commit }) {
            commit('disablePageTransition', false)
        },

        /**
         * 设置页面是否处于切换中
         *
         * @param {Function} commit commit
         * @param {boolean} isPageSwitching isPageSwitching
         */
        setPageSwitching({ commit }, isPageSwitching) {
            commit('setPageSwitching', isPageSwitching)
        },

        /**
         * 保存页面 scroll 高度
         *
         * @param {[type]} options.commit [description]
         * @param {string} options.path path
         * @param {number} options.scrollTop scrollTop
         */
        saveScrollTop({ commit }, { path, scrollTop }) {
            commit('saveScrollTop', { path, scrollTop })
        }
    }

    const mutations = {
        ['setPageSwitching'](state, isPageSwitching) {
            state.isPageSwitching = isPageSwitching
        },
        ['setPageTransitionName'](state, { pageTransitionName }) {
            state.pageTransitionName = pageTransitionName
        },
        ['saveScrollTop'](state, { path, scrollTop }) {
            state.historyPageScrollTop[path] = scrollTop
        }
    }

    return {
        namespaced: true,
        actions,
        mutations,
        state
    }
}
