<template>
  <div class="card post">
    <div class="card-content">
      <h3 class="title">{{ post.title }}</h3>
      <div v-html="post.body"></div>
    </div>
  </div>
</template>

<script>
  import Comment from "./comment";

  export default {
    name: "post",
    components: {Comment},
    props: ['post'],
  }
</script>

<style scoped>
  .post {
    margin: 2rem 0;
  }

  .comment-section {
    padding: 0rem 2rem;
  }

  p.comment-title {
    color: #9E9E9E;
    text-align: center;
    padding: 0.4rem 0;
  }
</style>
