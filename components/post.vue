<template>
  <div class="card post">
    <div class="card-content">
      <h3 class="title">{{ post.title }}</h3>
      <div v-html="post.body" class="post-body"></div>
      <div class="post-link">
        <nuxt-link :to="{name:'post-id',params: {id: post.id }}">Go to post</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "post",
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

  /* styles for '...' */
  .post-body {
    /* hide text if it more than N lines  */
    overflow: hidden;
    /* for set '...' in absolute position */
    position: relative;
    /* use this value to count block height */
    line-height: 1.2em;
    /* max-height = line-height (1.2) * lines max number (3) */
    max-height: 3.6em;
    /* fix problem when last visible word doesn't adjoin right side  */
    text-align: justify;
    /* place for '...' */
    margin-right: -1em;
    padding-right: 1em;
  }

  /* create the ... */
  .post-body:before {
    /* points in the end */
    content: '...';
    /* absolute position */
    position: absolute;
    /* set position to right bottom corner of block */
    right: 0;
    bottom: 0;
  }

  /* hide ... if we have text, which is less than or equal to max lines */
  .post-body:after {
    /* points in the end */
    content: '';
    /* absolute position */
    position: absolute;
    /* set position to right bottom corner of text */
    right: 0;
    /* set width and height */
    width: 1em;
    height: 1em;
    margin-top: 0.2em;
    /* bg color = bg color under block */
    background: white;
  }

  .post-link {
    margin-top: 1rem;
    text-align: right;
  }
</style>
