<template>
  <div id="register-page" class="page form-page">
    <h2>Register</h2>
      <UserForm
        @submitForm="register"
        :formType="'register'"
      />
    <br>
    <p>Already have an account? <router-link :to="{ name: 'Login'}">Login with your account now!</router-link></p>
  </div>
</template>

<script>
import UserForm from '../components/UserForm'
import { mapActions } from 'vuex'

export default {
  name: 'Register',

  components: { UserForm },

  methods: {
    ...mapActions([
      'register'
    ])
  }
}
</script>

<style scoped>
  h2 {
    font-size: 1.9em;
    font-weight: bolder;
  }
</style>
