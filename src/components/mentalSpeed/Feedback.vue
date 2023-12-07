<template>
  <div
      v-if="view === 'Feedback'"
      class="GameEnd container mx-auto flex flex-col items-center pt-12 pb-6 fadeInAnimation"
  >
    <div class="title flex flex-col justify-evenly items-center h-full py-20 ">
      <h1 class="gamifiedh1 text-center flex">
        Thank you for playing!
      </h1>
      <p class="text-3xl mx-4 my-12">You have completed the game. Well done!</p>
      <p class="text-2xl font-semibold">Search minigame: {{ searchEvaluation }} of 10 were correct!</p>
      <p class="text-2xl font-semibold">Comparison minigame: {{ comparisonEvaluation }} of 10 were
        correct!</p>

      <button @click="end" class="gamifiedButton mt-12">
        Return to homepage
      </button>

    </div>
  </div>
</template>
<script>
import router from "@/router";

export default {
  name: 'FeedbackPage',
  props: {
    comparisonEvaluation: {
      type: Number,
      required: true,
    },
    searchEvaluation: {
      type: Number,
      required: true,
    },
    view: {
      type: String,
      required: true,
    },
  },
  setup() {
    const end = () => {
      router.push('/');
    }
    return {end}
  }
}
</script>
<style>


</style>