<template>
    <div class="header">
        <h1>My Blog</h1>
        <h5>Read intresting stuff here</h5>
    </div>
</template>

<script>
    export default {
        name: "BlogHeader",
    }
</script>

<style>
    .header {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--second-bg-color);
        border-radius: 8px;
        margin-bottom: 8px;
    }
    
    h1 {
        margin-bottom: 0;
        color: var(--second-item-color);
    }

    h5 {
        color: var(--main-item-color);
    }
</style>