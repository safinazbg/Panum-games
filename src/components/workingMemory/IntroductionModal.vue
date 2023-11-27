<template>
  <LInfo :show="show">
    <template #title>
      <h1 class=" ">
        Working Memory!
      </h1>
    </template>
    <template #body>
      <div class="flex justify-center w-full text-center ">
        <ol class="  list-decimal	">
<!--        <ol class="  	">-->
          <li class="pb-2"> Colorful squares will appear one at a time. Pay close attention.</li>
          <li class="pb-2"> You have to keep track of the last location of each color.</li>
          <li class="pb-2"> At the end, you will be asked where each color last appeared.</li>
          <li class="pb-2"> If you do not remember the answer, just go with your best guess.</li>
          <li class="pb-2"> There will be a practice round before the game begins.</li>
        </ol>
      </div>
    </template>
    <template #button>
      <button @click="start" class="">
        <p class="gamifiedh1 !text-yellow-200 ">
          Start !
        </p>
      </button>
    </template>
  </LInfo>
</template>

<script>
import LInfo from "@/components/workingMemory/LInfo.vue";
export default {
  name: "IntroductionModal",
  emits: [
    'start'
  ],
  components: {LInfo},
  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, {emit}) {
    const start = () => {
      emit("start");
    }
    return {
      start
    }
  }
}
</script>

<style scoped>
@media (min-width: 1000px) {
  .listing {
    font-size: 1rem; /* Equivalent to k1:text-md */
  }
}
</style>