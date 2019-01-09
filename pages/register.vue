<template>
  <div class="container">
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input
          v-model="userForm.name"
          v-validate="'required'"
          name="name"
          :class="{'input': true , 'is-danger': errors.has('name')}"
          type="text"
          placeholder="Enter username">
        <p v-if="errors.has('name')"
           class="help is-danger"
        >{{ errors.first('name') }}</p>
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          v-model="userForm.email"
          v-validate="'required|email'"
          name="email"
          :class="{'input' : true , 'is-danger': errors.has('email')}"
          type="email"
          placeholder="Email input">
        <p class="help is-danger">{{ errors.first('email') }}</p>
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control ">
        <input
          v-model="userForm.password"
          v-validate="{required: true, min: 8}"
          ref="password"
          autocomplete="current-password"
          name="password"
          :class="{'input' : true , 'is-danger': errors.has('password')}"
          type="password"
          placeholder="Enter password">
        <p class="help is-danger">{{ errors.first('password') }}</p>
      </div>
    </div>
    <div class="field">
      <label class="label">Confirm Password</label>
      <div class="control ">
        <input
          v-model="confirm_password"
          v-validate="'required|confirmed:password'"
          autocomplete="current-password"
          name="confirm_password"
          :class="{'input' : true , 'is-danger': errors.has('confirm_password')}"
          type="password"
          placeholder="Enter password again">
        <p class="help is-danger">{{ errors.first('confirm_password') }}</p>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button
          type="submit"
          class="button is-link"
          @click.prevent="register()">Register
        </button>
      </div>
    </div>

    <div class="field"
         v-show="hasError"
    >
      <article class="message is-danger">
        <div
          v-for="error in errorMsg"
          :key="errorMsg.indexOf(error)"
          class="message-header">
          {{ error }}
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  export default {
    name: "register",
    middleware: 'onlyGuest',
    data() {
      return {
        userForm: {
          name: '',
          email: '',
          password: ''
        },
        confirm_password: '',
        hasError: false,
        errorMsg: []
      }
    },
    methods: {
      async register() {
        let result = await this.$validator.validate();
        if (result && this.userForm.password === this.confirm_password) {
          try {
            await this.$axios.post('register', this.userForm);
            await this.$auth.loginWith('local', {data: this.userForm});
            this.$router.go(-1);
          } catch (response) {
            if ('errors' in response) {
              let errors = response.data.errors;
              for (let key in  errors) {
                this.hasError = true;
                if (errors.hasOwnProperty(key)) {
                  this.errorMsg.push(errors[key][0]);
                }
                console.log(this.errorMsg);
              }
            }
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
