import config from "../config";

function resToBlog(blog) {
    return {id: blog.id, title: blog.attributes.title,
        content: blog.attributes.content, category: blog.attributes.category, 
        date: new Date(blog.attributes.publishedAt).toDateString(), 
        cover: "http://localhost:1337"+blog.attributes.cover.data.attributes.url,
    };
}

export const state = () => ({
    blogs: [],
    id_to_index: {}
});

export const getters = {
    allBlogs(state) {
        return state.blogs;
    },
};

export const actions = {
    async retrieveBlogs({ commit, state }) {
        let blogs = await fetch("http://localhost:1337/api/blogs?populate=cover", {
            headers: {
                "Authorization": "bearer 21b32fc29af5757c31bd630b0a02b33d87b8a2af39305857be8d62b82c4f4ee2e8b80fe582f69ce27f4c403d469c8d60efb19be5f4526f36cbd431bea9b3cd2a7b09940424942685ce1ae9d7a233c5822afc3aa0a7d3fcddf241434650fa7e9ebe13d4b20d3d6dab83734a7cccff4f351befaa6638fab6d23706b9d020fc0895"
            }
        });
        blogs = await blogs.json();
        blogs = blogs.data.map((blog, i) => {
                state.id_to_index[blog.id] = i;
                return resToBlog(blog);
            });
        
        commit("setBlogs", blogs);
        return blogs;
    },

    async findBlogById({ state }, id) {
        if (id in state.id_to_index) {
            return state.blogs[state.id_to_index[id]];
        } else {
            let blog = await fetch(`http://localhost:1337/api/blogs/${id}?populate=cover`,{
                headers: {
                    "Authorization": config.token
                }
            });
            blog = await blog.json();
            return resToBlog(blog.data);
        }
    },

    async addBlog({ commit }, {blog, formData}) {
        let imageid = await fetch("http://localhost:1337/api/upload", {
            method: "POST",
            headers: {
                "Authorization": config.token,
            },
            body: formData
        });
        imageid = await imageid.json();
        imageid = imageid[0].id;
        console.log(imageid)

        blog.cover = imageid;
        let res = await fetch("http://localhost:1337/api/blogs?populate=cover", {
            method: "POST",
            headers: {
                "Authorization": config.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({data: blog})
        });
        blog = await res.json();
        console.log(blog)
        blog = resToBlog(blog.data);
    
        commit("newBlog", blog);
        return blog.id;
    },

    async removeBlog({ commit }, id) {
        let res = await fetch(`http://localhost:1337/api/blogs/${id}`, {
            headers: {
                "Authorization": config.token
            },
            method: "DELETE"
        });
        res = await res.json();

        commit("removeBlog", id);
        return res.data.id;
    },

    async updateBlog({ commit }, {id, newBlog}) {
        let res = await fetch(`http://localhost:1337/api/blogs/${id}?populate=cover`, {
            headers: {
                "Authorization": config.token,
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify({data: newBlog})
        });
        newBlog = await res.json();
        newBlog = resToBlog(newBlog.data);
        commit("updateBlog", newBlog);

        return newBlog.id;
    }
};

export const mutations = {
    setBlogs: (state, blogs) => (state.blogs = blogs),
    newBlog: (state, blog)  => (state.blogs.push(blog)),
    removeBlog: (state, id)  =>  (state.blog = state.blogs.filter(blog => blog.id != id)),
    updateBlog: (state, newBlog) => {
        let index = state.blogs.findIndex(blog => blog.id == newBlog.id);
        if (index != -1) {
            state.blogs.splice(index, 1, newBlog);
        }
    },
};