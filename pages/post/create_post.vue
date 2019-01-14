<template xmlns:v-quill="http://www.w3.org/1999/xhtml">
  <div class="container column is-8">
    <form>
      <div class="field view">
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
        <div class="field view">
          <label class="label">Body</label>
          <div class="control">
            <div :class="{'quill-editor': true, 'div-editor': true}"
                 v-model="body"
                 v-validate="'required'"
                 v-quill:myQuillEditor="editorOption"
            >
            </div>
            <p class="help is-danger" v-if="hasError">{{ errorMsg }}</p>
          </div>
        </div>
        <div class="field view">
          <div class="control">
            <input type="submit" class="button is-info" @click.prevent="createPost()">
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Validator from 'validatorjs';

  export default {
    name: "create_post",
    head: {
      title: 'Write a post'
    },
    middleware: 'auth',
    data() {
      return {
        body: '',
        title: '',
        editorOption: {
        },
        hasError: true,
        errorMsg: ''
      }
    },

    computed: {
      user_id() {
        return this.user.id
      }
    },

    methods: {
      createPost() {
        let self = this;

        this.$validator.validateAll()
          .then((result) => {
            if (result && self.validateString()) {
              let payload = {
                title: self.title,
                body: self.body,
                token: self.$auth.getToken('local'),
                user_id: self.user_id
              };
              self.$store.dispatch('posts/createPost', payload)
                .then(() => {
                  self.$router.push({name: 'index'});
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
