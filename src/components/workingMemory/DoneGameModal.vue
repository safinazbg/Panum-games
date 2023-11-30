<template>
  <LInfo :show="show">
    <template #title>
      Game End
    </template>
    <template #body>
      <div class=" text-center">
      You finished all the levels - well done! <br>
      This was your final score:
      <h1 class="font-bold py-4 text-4xl"> {{totalPoints}} / 12</h1>
      Thank you for playing!
      </div>
    </template>

    <template #button>
      <button @click="end" class=" ">
          Return to homepage
      </button>
    </template>
  </LInfo>
</template>

<script>
import LInfo from "@/components/LInfo.vue";
import router from "@/router";

export default {
  name: "DoneGameModal",
  emits: [
    'start'
  ],
  components: {LInfo},
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    totalPoints: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const end = () => {
      router.push('/');
    }
    return {
      end
    }
  }
}
</script>

<style scoped>

</style>