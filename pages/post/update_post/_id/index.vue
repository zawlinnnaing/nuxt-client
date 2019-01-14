<template>
  <div class="container column is-8">
    <form>

      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <label>
            <textarea :class="{'textarea': true , 'input': true, 'is-danger': errors.has('title')}"
                      v-validate="'required|max:500'"
                      v-model="title"
                      name="title"
            ></textarea>
          </label>
          <p class="help is-danger">{{ errors.first('title') }}</p>
        </div>
      </div>

      <div class="field">
        <label class="label">Body</label>
        <div class="control">
          <div :class="{'quill-editor': true, 'div-editor': true}"
               v-model="body"
               v-quill:myQuillEditor="editorOption"
          >
          </div>
          <p class="help is-danger" v-if="hasError">{{ errorMsg }}</p>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input type="submit" class="button is-info" @click.prevent="updatePost()">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Validator from 'validatorjs';

  export default {
    name: "index",
    head: {
      title: 'Update post',
      meta: [
        {content: 'update your post'}
      ]
    },
    middleware: ['auth', 'activeUser'],
    data() {
      return {
        editorOption: {},
        hasError: true,
        errorMsg: '',
        title: '',
        body: ''
      }
    },

    computed: {
      post() {
        return this.$store.state.posts.post;
      },
    },
    async asyncData({store, app, params}) {
      let payload = {
        post_id: params.id,
        token: app.$auth.getToken('local')
      };
      await store.dispatch('posts/fetchPost', payload);
      return {
        title: store.state.posts.post.title,
        body: store.state.posts.post.body
      }
    },
    methods: {
      updatePost() {
        let self = this;
        let post_id = this.$route.params.id;
        this.$validator.validateAll()
          .then((result) => {
            if (result && self.validateString()) {
              let payload = {
                title: self.title,
                body: self.body,
                token: self.$auth.getToken('local'),
                user_id: self.post.user_id,
                post_id: post_id
              };
              self.$store.dispatch('posts/updatePost', payload)
                .then(() => {
                  self.$router.push({name: 'post-id', params: {id: post_id}});
                });
            }
          })
      },
      validateString() {
        let rules = {
          body: 'required|min:25'
        };
        let validation = new Validator({body: this.body}, rules);
        if (validation.fails()) {
          this.hasError = true;
          this.errorMsg = validation.errors.first('body');
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
  div.div-editor {
    height: 15rem;
  }
</style>
