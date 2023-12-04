<template>
  <div>
<!--    <div v-if="!showFeedback">-->
      <p class="text-2xl my-4 h-16 grid place-items-center">
        {{ question && question.text }}
      </p>
      <hr />
      <div class="grid grid-cols-2 gap-6 my-6">
      <div v-for="(option, index) in question && shuffledOptions()" :key="index" >
        <button
          class="gamifiedButton w-full h-24 leading-tight capitalize text-lg text-white"
          @click="checkOption(option)"
        >
          {{ option }}
        </button>
      </div>
      </div>
<!--    </div>-->
<!--    <div v-if="showFeedback" class="flex flex-col items-center justify-center">-->
<!--      <div v-if="isCorrect">-->
<!--        <p class="text-2xl my-4 border-b border-b-green-500">Correct</p>-->
<!--        <CorrectIcon />-->
<!--      </div>-->
<!--      <div v-else>-->
<!--        <p class="text-2xl my-4 border-b border-b-red-500">Incorrect</p>-->
<!--        <InCorrectIcon />-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
// import CorrectIcon from "@/components/declarativeKnowledge/icons/CorrectIcon.vue";
// import InCorrectIcon from "@/components/declarativeKnowledge/icons/InCorrectIcon.vue";
import { ref } from "vue";
export default {
  components: {
  },
  props: {
    question: Object,
  },
  setup(props, { emit }) {
    // const showFeedback = ref(false);
    const isCorrect = ref(false);

    const checkOption = (option) => {
      if (option === props.question.answer) {
        isCorrect.value = true;
      } else {
        isCorrect.value = false;
      }
        emit("answer", isCorrect.value);
      // showFeedback.value = true;
      // setTimeout(() => {
      //   showFeedback.value = false;
      //   emit("answer", isCorrect.value);
      // }, 2000);
    };

    const shuffledOptions = () =>  {
      // Fisher-Yates shuffle algorithm
      let shuffled = [...props.question.options];
      let currentIndex = shuffled.length;
      let randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [shuffled[currentIndex], shuffled[randomIndex]] = [
          shuffled[randomIndex],
          shuffled[currentIndex]
        ];
      }
      return shuffled;
    }


    return { isCorrect, checkOption, shuffledOptions };
    // return { showFeedback, isCorrect, checkOption };
  },
};
</script>
