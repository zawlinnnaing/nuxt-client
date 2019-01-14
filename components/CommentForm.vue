<template>
  <div class="comment-form">
    <div class="field">
      <div class="control">
        <div
          :class="{'quill-editor': true, 'div-editor': true ,'has-error': hasError}"
          name="comment"
          v-model="comment"
          v-quill:myQuillEditor="editorOption"
        ></div>

        <!------------------------------------- Helping section  ------------------------------------->
        <p class="help is-danger">{{ errorMsg }}</p>
        <p class="help is-success" v-if="isSuccess">Comment posted successfully </p>
      </div>
    </div>
    <div class="comment-button">
      <a class="button is-link" @click.prevent="postComment">Post a comment</a>
    </div>
  </div>
</template>

<script>
  import Validator from 'validatorjs'

  export default {
    name: "CommentForm",
    props: ['userId'],
    data() {
      return {
        comment: '',
        isSuccess: false,
        hasError: false,
        errorMsg: '',
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block', 'link']
            ]
          }
        }
      }
    },

    methods: {
      async postComment() {
        if (this.validateString()) {
          let payload = {
            user_id: this.userId,
            description: this.comment,
            post_id: this.$route.params.id,
            token: this.$auth.getToken('local')
          };

          await this.$store.dispatch('comments/postComment', payload);
          this.isSuccess = true;
          setTimeout(this.$router.go(), 1000);
        }
      },

      validateString() {
        let rules = {
          comment: 'required'
        };
        let validation = new Validator({comment: this.comment}, rules);
        if (validation.fails()) {
          this.hasError = true;
          this.errorMsg = validation.errors.first('comment');
          return false;
        } else if (validation.passes()) {
          this.hasError = false;
          this.errorMsg = '';
          return true;
        }
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

  .div-editor {
    height: 10rem;
  }

  .has-error {
    border: 1px solid #ff3860;
  }
</style>
