<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <div class="list-section">
                <div class="list-title">分类名称</div>
                <div class="list-time">分类排序</div>
                <div class="list-action">操作</div>
            </div>
            <div v-for="item in category" :key="item._id" class="list-section">
                <div class="list-title">{{ item.cate_name }}</div>
                <div class="list-time">{{ item.cate_order }}</div>
                <div class="list-action">
                    <router-link :to="'/backend/category/modify/' + item._id" class="badge badge-success">编辑</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import checkAdmin from '~mixins/check-admin'

export default {
    name: 'backend-category-list',
    mixins: [checkAdmin],
    async asyncData({ store, route }, config = { limit: 99 }) {
        config.all = 1
        await store.dispatch('global/category/getCategoryList', {
            ...config,
            path: route.path
        })
    },
    computed: {
        ...mapGetters({
            category: 'global/category/getCategoryList'
        })
    },
    mounted() {},
    metaInfo() {
        return {
            title: '分类列表 - M.M.F 小屋',
            meta: [{ vmid: 'description', name: 'description', content: 'M.M.F 小屋' }]
        }
    }
}
</script>
