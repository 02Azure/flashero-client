<template>
  <div id="profile-page" class="page form-page">
    <div id="avatar-container">
      <img id="user-avatar" :src="profile.avatarImageUrl" alt="user_avatar">
      <i data-bs-toggle="modal" data-bs-target="#profilemodal" id="edit-image-button" class="fa fa-edit"></i>
    </div>

    <h2>{{ profile.username }} Profile</h2>
    <hr>

    <table id="profile-table">
      <tr>
        <td>Level:</td>
        <td>{{ profile.level }}</td>
      </tr>
      <tr>
        <td>EXP:</td>
        <td>{{ profile.exp }}</td>
      </tr>
      <tr>
        <td>Next Level:</td>
        <td>{{ profile.nextLevel }}</td>
      </tr>
      <tr>
        <td>Cards Cleared:</td>
        <td>{{ profile.cardsCleared }}</td>
      </tr>
      <!-- <tr>
        <td>Description:</td>
        <td>{{ profile.desc }}</td>
      </tr> -->
    </table>
    <router-link :to="{ name: 'Home' }"><button class ="standalone-button btn btn-success">Return to My Collection</button></router-link>
    <div class="modal fade" id="profilemodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Change Avatar Image</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Enter an image URL:</p>
            <input v-model="url" type="url" required>
            <br><br>
            <span>Don't know what image to change into? Try randomize!</span>
          </div>
          <div class="modal-footer">
            <button @click="editUserAvatar(false)" type="button" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
            <button @click="editUserAvatar(true)" type="button" class="btn btn-success" data-bs-dismiss="modal">Randomize!</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',

  data () {
    return {
      url: ''
    }
  },

  computed: {
    profile () {
      return this.$store.state.profile
    }
  },

  created () {
    this.$store.dispatch('getUserProfile', { id: this.$route.params.id })
  },

  methods: {
    editUserAvatar (isRandom) {
      this.$store.dispatch('editUserAvatar', { url: this.url, random: isRandom })
    }
  }
}
</script>

<style scoped>
  #avatar-container {
    margin:auto;
    width: 110px;
    position: relative;
  }

  #user-avatar {
    height: 110px;
    width: 110px;
    object-fit: cover;
  }

  #edit-image-button {
    position:absolute;
    top: 0;
    right: 0;
    font-size:1.3em;
    visibility: hidden;
  }

  #avatar-container:hover #edit-image-button {
    visibility:visible;
    cursor: pointer;
  }

  h2 {
    font-size: 1.9em;
    font-weight: bolder;
  }

  h5 {
    font-weight: bolder;
  }

  td:nth-child(odd) {
    font-weight: bold;
  }
</style>
