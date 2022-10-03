<template>
    <div class="body">
        <NuxtLink class="link" to="/addBlog">
            <div class="btn-add">
                Write Blog
            </div>
        </NuxtLink>
        <BlogsList />
    </div>
</template>

<script>
    import BlogsList from './BlogsList.vue';

    export default {
        name: "BlogBody",
        components: {BlogsList}
    }
</script>

<style>

.btn-add {
    width: 100%;
    text-align: center;
    height: 40px;
    background-color: orange;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>