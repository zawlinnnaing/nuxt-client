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
          <div :class="{'quill-editor': true, 'div-editor': true , 'has-error': hasError}"
               ref="newEditor"
               v-model="body"
               v-quill:myQuillEditor="editorOption">
          </div>
          <p class="help is-danger" v-if="hasError">{{ errorMsg }}</p>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input type="submit" class="button is-info" @click.prevent="createPost()">
        </div>
      </div>
    </form>
    <form @submit.prevent
          method="post" id="uploadFormMulti">
      <input style="display: none" :id="inputId" type="file" name="avator" multiple
             accept="image/*" @change="uploadImg($event)">
    </form>
    {{ body }}
  </div>
</template>

<script>
  import Validator from 'validatorjs';
  import Quill from 'quill';

  export default {
    name: "create_post",
    head: {
      title: 'Write a post'
    },
    ssr: false,
    middleware: ['auth', 'activeUser'],

    mounted() {
      let vm = this;
      let imageHandler = async function (image) {
        vm.addImgRange = vm.$refs.newEditor.__quill.getSelection();
        if (image) {
          let fileInput = document.getElementById(vm.inputId); //隐藏的file文本ID
          fileInput.click() //加一个触发事件
        }
      };
      this.$refs.newEditor.__quill.getModule('toolbar').addHandler('image', imageHandler);
    },

    data() {
      return {
        body: '',
        title: '',
        editorOption: {
          // imageHandler: this.imageHandler
        },
        hasError: false,
        errorMsg: '',
        inputId: 'file-input',
        image: ''
      }
    },

    computed: {
      user_id() {
        return this.user.id
      }
    },

    methods: {
      createPost() {
        this.$validator.validateAll()
          .then((result) => {
            if (result && this.validateString()) {
              let payload = {
                title: this.title,
                body: this.body,
                token: this.$auth.getToken('local'),
                user_id: this.user_id
              };
              this.$store.dispatch('posts/createPost', payload)
                .then(() => {
                  this.$router.push({name: 'index'});
                });
            }
          })
      },
      validateString() {
        console.log('hello fr');
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
      },
      async uploadImg(event) {
        let vm = this;
        let data = {};
        data.token = vm.$auth.getToken('local');
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = async function () {
          vm.image = reader.result;
          data.image = vm.image;
          try {
            let imgUrl = await vm.$store.dispatch('posts/uploadPostImage', data);
            if (imgUrl != null && imgUrl.length > 0) {
              let value = imgUrl;
              vm.addImgRange = vm.$refs.newEditor.__quill.getSelection();
              value = value.indexOf('http') !== -1 ? value : 'http:' + value;
              vm.$refs.newEditor.__quill.insertEmbed(vm.addImgRange != null ? vm.addImgRange.index : 0, 'image', value, Quill.sources.USER)
            }
          } catch (e) {
            alert(e.getMessage());
          }
          document.getElementById(vm.inputId).value = '';
        };
        reader.readAsDataURL(file);
      }
    }
  }
</script>

<style scoped>
  div.div-editor {
    height: 15rem;
  }

  .has-error {
    border: 1px solid #ff3860;
  }
</style>
