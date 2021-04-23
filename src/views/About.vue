<template>
  <div id="about-page" class="page">
    <div id="intro">
      <h2>Sir, what is this Flashero app?</h2>
      <p>Prepare to be not surprised -- Flashero is just a glorified version of <a href="https://en.wikipedia.org/wiki/Flashcard" target="_blank">flashcard</a> in the real world</p>
      <p>If you are not familiar to some term associated with it, <b>flashcard</b> is basically a small piece of paper that contains information on both sides: front side is the problem or question, and back side is the solution</p>
      <img src="https://i.imgur.com/4dT0GhF.png" alt="Guide-1">
      <p>We calls a stack of a flashcard in one category a <b>Deck</b>. A common pattern when using a flashcard is for memorization by clearing a deck and adding it with new cards regularly</p>
    </div>
    <hr>
    <div id="feature">
      <h2>That's... sounds like a pain... , I'm sucks at keep doing something regularly. Not to mention it's boring to answer a same card over again especially when you are already good at it!</h2>
      <p>Well, you are not alone! That's why Flashero added a little twist: you can level up your profile everytime you studied! Hopefully this little things can keep you motivated as seeing your own progress from time to time can be rewarding! ( and you can flex to yourself! )</p>
      <p>For your second ranting, a common solution when using the real world flashcard is you either need to remove the card that you thought you already mastered from the deck or separate it to another deck. But Flashero have a simple <b>Mastery</b> feature that will add the interval when you are going to study that card again automatically based on your performance when you studied that certain card! </p>
      <img src="https://i.imgur.com/QuIiJmB.png" alt="Guide-2">
    </div>
    <hr>
    <div id="initial">
      <h2>Interesting... So, how can I use this app?</h2>
      <p>First you will need to <a href="/register" target="_blank">register</a> yourself first so we can record your own custom cool deck later or if you had already, <a href="/login" target="_blank">login with your username and password</a></p>
      <p>Once you are in, you will be navigated to home with your deck collection is still empty... but don't worry, you will have one your own soon! If you take a look at navigantion bar, you can <b>view your profile</b> stats ( or changing your avatar ) by clicking your username and <b>Add</b> a new card in navigation bar.</p>
      <p>Let's take a look at the main page first. We have 2 ways to create the deck, let's use the more basic one first -- click <b>Create a new Deck</b></p>

      <img src="https://i.imgur.com/6rQmGSd.png" alt="Guide-3">

      <p>Enter your new deck's name anything you like, now you have successfully created your own first deck!</p>
    </div>
    <hr>
    <div id="add-card">
      <h2>That's good and all... But my deck is empty! I want to fill it with my own cool cards!</h2>
      <p>Now now, remember <b>Add a new Card</b> thingy back when we are talking about navigation bar? Now click that <b>Add</b> in navigation bar!</p>

      <img src="https://i.imgur.com/5NLbt9N.png" alt="Guide-4">

      <p>Enter whatever you want to the front side and back side! Remember that front side is mandatory while you can left back side as empty</p>
    </div>
    <hr>
    <div id="study-deck">
      <h2>Cool! So how can I start beating my own deck now?</h2>
      <p>You only need to click that deck in home, then you will be navigated to that deck detail. Here you can change your deck's name, browse and search all of the cards in that deck, export, or delete that deck!. Click <b>Start!</b> button to start studying that deck!</p>

      <img src="https://i.imgur.com/sLSrlQe.png" alt="Guide-5">

      <p>Now you can start studying from there! Please answer it honestly ( or there will be no point using Flashero in the first place... )</p>
    </div>
    <hr>
    <div id="share-deck">
      <h2>Awesome! Now I will excuse myself to create more card to--</h2>
      <p>Whoa! Hold your horse, son! I still need to tell you one more useful feature of Flashero. Remember that <b>export</b> and <b>import</b> backthen? In case you wanted to share your deck to your friend or you wanted to use others shared deck, you can just click 'em. You only need to click <b>export</b>, then we will automatically give you the pastebin key! For importing others shared deck, and you only need to click <b>import</b> in your home then enter the deck's pastebin key! Easy, eh?</p>
      <img src="https://i.imgur.com/BYX01S1.png" alt="Guide-7">
    </div>
    <hr>
    <div id="closing">
      <h2>That's sick! Any other thing I need to know?</h2>
      <p>Actually that's all what this app can do for now! And here is a simple wise advice from us when you want to study with any flashcard: <b>--Never-- break that chain-link</b>. So yeah, do it daily if possible!</p>
      <p>In case you still don't really understand Flashero or flashcard in general, try to import our tutorial deck -- simply click import and copy the pastebin code for tutorial deck there, then try start study with that deck! </p>
      <p>And the last but not the least, here is our site mascot pepe as a bonus and good luck with your study!</p>
      <img src="https://i.imgur.com/kHJw66Q.png" alt="pepe-ok">
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
  h2 {
    font-weight: bold
  }

  #about-page {
    background-color: lightblue;
    border: solid black 2px;
    width: 75vw;
  }

  p {
    font-size: 1.4em !important;
  }

  img {
    border: solid black 2px;
    max-width: 100%
  }
</style>
