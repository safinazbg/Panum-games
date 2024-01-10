<template>
  <div
      v-if="view === 'Comparison TrialIntro'"
      class="title flex flex-col justify-evenly items-center h-full ">
    <h1 class=" gamifiedh1 text-center py-12">
      Comparison task trial
    </h1>
    <p class="text-center w-1/2 text-lg">
      Now you will be shown a pair of 3 stimuli on the screen, which are again
      either numbers, letters or symbols. You just have to indicate whether
      they are the same or different from each other. Remember to be fast!
    </p>
    <p class="text-lg">The first 2 rounds are trials again.</p>
    <p class="text-lg">Good luck and have fun!</p>
    <div class="flex flex-col">
      <p class="text-center mt-10 mb-2 gamifiedp !text-xs">
        Press left or right arrow key to continue
      </p>
      <div class="flex space-x-8 justify-center">
        <button
            @click="next"
            class="gamifiedButtonMentalSpeedGreen"
        >
          <LeftArrow class="w-8 "/>
        </button>
        <button
            @click="next"
            class="gamifiedButtonMentalSpeedRed"
        >
          <RightArrow class="w-8"/>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import LeftArrow from "@/components/declarativeKnowledge/icons/LeftArrow.vue";
import RightArrow from "@/components/declarativeKnowledge/icons/RightArrow.vue";

export default {
  name: 'ComparisonTrialIntro',
  components: {RightArrow, LeftArrow, },
  props: {
    next: {},
    view: {}
  }
}
</script>
<style>


</style>