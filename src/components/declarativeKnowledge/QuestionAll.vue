<template>
  <div>
    <div v-if="!showFeedback">
      <p class="text-3xl my-4">
        {{ question && question.text }}
      </p>
      <hr />
      <div v-for="(option, index) in question && question.options" :key="index">
        <button
          class="w-60 h-14 bg-gray-300 hover:bg-gray-400 duration-300 ease-in-out active:bg-gray-900 border-2 border-gray-900 rounded-md my-2"
          @click="checkOption(option)"
        >
          {{ option }}
        </button>
      </div>
    </div>
    <div v-if="showFeedback" class="flex flex-col items-center justify-center">
      <div v-if="isCorrect">
        <p class="text-2xl my-4 border-b border-b-green-500">Correct</p>
        <CorrectIcon />
      </div>
      <div v-else>
        <p class="text-2xl my-4 border-b border-b-red-500">Incorrect</p>
        <InCorrectIcon />
      </div>
    </div>
  </div>
</template>

<script>
import CorrectIcon from "@/components/icons/CorrectIcon.vue";
import InCorrectIcon from "@/components/icons/InCorrectIcon.vue";
import { ref } from "vue";
export default {
  components: {
    CorrectIcon,
    InCorrectIcon,
  },
  props: {
    question: Object,
  },
  setup(props, { emit }) {
    const showFeedback = ref(false);
    const isCorrect = ref(false);

    const checkOption = (option) => {
      if (option === props.question.answer) {
        isCorrect.value = true;
      } else {
        isCorrect.value = false;
      }
      showFeedback.value = true;
      setTimeout(() => {
        showFeedback.value = false;
        emit("answer", isCorrect.value);
      }, 2000);
    };

    return { showFeedback, isCorrect, checkOption };
  },
};
</script>
