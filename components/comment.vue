<template>
  <article class="media comment">
    <div class="media-content">
      <div class="content">
        <div class="author-info">
          <strong>{{comment.commented_by}}</strong>
          <small> {{ '<' + comment.user_email + '>' }}</small>
        </div>
        <br>
        <p>
          {{ comment.description }}
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-reply"></i></span>
          </a>
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-retweet"></i></span>
          </a>
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-heart"></i></span>
          </a>
          <small class="moment-ago"> {{ momentAgo }}</small>
        </div>
      </nav>
    </div>
  </article>
</template>

<script>
  export default {
    name: "comment",
    props: ['comment'],
    data() {
      return {
        momentAgo: this.$momentAgo(this.comment.created_at)
      }
    },
    created() {
    },
  }
</script>

<style scoped>
  .moment-ago {

  }

</style>
