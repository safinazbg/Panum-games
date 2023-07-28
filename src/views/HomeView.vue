<template>
  <div class="container mx-auto w-full flex border-b-2 border-black">
    <div class="w-4/5 h-16 md:ml-44 mx-4">
      <router-link to="/MentalSpeed">
        <p class="w-1/2 text-2xl font-bold">Panum</p>
      </router-link>
      <p class="text-sm text-gray-500">Designed to train your brain</p>
    </div>
    <div
      class="w-32 h-16 border-l-2 border-black flex justify-center items-center md:mx-2"
    >
      <button
        class="border-2 border-black rounded-full text-center mx-2 w-36 h-8 flex justify-center items-center"
      >
        Log in
        <span class="ml-3"><arrowTop class="h-4 w-4"></arrowTop></span>
      </button>
    </div>
  </div>
  <div
    class="home flex flex-col items-center h-screen justify-center w-full mx-auto bg-gray-100"
  >
    <div v-if="!testCompleted" class="max-w-5xl">
      <div class="topbar flex items-center w-full mb-4">
        <div class="w-[40%] sm:w-[20%]">
          <button
            class="sm:px-6 px-4 py-1 text-slate-500 shadow-md bg-slate-50 border-slate-400 rounded-l-full sm:mr-2 hover:bg-white hover:text-black hover:border-slate-500 duration-300 ease-linear"
            @click="goBack"
          >
            Go Back
          </button>
        </div>
        <div
          class="progresbar relative bg-slate-50 border border-slate-300 shadow-md w-[99%] sm:w-full h-8 rounded-r-full"
        >
          <div
            class="bg-cyan-300 flex items-center h-8 rounded-r-sm duration-300 ease-linear border-2 border-cyan-300"
            :style="{ width: progresBarWidth }"
          >
            <div class="absolute top-1 left-2 sm:left-1/2 sm:-translate-x-1/2">
              <div class="flex space-x-2">
                <p class="font-light">
                  ITEM

                  <span class="font-bold">{{ currentItem + 1 }}</span>
                </p>

                <p class="font-light">FROM 36</p>

                <p class="">
                  PROGRES (<span class="font-bold">
                    {{ progressPercentage }}%</span
                  >)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="questionImg w-full shadow-lg">
        <img
          :src="currentQuestion.image"
          class="object-cover mx-auto rounded"
          alt=""
        />
      </div>

      <div class="answerButton flex flex-col w-full mx-auto mt-4">
        <button
          class="px-8 py-4 bg-slate-50 border border-slate-300 rounded-xl shadow-md hover:bg-white hover:shadow-lg hover:border-b-slate-400 mb-3 duration-300 ease-linear capitalize"
          @click="nextQuestion"
          v-for="(answer, index) in currentQuestion.answers"
          :key="index"
        >
          {{ answer }}
        </button>
      </div>
    </div>

    <div v-else class="">
      <div class="flex flex-col items-center mt-4">
        <p class="">Play again?</p>

        <button
          @click="resetBtn"
          class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-44 h-12 mt-8"
        >
          EVET
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import dataQuestions from "@/data.json";
import { reactive, ref } from "vue";
import arrowTop from "@/components/Icons/arrowTop.vue";
export default {
  name: "HomeView",
  components: { arrowTop },
  setup() {
    const questions = reactive(dataQuestions);

    const totalQuestion = questions.length;

    const currentItem = ref(0);

    const progresBarWidth = ref("0%");

    const progressPercentage = ref(0);

    const testCompleted = ref(false);

    const currentQuestion = ref(questions[currentItem.value]);

    const nextQuestion = () => {
      currentItem.value++;

      const selectedAnswerPercentage =
        (currentItem.value / totalQuestion) * 100;
      progresBarWidth.value = `${selectedAnswerPercentage}%`;
      progressPercentage.value = Math.floor(
        (currentItem.value / totalQuestion) * 100
      );

      if (currentItem.value === totalQuestion) {
        testCompleted.value = true;
        return;
      }

      currentQuestion.value = questions[currentItem.value];
    };

    const goBack = () => {
      if (currentItem.value > 0) {
        currentItem.value--;
        const selectedAnswerPercentage =
          (currentItem.value / totalQuestion) * 100;
        progresBarWidth.value = `${selectedAnswerPercentage}%`;
        progressPercentage.value = Math.floor(
          (currentItem.value / totalQuestion) * 100
        );
      }
      currentQuestion.value = questions[currentItem.value];
    };

    const resetBtn = () => {
      currentItem.value = 0;
      progresBarWidth.value = "0%";
      progressPercentage.value = 0;
      currentQuestion.value = questions[currentItem.value];
      testCompleted.value = false;
    };

    return {
      currentItem,
      progresBarWidth,
      progressPercentage,
      currentQuestion,
      nextQuestion,
      goBack,
      resetBtn,
      testCompleted,
    };
  },
};
</script>
