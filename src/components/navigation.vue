<template>
    <div>
        <div v-if="visit" class="box menu">
            <div class="m-sch">
                <input @keyup.enter="search($event)" id="search_content" class="sch" type="text" name="q" placeholder="记得按回车哦" />
            </div>
            <div class="m-nav">
                <ul class="menuOpen">
                    <li class="tag-all">
                        <router-link to="/" exact><i></i>All</router-link>
                    </li>
                    <li class="tag-life">
                        <router-link to="/category/1"><i></i>Life</router-link>
                    </li>
                    <li class="tag-study">
                        <router-link to="/category/2"><i></i>Study</router-link>
                    </li>
                    <li class="tag-other">
                        <router-link to="/category/3"><i></i>Other</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else class="box menu">
            <div class="m-nav">
                <ul class="menuOpen">
                    <li class="tag-all">
                        <router-link to="/" exact><i></i>All</router-link>
                    </li>
                    <li class="tag-life">
                        <router-link to="/admin/list/1"><i></i>List</router-link>
                    </li>
                    <li class="tag-study">
                        <router-link to="/admin/post"><i></i>Post</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
export default {
    props: ['visit', 'search']
}
</script>
