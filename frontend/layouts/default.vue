<template>
    <div class="container">
        <BlogHeader />
        <Nuxt />
        <BlogFooter />
    </div>
</template>

<script>
import BlogHeader from '../components/BlogHeader.vue';
import BlogFooter from '../components/BlogFooter.vue';
    
export default {
    components: {
        BlogHeader,
        BlogFooter
    }
}
</script>

<style>
    :root {
        --main-bg-color: #F5EFE6;
        --second-bg-color: #E8DFCA;
        --main-item-color: #AEBDCA;
        --second-item-color: #7895B2;
    }

    body {
        background-color: var(--main-bg-color);
    }

    .container {
        margin: 0 auto;
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>