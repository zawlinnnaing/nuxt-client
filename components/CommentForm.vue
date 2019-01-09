<template>
  <div class="comment-form">
    <div class="field">
      <div class="control">
        <label>
          <textarea rows="5" placeholder="Enter your comment"
                    :class="{'textarea': true, 'is-danger': errors.has('comment')}"
                    name="comment"
                    v-model="comment"
                    v-validate="'required'"
          ></textarea>
        </label>
        <p class="help is-danger">{{ errors.first('comment') }}</p>
        <p class="help is-success" v-if="isSuccess">Comment posted successfully </p>
      </div>
    </div>
    <div class="comment-button">
      <a class="button is-link" @click.prevent="postComment">Post a comment</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CommentForm",
    props: ['userId'],
    data() {
      return {
        comment: '',
        isSuccess: false
      }
    },
    methods: {
      async postComment() {
        let payload = {
          user_id: this.userId,
          description: this.comment,
          post_id: this.$route.params.id,
          token: this.$auth.getToken('local')
        };
        await this.$store.dispatch('comments/postComment', payload);
        this.isSuccess = true;
        setTimeout(this.$router.go(), 2000);
      }
    }
  }
</script>

<style scoped>
  .comment-button {
    text-align: right;
  }

  div.comment-form {
    margin: 1rem;
  }

</style>
