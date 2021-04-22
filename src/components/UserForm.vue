<template>
  <form @submit.prevent="submitForm()">
    <div>
      <label for="username">Username:</label><br>
      <input v-model="username" type="text" id="username" pattern="^[a-zA-Z0-9]+$" required title="alphanumeric characters only"><br><br>
    </div>

    <div v-if="formType === 'register'">
      <label for="email">Email:</label><br>
      <input v-model="email" type="email" id="email" placeholder="example@mail.com" required><br><br>
    </div>

    <div>
      <label for="password">Password:</label><br>
      <input v-model="password" type="password" id="password" required><br><br><br>
    </div>

    <input class="btn btn-primary" type="submit" value="Submit">
  </form>
</template>

<script>
export default {
  name: 'UserForm',

  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },

  props: ['formType'],

  methods: {
    submitForm () {
      this.$emit('submitForm', { username: this.username, email: this.email, password: this.password })
    }
  }
}
</script>

<style>

</style>
