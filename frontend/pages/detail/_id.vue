<template>
    <div class="detail">
        <img :src="blog.cover" alt="cover image">
        <div style="padding: 0 8px;">
            <div class="row">
                <h3 ref="title" :contenteditable="editing">{{blog.title}}</h3>
                <div class="icons">
                    <font-awesome-icon class="icon check" icon="check" @click="onDone" v-if="editing" />
                    <font-awesome-icon class="icon pen" icon="pen" @click="onEdit" v-else/>
                    <font-awesome-icon class="icon trash" icon="trash" @click="onDelete"/>
                </div>
            </div>
            <p ref="content" class="content" :contenteditable="editing">{{blog.content}}</p>
            <div class="row">
                <div class="category">
                    <p>{{blog.category}}</p>
                </div>
                <p class="date" style="color: black;">{{blog.date}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'; 

    export default {
        name: "Detail",
        data() {
            return {
                blog: {},
                editing: false
            }
        },
        methods: {
            ...mapActions(['findBlogById', 'removeBlog', 'updateBlog']),

            onEdit() {
                this.editing = true;
            },

            async onDone() {
                this.editing = false;
                let newBlog = {title: this.$refs.title.textContent, content: this.$refs.content.textContent};
                const id = await this.updateBlog({id: this.$route.params.id, newBlog: newBlog});
                this.$nuxt.refresh();
            },

            async onDelete() {
                const id = await this.removeBlog(this.$route.params.id);
                console.log(id);
                this.$router.push("/")
            }
        },
        async fetch() {
            this.blog = await this.findBlogById(this.$route.params.id);
        },
    }
</script>

<style>
    .detail {
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: var(--second-bg-color);
        border-radius: 8px;
        margin: 16px 0;
    }

    .icons {
        margin: auto 0;
    }

    .icon {
        margin: 0 8px;
    }

    .trash:hover {
        color: red;
    }

    .pen:hover {
        color: green;
    }

    .content {
        margin: 8px 16px;
    }
</style>