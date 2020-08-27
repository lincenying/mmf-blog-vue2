<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <div class="list-section list-header">
                <div class="list-username">用户名</div>
                <div class="list-email">邮箱</div>
                <div class="list-date">时间</div>
                <div class="list-action">操作</div>
            </div>
            <div v-for="item in user.data" :key="item._id" class="list-section">
                <div class="list-username">{{ item.username }}</div>
                <div class="list-email">{{ item.email }}</div>
                <div class="list-date">{{ item.update_date | timeYmd }}</div>
                <div class="list-action">
                    <router-link :to="'/backend/user/modify/' + item._id" class="badge badge-success">编辑</router-link>
                    <a v-if="item.is_delete" @click="recover(item._id)" href="javascript:;">恢复</a>
                    <a v-else @click="deletes(item._id)" href="javascript:;">删除</a>
                </div>
            </div>
        </div>
        <div v-if="user.hasNext" class="settings-footer">
            <a v-if="!loading" @click="loadMore()" class="admin-load-more" href="javascript:;">加载更多</a>
            <a v-else class="admin-load-more" href="javascript:;">加载中...</a>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { showMsg } from '@/utils'
// import api from '~api'
import checkAdmin from '@/mixins/check-admin'

export default {
    name: 'backend-user-list',
    mixins: [checkAdmin],
    async asyncData({ store, route }, config = { page: 1 }) {
        await store.dispatch('backend/user/getUserList', {
            ...config,
            path: route.path
        })
    },
    data() {
        return {
            loading: false
        }
    },
    computed: {
        ...mapGetters({
            user: 'backend/user/getUserList'
        })
    },
    mounted() {},
    methods: {
        async loadMore(page = this.user.page + 1) {
            this.loading = true
            await this.$options.asyncData({ store: this.$store, route: this.$route }, { page })
            this.loading = false
        },
        async recover(id) {
            const { code, message } = await this.$store.$api.get('backend/user/recover', { id })
            if (code === 200) {
                showMsg({
                    type: 'success',
                    content: message
                })
                this.$store.commit('backend/user/recoverUser', id)
            }
        },
        async deletes(id) {
            const { code, message } = await this.$store.$api.get('backend/user/delete', { id })
            if (code === 200) {
                showMsg({
                    type: 'success',
                    content: message
                })
                this.$store.commit('backend/user/deleteUser', id)
            }
        }
    },
    metaInfo() {
        return {
            title: '用户列表 - M.M.F 小屋',
            meta: [{ vmid: 'description', name: 'description', content: 'M.M.F 小屋' }]
        }
    }
}
</script>
