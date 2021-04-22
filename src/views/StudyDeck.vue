<template>
  <div id="study-deck-page" class="page form-page">
    <span id="card-remaining">{{ dueCards.length }} card(s) remaining</span>
    <i @click="returnToDetail" class="fa fa-arrow-left fa-2x"></i>
    <div id="card-problem">
      <span v-if="card" id="card-front">{{ card.front }}</span>
      <hr>
      <span id="card-back" v-if="isAnswered">{{ card.back }}</span>
    </div>

    <div id="no-card-left-msg" v-if="!card">
      <span>You are done with this deck for today!</span>
    </div>

    <div id="show-after-answer">
      <button @click="showAnswer" v-if="!isAnswered && card && card.front" class="standalone-button btn btn-primary">Show Answer</button> <br>
      <button v-if="isAnswered" @click="updateMastery(0, 'again')" class="button-trio btn btn-danger">Again</button>
      <button v-if="isAnswered" @click="updateMastery(card.mastery, 'hard')" class="button-trio btn btn-warning">Hard</button>
      <button v-if="isAnswered" @click="updateMastery(card.mastery + 1, 'good')" class="button-trio btn btn-success">Good</button>
    </div>
  </div>
</template>

<script>
import Swal from '../API/sweetalert'

export default {
  name: 'StudyDeck',

  created () {
    this.$store.commit('setAnswered', { isAnswered: false })
    this.$store.dispatch('getDeck', { DeckId: this.$route.params.id })
    this.$store.dispatch('getUserProfile', { id: this.loggedUser.id })
  },

  computed: {
    isAnswered () {
      return this.$store.state.isAnswered
    },

    deck () {
      return this.$store.state.deck
    },

    dueCards () {
      return this.$store.state.dueCards
    },

    card () {
      return this.$store.state.card
    },

    loggedUser () {
      return this.$store.state.loggedUser
    }
  },

  methods: {
    showAnswer () {
      this.$store.commit('setAnswered', { isAnswered: true })
    },

    returnToDetail () {
      this.$router.push({ name: 'DeckDetail', params: { id: this.deck.id } })
    },

    updateMastery (newMastery, answer) {
      this.$store.dispatch('updateCardMastery', { cardId: this.card.id, newMastery, answer })
        .then(() => {
          this.$store.commit('setAnswered', { isAnswered: false })

          if (answer === 'again') {
            this.$store.commit('sendCardToBack')
          } else {
            this.$store.commit('removeClearedCard')
            if (!this.dueCards.length) {
              Swal.fire({
                title: 'Congrats, you just finished this deck for now!',
                imageUrl: 'https://i.imgur.com/xRqaHSZ.png',
                imageHeight: 180,
                showConfirmButton: true,
                showCloseButton: false,
                toast: false,
                position: 'center',
                timer: undefined
              })
            }
          }
        })
    }
  }
}
</script>

<style scoped>
#study-deck-page {
  position:relative
}

#no-card-left-msg {
  font-size: 1.8em;
  font-weight: bold
}

#card-remaining {
  text-align: right;
  position:absolute;
  right: 2%;
  top: 1%;
  color: red;
  font-weight: bold
}

#study-deck-page {
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70vh
}

#card-front{
  font-size: 2.3em;
}

#card-back {
  font-size: 1.5em;
}

#show-after-answer button {
  height: 2em;
  margin: 10px 15px;
}

.fa-arrow-left {
  cursor: pointer;
  position: absolute;
  text-align: left;
}

.button-trio {
  width: 25%;
}
</style>
