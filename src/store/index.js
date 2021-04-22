import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../API/axios'
import Swal from '../API/sweetalert'
import router from '../router/index'
// import basicSwal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    profile: {},
    loggedUser: {
      username: '',
      id: 0,
      avatar: ''
    },
    card: {},
    cards: [],
    filteredCards: [],
    decks: [],
    deck: {},
    dueCards: [],
    returningDeckId: 0,
    isAnswered: false
  },
  mutations: {
    setLoginStatus (state, payload) {
      state.isLoggedIn = payload.status
    },

    setProfile (state, payload) {
      state.profile = payload.profile
    },

    setLoggedUser (state, payload) {
      state.loggedUser = {
        username: payload.username,
        id: payload.id,
        avatar: payload.avatar
      }
    },

    setLoggedUserAvatar (state, payload) {
      state.loggedUser.avatar = payload.avatar
    },

    setDecks (state, payload) {
      state.decks = payload.decks
    },

    setDeck (state, payload) {
      state.deck = {
        id: payload.deck.id,
        name: payload.deck.name,
        UserId: payload.deck.UserId
      }
      state.cards = payload.deck.Cards
      state.filteredCards = payload.deck.Cards
    },

    setFilteredCards (state, payload) {
      state.filteredCards = payload.filteredCards
    },

    setDueCards (state, payload) {
      state.dueCards = payload.dueCards
      state.card = payload.dueCards[0]
    },

    sendCardToBack (state, payload) {
      state.dueCards.push(state.dueCards[0])
      state.dueCards.shift()
      state.card = state.dueCards[0]
    },

    removeClearedCard (state, payload) {
      state.dueCards.shift()
      state.card = state.dueCards[0]
    },

    setCard (state, payload) {
      state.card = payload.card
      state.returningDeckId = payload.card.DeckId
    },

    setAnswered (state, payload) {
      state.isAnswered = payload.isAnswered
    }
  },
  actions: {
    login (context, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: {
          username: payload.username,
          password: payload.password
        }
      })
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('userId', response.data.id)
          localStorage.setItem('avatar_url', response.data.avatarImageUrl)

          context.commit('setLoginStatus', { status: true })
          context.commit('setLoggedUser', { username: response.data.username, id: response.data.id, avatar: response.data.avatarImageUrl })

          router.push({ name: 'Home' })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.error,
            background: 'mistyrose'
          })
        })
    },

    logout (context, payload) {
      localStorage.clear()
      context.commit('setLoginStatus', { status: false })
      router.push({ name: 'Login' })
    },

    register (context, payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: {
          username: payload.username,
          email: payload.email,
          password: payload.password
        }
      })
        .then(response => {
          Swal.fire({
            icon: 'info',
            title: 'Registration complete, please login!'
          })
          router.push({ name: 'Login' })
        })
        .catch(err => {
          let msg = err.response.data.error

          if (Array.isArray(err.response.data.error)) {
            msg = err.response.data.error.join('\n')
          }

          Swal.fire({
            icon: 'error',
            timer: 4000,
            title: msg,
            background: 'mistyrose'
          })
        })
    },

    getUserProfile (context, payload) {
      axios({
        method: 'GET',
        url: `/profile/${payload.id}`
      })
        .then(response => {
          context.commit('setProfile', { profile: response.data })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.error,
            background: 'mistyrose'
          })

          if (err.response.data.error.includes('not found')) router.push({ name: 'NotFound' })
        })
    },

    editUserAvatar (context, payload) {
      axios({
        method: 'PATCH',
        url: '/profile/avatar',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          random: payload.random,
          avatarImageUrl: payload.url
        }
      })
        .then(response => {
          localStorage.setItem('avatar_url', response.data)
          context.commit('setLoggedUserAvatar', { avatar: response.data })
          context.dispatch('getUserProfile', { id: router.currentRoute.params.id })
          Swal.fire({
            icon: 'success',
            title: 'Your change has been saved!'
          })
        })

        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.error,
            background: 'mistyrose'
          })
        })
    },

    getUserDecks (context, payload) {
      axios({
        method: 'GET',
        url: '/decks',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          context.commit('setDecks', { decks: response.data })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.error,
            background: 'mistyrose'
          })
        })
    },

    getDeck (context, payload) {
      const deckId = payload.DeckId

      axios({
        method: 'GET',
        url: `/decks/${deckId}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          let dueCards = [...response.data.Cards]
          const todayDate = new Date()
          const tomorrowDate = new Date(todayDate.setDate(todayDate.getDate() + 1)).toLocaleDateString('en-CA')

          dueCards = dueCards.filter(card => new Date(card.due) < new Date(tomorrowDate))

          context.commit('setDueCards', { dueCards })
          context.commit('setDeck', { deck: response.data })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.error,
            background: 'mistyrose'
          })

          if (err.response.data.error.includes('not found')) router.push({ name: 'NotFound' })
        })
    },

    createDeck (context, payload) {
      axios({
        method: 'POST',
        url: '/decks',
        data: {
          name: payload.name
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'The new deck has been successfully created'
          })

          context.dispatch('getUserDecks')
        })
        .catch(err => {
          let msg = err.response.data.error

          if (Array.isArray(err.response.data.error)) {
            msg = err.response.data.error.join('\n')
          }

          Swal.fire({
            icon: 'error',
            timer: 4000,
            title: msg,
            background: 'mistyrose'
          })
        })
    },

    editDeckName (context, payload) {
      const deckId = router.currentRoute.params.id
      axios({
        method: 'PATCH',
        url: `/decks/${deckId}`,
        data: {
          name: payload.name
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          context.dispatch('getDeck', { DeckId: deckId })
        })
        .catch(err => {
          let msg = err.response.data.error

          if (Array.isArray(err.response.data.error)) {
            msg = err.response.data.error.join('\n')
          }

          Swal.fire({
            icon: 'error',
            timer: 4000,
            title: msg,
            background: 'mistyrose'
          })
        })
    },

    deleteDeck (context, payload) {
      const deckId = router.currentRoute.params.id

      Swal.fire({
        toast: false,
        position: 'center',
        showConfirmButton: true,
        showCancelButton: true,
        showCloseButton: false,
        title: 'Are you sure?',
        text: 'This will permanently delete all the cards in this deck too!',
        confirmButtonText: 'Yes, delete it!',
        confirmButtonColor: 'firebrick',
        cancelButtonText: 'On second thought...',
        cancelButtonColor: 'forestgreen',
        imageUrl: 'https://i.imgur.com/nRpzjrC.png',
        imageHeight: 170,
        imageAlt: 'Pepe monkas',
        timer: undefined
      })
        .then((result) => {
          if (result.isConfirmed) {
            axios({
              method: 'DELETE',
              url: `/decks/${deckId}`,
              headers: {
                access_token: localStorage.access_token
              }
            })
              .then(response => {
                context.dispatch('getUserDecks')

                Swal.fire({
                  icon: 'success',
                  title: 'The deck has been successfully deleted'
                })

                router.push({ name: 'Home' })
              })
              .catch(err => {
                Swal.fire({
                  icon: 'error',
                  timer: 4000,
                  title: err.response.data.error,
                  background: 'mistyrose'
                })
              })
          }
        })
    },

    getCard (context, payload) {
      const cardId = router.currentRoute.params.id

      axios({
        method: 'GET',
        url: `/cards/${cardId}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          context.commit('setCard', { card: response.data })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: err.response.data.error,
            background: 'mistyrose'
          })
          if (err.response.data.error.includes('not found')) router.push({ name: 'NotFound' })
        })
    },

    addCard (context, payload) {
      axios({
        method: 'POST',
        url: '/cards',
        data: {
          front: payload.front,
          back: payload.back,
          DeckId: payload.DeckId
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: 'The new card has been successfully added'
          })
        })
        .catch(err => {
          let msg = err.response.data.error

          if (Array.isArray(err.response.data.error)) {
            msg = err.response.data.error.join('\n')
          }

          Swal.fire({
            icon: 'error',
            timer: 4000,
            title: msg,
            background: 'mistyrose'
          })
        })
    },

    editCard (context, payload) {
      const cardId = router.currentRoute.params.id
      axios({
        method: 'PUT',
        url: `/cards/${cardId}`,
        data: {
          front: payload.front,
          back: payload.back,
          DeckId: payload.DeckId
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          context.dispatch('getDeck', { DeckId: payload.DeckId })

          Swal.fire({
            icon: 'success',
            title: 'The card has been successfully updated'
          })

          router.push({ name: 'DeckCardlist', params: { id: payload.DeckId } })
        })
        .catch(err => {
          let msg = err.response.data.error

          if (Array.isArray(err.response.data.error)) {
            msg = err.response.data.error.join('\n')
          }

          Swal.fire({
            icon: 'error',
            timer: 4000,
            title: msg,
            background: 'mistyrose'
          })
          if (err.response.data.error.includes('not found')) router.push({ name: 'NotFound' })
        })
    },

    updateCardMastery (context, payload) {
      const cardId = payload.cardId

      axios({
        method: 'PUT',
        url: `/cards/${cardId}/mastery`,
        data: {
          answer: payload.answer,
          mastery: payload.newMastery
        },
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          if (response.data.level > context.state.profile.level) {
            const randomMsg = [
              "Being smart doesn't hurt. And a little luck now and then is nice. But the key is patience and hard work. And when it pays off, it's SWEET",
              "It isn't over yet. You can still get smarter, or cleverer, or more experienced, or meaner -- it's up to you from now on",
              "It's the most amazing thing. Yesterday it was hard, and today it is easy. Just a good night's sleep, and yesterday's mysteries are today's masteries.",
              "You realize that you are catching on to the secret of success. It's just a matter of concentration and persistence",
              "Don't trying and thinking too hard. Just be yourself. Do the little things, and the big things take care of themselves"
            ]

            Swal.fire({
              title: 'Aw yeaaa, you just leveled up!',
              text: randomMsg[Math.floor((Math.random() * 5))],
              imageUrl: 'https://i.imgur.com/nyZN5N8.png',
              showConfirmButton: true,
              showCloseButton: false,
              imageHeight: 180,
              toast: false,
              position: 'center',
              timer: undefined
            })

            context.dispatch('getUserProfile', { id: context.state.loggedUser.id })
          }
        })
        .catch(err => {
          let msg = err.response.data.error

          if (Array.isArray(err.response.data.error)) {
            msg = err.response.data.error.join('\n')
          }

          Swal.fire({
            icon: 'error',
            timer: 4000,
            title: msg,
            background: 'mistyrose'
          })
        })
    },

    deleteCard (context, payload) {
      const cardId = router.currentRoute.params.id

      Swal.fire({
        toast: false,
        position: 'center',
        showConfirmButton: true,
        showCancelButton: true,
        showCloseButton: false,
        title: 'Are you sure?',
        text: 'This will permanently delete the card!',
        confirmButtonText: 'Yes, delete it!',
        confirmButtonColor: 'firebrick',
        cancelButtonText: 'On second thought...',
        cancelButtonColor: 'forestgreen',
        imageUrl: 'https://i.imgur.com/nRpzjrC.png',
        imageHeight: 170,
        imageAlt: 'Pepe monkas',
        timer: undefined
      })
        .then((result) => {
          if (result.isConfirmed) {
            axios({
              method: 'DELETE',
              url: `/cards/${cardId}`,
              headers: {
                access_token: localStorage.access_token
              }
            })
              .then(response => {
                context.dispatch('getDeck', { DeckId: payload.DeckId })

                Swal.fire({
                  icon: 'success',
                  title: 'The card has been successfully deleted'
                })

                router.push({ name: 'DeckCardlist', params: { id: payload.DeckId } })
              })
              .catch(err => {
                Swal.fire({
                  icon: 'error',
                  timer: 4000,
                  title: err.response.data.error,
                  background: 'mistyrose'
                })
              })
          }
        })
    },

    importDeck (context, payload) {
      axios({
        method: 'POST',
        url: '/decks/import',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          key: payload.key
        }
      })
        .then(response => {
          Swal.fire({
            icon: 'success',
            title: response.data.success
          })

          context.dispatch('getUserDecks')
        })

        .catch(err => {
          let msg = err.response.data.error

          if (Array.isArray(err.response.data.error)) {
            msg = err.response.data.error.join('\n')
          }

          Swal.fire({
            icon: 'error',
            timer: 4000,
            title: msg,
            background: 'mistyrose'
          })
        })
    },

    exportDeck (context, payload) {
      const deckId = payload.deckId

      Swal.fire({
        toast: false,
        position: 'center',
        showConfirmButton: true,
        showCancelButton: true,
        showCloseButton: false,
        title: "This will export all of the deck's cards to pastebin. Only front and back data will be exported",
        confirmButtonText: 'Export it!',
        confirmButtonColor: 'forestgreen',
        cancelButtonText: 'Maybe no...',
        cancelButtonColor: 'firebrick',
        imageUrl: 'https://i.imgur.com/LbTnxFG.png',
        imageHeight: 170,
        imageAlt: 'Pepe thinking',
        timer: undefined
      })
        .then((result) => {
          if (result.isConfirmed) {
            axios({
              method: 'POST',
              url: `/decks/${deckId}`,
              headers: {
                access_token: localStorage.access_token
              }
            })
              .then(response => {
                Swal.fire({
                  toast: false,
                  position: 'center',
                  timer: undefined,
                  showCloseButton: false,
                  showConfirmButton: true,
                  confirmButtonColor: 'dodgerblue',
                  confirmButtonText: 'Close',
                  imageUrl: 'https://i.imgur.com/O8ArCw0.png',
                  imageHeight: 170,
                  imageAlt: 'Pepe okay',
                  title: 'Here is the link of your imported deck!',
                  html: `<a href="${response.data.link}" target="_blank">${response.data.link}</a>`
                })
              })

              .catch(err => {
                let msg = err.response.data.error

                if (Array.isArray(err.response.data.error)) {
                  msg = err.response.data.error.join('\n')
                }

                Swal.fire({
                  icon: 'error',
                  timer: 4000,
                  title: msg,
                  background: 'mistyrose'
                })
              })
          }
        })
    }
  }
})
