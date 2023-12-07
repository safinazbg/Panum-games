<template>
  <div
      v-if="view === 'SearchIntro'"
      class="introPage container mx-auto flex flex-col items-center fadeInAnimation"
  >
    <h2 class="gamifiedh1 text-center py-10 ">
      Well done! </h2>
    <p class="text-xl text-center mt-6">Now the real challenge will begin</p>
    <p class="text-xl text-center mt-6">Good luck and have fun</p>
    <div class="flex flex-col">

      <p class="text-center mt-10 mb-2">
        Press left or right arrow key to begin
      </p>
      <div class="flex space-x-8 justify-center mb-14">
        <button
            class="gamifiedButtonMentalSpeedGreen"
            @click="next"
        >
          <LeftArrow class="w-8 "/>
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
import LeftArrow from "@/components/declarativeKnowledge/icons/LeftArrow.vue";
import RightArrow from "@/components/declarativeKnowledge/icons/RightArrow.vue";

export default {
  name: 'SearchIntro',
  components: {RightArrow, LeftArrow,},
  props: {
    next: {},
    view: {}
  }
}
</script>
<style>


</style>