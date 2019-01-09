<template>
  <div class="container">
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          v-model="userForm.email"
          name="email"
          class="input"
          type="email"
          placeholder="Email input">
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control ">
        <input
          v-model="userForm.password"
          autocomplete="current-password"
          name="password"
          class="input"
          type="password"
          placeholder="Enter password">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox">
          Remember me
        </label>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button
          type="submit"
          class="button is-link"
          @click.prevent="addUser()">login
        </button>
      </div>
    </div>

    <div class="field"
         v-show="hasError"
    >
      <article class="message is-danger">
        <div class="message-header">
          {{ errorMsg }}
        </div>
      </article>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Login',
    head: {
      title: 'Login page',
      meta: [{
        content: 'User login page'
      }
      ]
    },
    middleware: 'onlyGuest',
    data() {
      return {
        userForm: {
          email: '',
          password: '',
        },
        hasError: false,
        errorMsg: 'Email or password is incorrect'
      }
    },
    methods: {
      async addUser() {
        console.log(this.userForm.email + this.userForm.password);
        try {
          await this.$auth.login({
            data: this.userForm
          });
        } catch (e) {
          this.hasError = true
        }
        this.$axios.defaults.headers.common['Authorization'] = this.$auth.getToken('local');
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
</style>
