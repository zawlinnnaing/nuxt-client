<template>
  <div class="container column is-6">
    <post v-for="post in posts"
          :key="post.id"
          :post="post"
    ></post>
    <paginator v-if="totalPage > 1"
               :isAllPosts=false
    ></paginator>
  </div>
</template>

<script>

  import Post from "../components/post";
  import Paginator from "../layouts/partials/paginator";

  export default {
    head: {
      title: 'Your Posts',
      meta: [{
        content: 'All your posts are here'
      }]
    },
    components: {Paginator, Post},
    middleware: ['auth', 'activeUser'],
    computed: {
      posts() {
        return this.$store.state.posts.posts;
      },
      totalPage() {
        return this.$store.state.pagination.totalPage;
      }
    },
    fetch({store, app}) {
      let url = store.state.auth.user.id + '/post';
      return app.$axios({
        method: 'get',
        url: url,
      }).then(({data}) => {
        store.dispatch('pagination/setPageInfoAndPosts', data);
      });
    }
  }
</script>

<style>
</style>

