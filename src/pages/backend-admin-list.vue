<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <div class="list-section list-header">
                <div class="list-username">用户名</div>
                <div class="list-email">邮箱</div>
                <div class="list-date">时间</div>
                <div class="list-action">操作</div>
            </div>
            <div v-for="item in admin.data" class="list-section">
                <div class="list-username">{{ item.username }}</div>
                <div class="list-email">{{ item.email }}</div>
                <div class="list-date">{{ item.update_date | timeYmd }}</div>
                <div class="list-action">
                    <router-link :to="'/backend/admin/modify/' + item._id" class="badge badge-success">编辑</router-link>
                    <a v-if="item.is_delete" @click="recover(item._id)" href="javascript:;">恢复</a>
                    <a v-else @click="deletes(item._id)" href="javascript:;">删除</a>
                </div>
            </div>
        </div>
        <div v-if="admin.hasNext" class="settings-footer clearfix">
            <a @click="loadMore()" class="admin-load-more" href="javascript:;">加载更多</a>
        </div>
    </div>
</template>

<script lang="babel">
import api from '~api'
import { mapGetters } from 'vuex'
const fetchInitialData = async (store, config = { page: 1}) => {
    await store.dispatch('backend/admin/getAdminList', config)
}
export default {
    name: 'backend-admin-list',
    computed: {
        ...mapGetters({
            admin: 'backend/admin/getAdminList'
        })
    },
    methods: {
        loadMore(page = this.admin.page + 1) {
            fetchInitialData(this.$store, {page})
        },
        async recover(id) {
            const { data: { code, message} } = await api.get('backend/admin/recover', { id })
            if (code === 200) {
                this.$store.dispatch('global/showMsg', {
                    type: 'success',
                    content: message
                })
                this.$store.commit('backend/admin/recoverAdmin', id)
            }
        },
        async deletes(id) {
            const { data: { code, message} } = await api.get('backend/admin/delete', { id })
            if (code === 200) {
                this.$store.dispatch('global/showMsg', {
                    type: 'success',
                    content: message
                })
                this.$store.commit('backend/admin/deleteAdmin', id)
            }
        }
    },
    mounted() {
        if (this.admin.data.length <= 0) {
            fetchInitialData(this.$store)
        }
    }
}
</script>
