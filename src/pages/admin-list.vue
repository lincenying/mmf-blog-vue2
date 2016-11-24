<template>
    <div class="g-mn">
        <div class="box">
            <ul class="list-group">
                <li v-for="item in topics.list" class="list-group-item">
                    <router-link :to="'/article/' + item._id" target="_blank" v-text="item.title"></router-link>
                    <a v-if="item.is_delete == 0" @click="mdel(item._id)" href="javascript:;" class="badge badge-danger">删除</a>
                    <a v-else @click="recover(item._id)" href="javascript:;" class="badge badge-info">恢复</a>
                    <router-link :to="'/admin/edit/' + item._id + '/' + curPage" class="badge badge-success">编辑</router-link>
                </li>
            </ul>
        </div>
        <div class="box m-page box-do">
            <div class="w-icon w-icon-2"></div>
            <div class="w-icon w-icon-3"></div>
            <router-link v-if="topics.hasPrev" :to="'/admin/list/' + prevPage" id="__prev_permalink__" class="prev">上一页</router-link>
            <router-link v-if="topics.hasNext" :to="'/admin/list/' + nextPage" id="__next_permalink__" class="next">下一页</router-link>
        </div>
    </div>
</template>

<script lang="babel">
import { mapGetters } from 'vuex'
const fetchInitialData = async store => {
    await store.dispatch('getAdminTopics', {limit: 20})
}
export default {
    computed: {
        ...mapGetters({
            topics: 'getAdminTopics'
        }),
        curPage() {
            return parseInt(this.$route.params.page, 10)
        },
        prevPage() {
            return parseInt(this.$route.params.page, 10) - 1
        },
        nextPage() {
            return parseInt(this.$route.params.page, 10) + 1
        }
    },
    methods: {
        mdel(id) {
            this.$store.dispatch('deleteArticle', {
                id
            })
        },
        recover(id) {
            this.$store.dispatch('recoverArticle', {
                id
            })
        }
    },
    created() {
        fetchInitialData(this.$store)
    },
    watch: {
        '$route'() {
            fetchInitialData(this.$store)
        }
    }
}
</script>
