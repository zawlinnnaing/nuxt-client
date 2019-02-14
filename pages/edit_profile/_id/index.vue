<template>
  <div class="container column is-8">
    <form class="form" enctype="multipart/form-data">
      <div class="field">
        <div class="control">
          <label>Name</label>
          <input :class="{'input': true , 'is-danger': errors.has('user')}" type="text"
                 v-validate="'required|max:255'"
                 v-model="name"
                 name="user"
                 required
          >
          <p class="help is-danger">{{ errors.first('user') }}</p>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label>Email</label>
          <input type="text"
                 name="email"
                 v-model="email"
                 :class="{'input': true , 'is-danger': errors.has('email') }"
                 v-validate="'required|email'"
                 disabled>
          <p class="help is-danger">{{ errors.first('email') }}</p>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <div class="columns">
            <div class="column">
              <div v-if="imageUploaded">
                <img class="image is-1by1 no-padding-top" :src="image">
                <p class="help is-danger">{{ errorMsg }}</p>
              </div>
              <div v-else-if="img_dir">
                <img class="image is-1by1 no-padding-top" :src="url + img_dir">
              </div>
              <div v-else-if="!img_dir">
                <img class="image is-1by1 no-padding-top" :src="url + 'default_profile.png'">
              </div>

            </div>
            <div class="column">
              <div class="file-margin-top is-hidden-mobile"></div>
              <div class="file">
                <label class="file-label">
                  <input class="file-input" type="file" name="image" accept="image/*"
                         @change="importFile($event)">
                  <span class=" file-cta">
              <span class="file-icon">
              <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
              Choose a file…
              </span>
              </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="field ">
        <div class="control">
          <input type="submit"
                 value="Update"
                 @click.prevent="updateProfile()"
                 class="button is-info update-button">
        </div>
      </div>
    </form>

    <div class="field deactivate-field">
      <div class="control">
        <label for="password">Deactivate account</label>
        <small class="help is-warning">Enter password to deactivate account</small>
        <input type="password"
               name="password"
               id="password"
               placeholder="Password"
               :class="{'input' : true}">
        <button @click.prevent=""
                class="button is-danger button-margin">Deactivate account
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    components: {},
    head: {
      title: 'Edit your profile',
      meta: [
        {hid: 'profile-update-description', name: 'description', content: 'Edit your profile'}
      ]
    },
    middleware: ['auth', 'isOwner', 'activeUser'],
    asyncData({store}) {
      return {
        name: store.state.auth.user.name,
        email: store.state.auth.user.email,
        img_dir: store.state.auth.user.img_dir,
      };
    },
    data() {
      return {
        file: '',
        imageUploaded: false,
        image: '',
        maximumImageSize: 1000000,
        errorMsg: '',
        url: process.env.profileUrl
      }
    },
    mounted() {
    },
    methods: {
      async updateProfile() {
        let data = {
          name: this.name,
          email: this.email,
          token: this.$auth.getToken(this.$auth.strategy.name),
          id: this.user.id
        };
        if (this.imageUploaded === true) {
          data.image = this.image;
          if (this.file.size > this.maximumImageSize) {
            alert('Your file size is bigger than 1 mb');
            return;
          }
          await this.$store.dispatch('user/updateProfile', data);
          this.$router.push({name: 'profile'});
        }
      },
      importFile(e) {
        this.errorMsg = '';
        let self = this;
        this.file = e.target.files[0];
        if (this.file.size > this.maximumImageSize) {
          this.errorMsg = 'Your file size is bigger than 1 mb'
        }
        let reader = new FileReader();
        reader.onload = function () {
          self.image = reader.result
        };
        reader.readAsDataURL(this.file);
        this.imageUploaded = true;
      }
    }
  }
</script>

<style scoped>
  div.file-margin-top {
    margin-top: 23rem;
  }

  button.button-margin {
    margin: 1rem 0;
  }

  div.deactivate-field {
    margin: 2rem 0;
    padding: 1rem;
    background-color: #EEEEEE;
  }

  .update-button {
    margin-top: 1rem;
  }

  img.no-padding-top {
    padding-top: 2rem !important;
  }
</style>
