<template>
  <div id="app">
    <Navbar />
    <router-view/>
    <HFooter />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import HFooter from 'vue-hacktiv-footer'

export default {
  name: 'App',

  created () {
    if (localStorage.access_token) {
      this.$store.commit('setLoginStatus', { status: true })
      this.$store.commit('setLoggedUser', { username: localStorage.username, id: localStorage.userId, avatar: localStorage.avatar_url })
    }
  },

  components: { Navbar, HFooter }
}

</script>

<style>
@import "https://fonts.googleapis.com/css2?family=Neucha&display=swap";

/* TAG STYLING */
html {
  background-color: azure;
}

body {
  margin: 0;
  padding: 0;
  font-family: Neucha, "Comic Sans MS" !important;
}
#app {
  background-color: azure;
}
h1 {
  font-size: 2.4em;
  margin:0 15px;
  padding: 0;
  color: peachpuff;
}

button, input[type=submit] {
  cursor: pointer;
}

input, label, p, tr, td, th, button, select{
  font-size: 1.2em !important;
}

table {
  border: 2px solid black;
  margin: auto;
  width: 75%;
}

table, th, td {
  border-collapse: collapse;
}

th {
  background-color: gainsboro;
}

th, td {
  padding: 10px;
}

tr:nth-child(even) {
  background-color: lightcyan;
}

tr:nth-child(odd) {
  background-color: lightblue;
}

.page {
  margin: 70px auto;
  text-align: center;
  padding: 20px 10px;
  background-color: azure;
  min-height: 68vh
}

/* PAGE WITH FORM */
.form-page{
  background-color:lightblue;
  min-width: 400px;
  width: 45vw;
  border: solid black 2px;
}

#login-page form input, #register-page form input{
  height: 2em;
  width: 200px
}

/* PROFILE PAGE */
#profile-table {
  border: none;
}

#profile-table tr {
  background-color: transparent;
}

#profile-table tr td:nth-child(1){
  text-align: left;
}

#profile-table tr td:nth-child(2){
  text-align: right;
}

.standalone-button{
  margin: 15px 0;
  width: 66%;
  height: 2em;
}

/* DECK COLLECTION PAGE */
#main-page ul {
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

#main-page ul li{
  margin: 0 10px 15px 10px;
  font-size: 1.2em;
}

/* EDIT DECK PAGE */
h2:hover i{
  visibility: visible;
}

#deck-page ul {
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

#deck-page ul li{
  margin: 0 10px;
  font-size: 1.2em;
}
.delete-option {
  color: red;
  font-weight: bolder;
  text-decoration: underline;
}

.detail-deck {
  width: 50%;
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.detail-deck h3{
  margin: 25px 0;
}

/* ADD / EDIT CARD PAGE */
.button-pair{
  width: 24%;
  height: 2em;
  margin: 0.3em;
}

/* DECK CARD LIST PAGE */
#deck-cardlist-page button {
  padding: 3px 25px;
}

#card-search {
  height: 1.5em;
  width: 66%;
}

#deck-table .card-row{
  cursor: pointer;
  border-top:solid transparent 2px;
  border-bottom:solid transparent 2px;
}

.card-row:last-child {
  border-bottom:solid black 2px !important;
}

.card-row:hover {
  border-top: double blue 2px !important;
  border-bottom: double blue 2px !important;
  border-right: solid blue 2px;
  border-left: solid blue 2px;
}
</style>
