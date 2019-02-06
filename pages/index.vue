<template>
  <div class="container column is-6 is-12-mobile">
    <post v-for="post in posts"
          :key="post.id"
          :post="post"
    ></post>
    <paginator v-if="totalPage > 1"
               :isAllPosts=true></paginator>
  </div>
</template>

<script>

  import Post from "../components/post";
  import Paginator from "../layouts/partials/paginator";

  export default {
    name: 'Index',
    head: {
      title: 'Home',
      meta: [{
        content: 'Simple nuxt application by Zaw Linn Naing'
      }]
    },
    components: {Paginator, Post},
    computed: {
      posts() {
        return this.$store.state.posts.posts;
      },
      totalPage() {
        return this.$store.state.pagination.totalPage;
      }
    },
    fetch({store, app}) {
      let url = 'posts';
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

