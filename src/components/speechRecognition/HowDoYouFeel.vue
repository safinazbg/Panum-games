<script>
import PanumNavigation from "@/components/PanumNavigation.vue";
import {ref} from "vue";

export default {
  components: {
    PanumNavigation
  },

  setup() {

    const clickedCell = ref({row: null, col: null});

    const handleCellClick = (row, col) => {
      clickedCell.value = {row, col};
    };
    const grid = ref(Array.from({length: 9}, () => Array(9).fill('')));
    const sadToHappyFeelings = ['😢', '😞', '😐', '😊', '😄'];
    const stressedToExcitedFeelings = ['😓', '😟', '😐', '😃', '😁'];
    const stressedToDepressedFeelings = ['😟', '😰', '😔'];
    const happyToRelaxedFeelings = ['😃', '😊', '😌'];

    return {
      grid,
      sadToHappyFeelings,
      stressedToExcitedFeelings,
      stressedToDepressedFeelings,
      happyToRelaxedFeelings,
      handleCellClick,
      clickedCell
    }
  },

}
</script>

<template>
  <PanumNavigation/>
  <div
      class="container mx-auto max-w-5xl flex flex-col items-center justify-center"
  >
    <h1 class="gamifiedh1 text-center">
      How are you feeling RIGHT AT THIS MOMENT?
    </h1>
    <p class="text-center gamifiedh2">Please click the box closest to how you are currently feeling.</p>
      <div class="flex gamifiedp justify-between max-w-lg w-full mt-8 ">
        <p>Strees</p>
        <p>
          High arousal
        </p>
        <p>Excitement</p>
      </div>
    <div class="w-2xl  text-4xl ">
      <div class="smileys flex w-full justify-between mb-1">
        <div v-for="feeling in stressedToExcitedFeelings" :key="feeling" class="smiley ">
          {{ feeling }}
        </div>
      </div>
      <div class="flex relative">
          <p class="self-center absolute transform -left-2 -translate-x-full gamifiedp ">
          Unpleasant
          </p>

        <!-- Left side smileys -->
        <div class="smileys flex flex-col justify-evenly ">
          <div v-for="feeling in stressedToDepressedFeelings" :key="feeling" class="smiley ">
            {{ feeling }}
          </div>
        </div>

        <div class="grid grid-cols-9 gap-[1px] ">
          <div v-for="row in 9" :key="row" class="flex gap-[1px] flex-col">
            <div v-for="col in 9" :key="col" class="grid-cell w-10 h-10 bg-slate-100 active:scale-90 hover:bg-slate-200"
                 :class="{'!bg-[#89f2f2]': clickedCell.row === row  && clickedCell.col === col}"
                 @click="handleCellClick(row, col)">
              {{ grid[row - 1][col - 1] }}
            </div>
          </div>
        </div>
        <!-- Right side smileys -->
        <p class="self-center absolute transform -right-2 translate-x-full gamifiedp ">
          Pleasant
        </p>
        <div class="smileys flex flex-col justify-evenly ">
          <div v-for="feeling in happyToRelaxedFeelings" :key="feeling" class="smiley ">
            {{ feeling }}
          </div>
        </div>
      </div>

      <!-- Bottom smileys -->
      <div class="smileys flex justify-between ">
        <div v-for="feeling in sadToHappyFeelings" :key="feeling" class="smiley ">
          {{ feeling }}
        </div>
      </div>
    </div>
      <div class="flex gamifiedp justify-between max-w-lg w-full  ">
        <p>Depression</p>
        <p>
          Sleepiness
        </p>
        <p>Relaxation</p>
      </div>
  </div>

</template>

<style scoped>

</style>