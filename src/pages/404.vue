<template>
    <div class="main wrap">
        <div class="main-left">
            <div class="card card-answer">
                <div class="answer-content">
                    <div class="not-found">
                        <img src="/static/images/error_1.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div class="main-right"><trending :trending="trending"></trending></div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import metaMixin from '@/mixins'
import trending from '../components/aside-trending.vue'

export default {
    name: 'frontend-about',
    components: {
        trending
    },
    mixins: [metaMixin],
    async asyncData({ store }) {
        await store.dispatch('frontend/article/getTrending')
    },
    computed: {
        ...mapGetters({
            trending: 'frontend/article/getTrending'
        })
    },
    mounted() {},
    metaInfo() {
        return {
            title: 'Page Not Found - M.M.F 小屋',
            meta: [{ vmid: 'description', name: 'description', content: 'M.M.F 小屋' }]
        }
    }
}
</script>
