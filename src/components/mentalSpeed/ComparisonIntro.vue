<template>
  <div
      v-if="view === 'ComparisonIntro'"
      class="title flex flex-col justify-evenly items-center h-full py-20 gap-6 gamifiedp">
    <h1 class="gamifiedh1 text-center">
      Good Job!
    </h1>
    <p class="text-xl text-center mt-6 ">Now the real challenge will begin</p>
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
  name: 'ComparisonIntro',
  components: {RightArrow, LeftArrow, },
  props: {
    next: {},
    view: {}
  }
}
</script>
<style>

</style>