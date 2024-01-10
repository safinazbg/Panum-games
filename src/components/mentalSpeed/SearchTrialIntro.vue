<template>
  <div
      v-if="view === 'Search TrialIntro'"
      class="introPage container mx-auto gamifiedp  flex flex-col items-center fadeInAnimation"
  >
    <h2 class="gamifiedh1 pt-16">
      Search minigame trial
    </h2>
    <p class=" pb-16 gamifiedh2 ">Welcome to the search minigame!</p>
    <p class="text-md text-center ">
      A symbol (letter or number) will appear on your screen.</p>
    <p class="text-md text-center ">
      Using the left or right arrow key, you have to choose the
      <br> option that matches the symbol. Remember to be fast!
    </p>
    <p class="text-md text-center ">
      You will first have a short trial run to practice
    </p>
    <p class="text-md text-center mt-6">Good luck and have fun</p>
    <div class="flex flex-col">

      <p class="text-center mt-10 mb-2 text-xs">
        Press left or right arrow key to begin trial round
      </p>
      <div class="flex justify-between gap-x-8 mb-14">
        <button
            class="gamifiedButtonMentalSpeedGreen"
            @click="next"
        >
          <LeftArrow class="w-8"/>
        </button>
        <button
            class="gamifiedButtonMentalSpeedRed"
            @click="next"
        >
          <RightArrow class="w-8"/>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import RightArrow from "@/components/declarativeKnowledge/icons/RightArrow.vue";
import LeftArrow from "@/components/declarativeKnowledge/icons/LeftArrow.vue";

export default {
  name: 'SearchTrialIntro',
  components: {RightArrow, LeftArrow},
  props: {
    next: {},
    view: {}
  }
}
</script>
<style>

</style>