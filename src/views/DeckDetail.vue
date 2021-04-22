<template>
  <div id="deck-page" class="page form-page">

    <h2>{{ deck.name }}</h2>
    <hr>
    <ul>
      <a href="#" data-bs-toggle="modal" data-bs-target="#deckformmodal"><li>Edit Name</li></a>
      <router-link :to="{ name: 'DeckCardlist', params: { id: deck.id } }"><li>Browse</li></router-link>
      <a @click="exportDeck" href="#"><li>Export</li></a>
      <a @click.prevent="deleteDeck" class="link-danger delete-option" href=""><li>Delete</li></a>
    </ul>
    <div class="detail-deck">
      <h3>Total Cards</h3>
      <h3>{{ cardsTotal }}</h3>
    </div>
    <div class="detail-deck">
      <h3>Cards to Clear</h3>
      <h3>{{ cardsToClear }}</h3>
    </div>
    <br>
    <button @click.prevent="study()" :disabled="cardsToClear === 0" class = "button-pair btn btn-primary">Start!</button>
    <router-link :to="{ name: 'Home' }"><button class="button-pair btn btn-danger">Cancel</button></router-link>

    <DeckForm
      @submitAction="editDeckName"
    />
  </div>
</template>

<script>
import DeckForm from '../components/DeckFormModal'

export default {
  name: 'DeckDetail',

  created () {
    this.$store.dispatch('getDeck', { DeckId: this.$route.params.id })
  },

  components: { DeckForm },

  methods: {
    study () {
      this.$router.push({ name: 'StudyDeck', params: { id: this.$route.params.id } })
    },

    deleteDeck () {
      this.$store.dispatch('deleteDeck')
    },

    editDeckName (newName) {
      this.$store.dispatch('editDeckName', { name: newName })
    },

    exportDeck () {
      this.$store.dispatch('exportDeck', { deckId: this.$route.params.id })
    }
  },

  computed: {
    deck () {
      return this.$store.state.deck
    },

    cardsTotal () {
      return this.$store.state.cards.length
    },

    cardsToClear () {
      return this.$store.state.dueCards.length
    }
  }
}
</script>

<style scoped>
  h2 {
    font-size: 1.9em;
    font-weight: bolder;
  }

  h3 {
    font-size: 1.5em;
  }

  h3:nth-child(odd) {
    font-weight: bold;
  }

  ul {
    margin-bottom: 1em !important;
  }
</style>
