<template>
    <div class="blog">
        <img :src="blog.cover" alt="cover image">
        <div style="padding: 0 8px;">
            <h3>{{blog.title}}</h3>
            <p class="description">{{blog.content}}</p>
            <div class="row">
                <div class="category">
                    <p>{{blog.category}}</p>
                </div>
                <p class="date">{{blog.date}}</p>
            </div>
        </div>
        <NuxtLink class="link" :to="`/detail/${blog.id}`" >
            <div class="btn">Read More</div>
        </NuxtLink>        
    </div>
</template>

<script>
    export default {
        name: "BlogItem",
        props: {
            blog: Object
        }
    }
</script>

<style>
    .blog {
        display: flex;
        flex-direction: column;
        margin: 16px 0;
        background-color: var(--second-bg-color);
        border-radius: 12px;
        flex-grow: 1;
    }

    .row {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
    }

    img {
        margin: 0;
        max-width: 100%;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
    }

    .description {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
                line-clamp: 3; 
        -webkit-box-orient: vertical;
    }

    .category {
        padding: 0 8px;
        background-color: orange;
        border-radius: 30px;
        font-size: 15px;
        padding: 0 16px;
        margin-bottom: 8px;
        color: var(--second-bg-color);
    }

    .date {
        color: var(--second-bg-color);
    }

    .btn {
        width: 100%;
        text-align: center;
        height: 40px;
        background-color: orange;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .link {
        text-decoration: none;
        color: var(--second-bg-color);
    }
</style>