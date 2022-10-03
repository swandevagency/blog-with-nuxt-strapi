<template>
    <div class="detail">
        <form @submit="onsubmit">
            <label for="title">Title: </label>
            <input id="title" type="text" v-model="title">
            <label for="content">Content: </label>
            <textarea id="content" type="text" v-model="content"></textarea>
            <label for="category">Category</label>
            <input id="category" type="text" v-model="category">
            <label for="file">Cover</label>
            <input id="file" type="file" @change="upload($event)">
            <button type="submit" class="btn-publish">publish</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

    export default {
        name: "addBlog",
        data() {
            return {
                title: null,
                content: null,
                category: null,
                file: null,
            }
        },
        methods: {
            ...mapActions(['addBlog']),

            upload(e) {
                let data = new FormData();
                data.append('files', e.target.files[0]);
                this.file = data;
            },

            async onsubmit(e) {
                e.preventDefault();
                this.addBlog({blog: {title: this.title, content: this.content, category: this.category}, formData: this.file});
                this.$router.push('/');
            }
        }
    }
</script>
    
<style scoped>
    input {
        margin-top: 8px;
    }

    form {
        display: flex;
        flex-direction: column;
        padding: 8px;
    }

    .btn-publish {
        background-color: orange;
        border-radius: 12px;
        color: var(--second-bg-color);
        margin-top: 8px;
    }
</style>