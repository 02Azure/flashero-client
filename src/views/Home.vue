<template>
  <div id="main-page" class="page">
    <h2>My Decks Collection</h2>
    <ul>
      <a href="#" data-bs-toggle="modal" data-bs-target="#deckformmodal"><li>Create a New Deck</li></a>
      <a href="#" data-bs-toggle="modal" data-bs-target="#importdeckmodal"><li>Import Deck</li></a>
    </ul>
    <table v-if="decks.length" id="collection-table">
      <tr>
        <th>Name</th>
        <th>Total Cards</th>
      </tr>
      <tr
        v-for="deck in decks"
        :key="deck.id"
      >
        <td><router-link class="link-dark" :to="{ name: 'DeckDetail', params: { id: deck.id }}">{{ deck.name }}</router-link></td>
        <td>{{ deck.Cards.length }}</td>
      </tr>
    </table>
    <h3 id="no-deck-msg" v-else>Looks like you don't have any deck for now... If you are a newcomer, try to read About page and/or press the Import Deck above then import Tutorial deck!</h3>
    <DeckForm @submitAction="createDeck" />
    <ImportForm />
  </div>
</template>

<script>
import DeckForm from '../components/DeckFormModal'
import ImportForm from '../components/ImportForm'

export default {
  name: 'Home',

  created () {
    this.$store.dispatch('getUserDecks')
  },

  computed: {
    decks () {
      return this.$store.state.decks
    }
  },

  components: { DeckForm, ImportForm },

  methods: {
    createDeck (name) {
      this.$store.dispatch('createDeck', { name })
    }
  }
}
</script>

<style scoped>
  h2 {
    font-size: 1.9em;
    font-weight: bolder;
  }

  #no-deck-msg {
    margin-top:1em !important;
    margin:auto;
    width: 75vw;
  }
</style>
