<template>
<header>
  <div>
    <h1 @click="toHome()">Flashero</h1>
  </div>

  <nav>
    <ul>
      <!-- <router-link :to="{ name: 'Home'}"><li>About</li></router-link> -->
      <router-link v-if="loginStatus" :to="{ name: 'User', params: { id: loggedUser.id }}">
        <li>
          <img id="avatar" :src="loggedUser.avatar" alt="user's avatar">
          {{ loggedUser.username }}
        </li>
      </router-link>
      <router-link v-if="loginStatus" :to="{ name: 'CardAdd'}"><li>Add</li></router-link>
      <li v-if="loginStatus" @click="logout">Logout</li>
    </ul>
  </nav>
</header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Navbar',

  computed: {
    loginStatus () {
      return this.$store.state.isLoggedIn
    },

    loggedUser () {
      return this.$store.state.loggedUser
    }
  },

  methods: {
    ...mapActions([
      'logout'
    ]),

    toHome () {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style scoped>
  h1:hover {
    cursor: pointer
  }

  li:hover {
    cursor: pointer;
  }

  header {
    background-color:steelblue;
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
  }

  nav ul {
    font-size: 1.3em;
    display: flex;
    align-items: center;
    margin:auto;
    list-style: none;
  }

  nav ul a {
    text-decoration: none;
  }

  nav ul li {
    color:palegreen;
    margin-right: 15px;
    transition: all 0.4s;
  }

  nav ul li:hover {
    color:yellow;
    transform: scale(1.15);
  }

  #avatar{
    height: 30px;
    width: 30px;
    object-fit: cover;
  }
</style>
