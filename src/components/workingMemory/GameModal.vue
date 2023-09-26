<template>
  <LInfo :show="show" class="text-center">
    <template #title>
      <h1 class="self-center text-4xl">
        Well done!
      </h1>
    </template>
    <template #body>
      Now you are ready to begin the game. <br>
      You will play through
      <span class="font-extrabold">
      4 levels.
      </span><br>
      Each level has
      <span class="font-extrabold">
        3 rounds.
      </span> <br>
      Good luck!
    </template>

    <template #button>
      <button @click="start" class="button ">
        Start
      </button>
    </template>
  </LInfo>
</template>

<script>
import LInfo from "@/components/workingMemory/LInfo.vue";

export default {
  name: "GameModal",
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

</style>