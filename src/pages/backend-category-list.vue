<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <div class="list-section">
                <div class="list-title">分类名称</div>
                <div class="list-time">分类排序</div>
                <div class="list-action">操作</div>
            </div>
            <div v-for="item in category" class="list-section">
                <div class="list-title">{{ item.cate_name }}</div>
                <div class="list-time">{{ item.cate_order }}</div>
                <div class="list-action">
                    <router-link :to="'/backend/category/modify/' + item._id" class="badge badge-success">编辑</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
import { mapGetters } from 'vuex'
const fetchInitialData = async (store, config = { limit: 99}) => {
    await store.dispatch('global/category/getCategoryList', config)
}
export default {
    name: 'backend-category-list',
    computed: {
        ...mapGetters({
            category: 'global/category/getCategoryList'
        })
    },
    mounted() {
        if (this.category.length <= 0) {
            fetchInitialData(this.$store)
        }
    }
}
</script>
