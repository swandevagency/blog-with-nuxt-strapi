<template>
    <div class="blog-list">
        <div class="item" v-for="blog in blogs" :key="blog.id">
            <BlogItem :blog="blog" />
        </div>
    </div>
</template>

<script>
    import BlogItem from './BlogItem.vue';
    import { mapActions } from 'vuex';

    export default {
        name: "BlogsList",
        components: {BlogItem},
        methods: {
            ...mapActions(['retrieveBlogs'])
        },
        data() {
            return {
                blogs: []
            }
        },
        async fetch() {
            this.blogs = await this.retrieveBlogs();
        }
    }
</script>

<style>
    .blog-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        border-radius: 8px;
        margin: 16px 0;
    }

    .item {
        flex-basis: 31%;
        margin: 8px;
    }
</style>