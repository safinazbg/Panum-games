<template>
  <div
      v-if="view === 'Welcome'"
      class="title flex flex-col justify-evenly items-center h-full">
    <h1 class="gamifiedh1 text-center py-16">
      Mental speed game!
    </h1>
    <p class="text-center w-1/2 text-xl gamifiedp">
      You will play a <b>search minigame</b> and a <b>comparison minigame</b>.
      In both games, you have to answer as fast as you can.
      You will use the left and right arrow keys to respond.
    </p>

    <img src="../../assets/mental.png" height="150" width="150" class="my-8 "/>

    <button
        class="gamifiedButton"
        @click="next"
    >
      Go to search game
    </button>

  </div>
</template>
<script>
export default {
  name: 'WelcomePage',
  props: {
    next: {},
    view: {}
  }
}
</script>
<style>


</style>