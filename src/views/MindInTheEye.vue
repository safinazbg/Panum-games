<template>
  <PanumNavigation></PanumNavigation>
  <div
      class="home flex flex-col items-center h-screen justify-center w-full mx-auto bg-gray-100"
  >
    <div v-if="!testCompleted" class="max-w-5xl">
      <div class="topbar flex items-center w-full mb-4">
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

                  <span class="font-bold">{{ currentItem + 1 }}</span>
                </p>

                <p class="font-light">OF 36</p>

                <p class="">
                   (<span class="font-bold">
                    {{ progressPercentage }}</span
                >)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="questionImg relative w-full shadow-lg">
        <img
            :src="currentQuestion.image"
            class="object-cover mx-auto rounded"
            alt=""
        />
        <span class="absolute -right-20">{{correctAnswerCount}} / {{questionCount}}</span>
      </div>

      <div class="answerButton flex flex-col w-full mx-auto mt-4">
        <button
            class="px-8 py-4 border border-slate-300 rounded-xl shadow-md mb-3 duration-300 ease-linear capitalize"
            :class="{
              'hover:bg-white hover:shadow-lg hover:border-b-slate-400': !showCorrectAnswer,
              'bg-green-100 border-green-400': showCorrectAnswer && index == currentQuestion.answerIndex,
              'bg-red-100 border-red-400': showCorrectAnswer && index != currentQuestion.answerIndex,
              'opacity-50': showCorrectAnswer && index != currentAnswerIndex
            }"
            v-for="(answer, index) in currentQuestion.answers"
            :key="index"
            @click="onAnswer(index)"
        >
          {{ answer }}
        </button>

      </div>
    </div>

    <div v-else class="">
      <div class="flex flex-col items-center mt-4">
        <p class="">Dit resultat:</p>

        <div>Du svarede rigtigt <span>{{correctAnswerCount}} ud af {{questionCount}}</span> gange!</div>
        <!--        <button-->
        <!--          @click="resetBtn"-->
        <!--          class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-44 h-12 mt-8"-->
        <!--        >-->
        <!--          EVET-->
        <!--        </button>-->
      </div>
    </div>
  </div>
</template>

<script>
import dataQuestions from "@/data_old.json";
import {reactive, ref} from "vue";

import PanumNavigation from "@/components/PanumNavigation.vue";

// const questions = [
// [er jaloux,er i panik,er overlegen,er fuld af had],
// [er fuld af sjov,trøster nogen,er irriteret,keder sig],
// [er skrækslagen,er ked af det,er overlegen,er utilfreds],
// [laver sjov,er flov og forvirret,begærer nogen,er overbevist],
// [laver sjov,er stædig,morer sig,er afslappet],
// [er irriteret,er sarkastisk,er bekymret,er venlig],
// [er chokeret,dagdrømmer,er utålmodig,er forskrækket],
// [undskylder,er venlig,er beklemt,har tabt modet],
// [er opgivende,er lettet,er genert,er spændt],
// [er utilfreds,er fjendtlig,er forfærdet,er optaget af egne tanker],
// [er forsigtig,er stædig,keder sig,er chokeret],
// [er skrækslagen,morer sig,fortryder noget,flirter med nogen],
// [er ligeglad,er flov,er skeptisk,har tabt modet],
// [har besluttet sig,er anspændt,truer,er genert],
// [er irriteret,er skuffet,er deprimeret,anklager nogen],
// [er fordybet i egne tanker,er flov og forvirret,opmuntrer nogen,morer sig],
// [er irriteret,tænker sig om,opmuntrer nogen,føler med nogen],
// [er i tvivl,er kærlig,er fuld af sjov,er chokeret],
// [har besluttet sig,morer sig,er chokeret,keder sig],
// [er overlegen,er taknemmelig,er sarkastisk,er afventende],
// [er dominerende,er venlig,føler skyld,er forfærdet],
// [er flov,dagdrømmer,er forvirret,er i panik],
// [er optaget af egne tanker,er taknemmelig,er stædig,beder inderligt om noget],
// [er tilfreds,undskylder,er trodsig,er nysgerrig],
// [er eftertænksom,er irriteret,er spændt,er fjendtlig],
// [er i panik,tror ikke sine egne øjne er opgivende,,er interesseret],
// [er nervøs,er genert,er fjendtlig,er forskrækket],
// [laver sjov,er forsigtig,er overlegen,beroliger nogen],
// [er interesseret,laver sjov,er kærlig,er tilfreds],
// [er utålmodig,er chokeret,er irriteret,tænker sig om],
// [er taknemmelig,flirter med nogen,er fjendtlig,er skuffet],
// [skammer sig,er selvsikker,laver sjov,har tabt modet],
// [er alvorlig,skammer sig,er forbløffet,er forskrækket],
// [er flov,føler skyld,fantaserer,tænker på noget alvorligt],
// [er chokeret,er vildt overrasket,stoler ikke på nogen,er skrækslagen],
// [undrer sig over noget,er meget usikker,er stædig,er fordybet i egne tanker],
// [skammer sig,er meget usikker,er mistænksom,kan ikke bestemme sig],
// ]

export default {
  name: "MindInTheEye",
  components: {PanumNavigation},
  setup() {
    const questions = reactive(dataQuestions);
    const questionCount = questions.length;

    const totalQuestion = questions.length;

    const currentItem = ref(0);
    const currentAnswerIndex = ref(null)

    const progresBarWidth = ref("0%");

    const progressPercentage = ref(0);
    const correctAnswerCount = ref(0);
    const showCorrectAnswer = ref(false)

    const testCompleted = ref(false);

    const currentQuestion = ref(questions[currentItem.value]);

    const showNextQuestion = () => {
      currentItem.value++;

      const selectedAnswerPercentage = (currentItem.value / totalQuestion) * 100;
      progresBarWidth.value = `${selectedAnswerPercentage}%`;
      progressPercentage.value = Math.floor((currentItem.value / totalQuestion) * 100)

      if (currentItem.value === totalQuestion) {
        testCompleted.value = true;
        return;
      }

      currentQuestion.value = questions[currentItem.value]
    }

    const onAnswer = (index) => {

      if (showCorrectAnswer.value) return

      currentAnswerIndex.value = index
      const isCorrectIndex = index == currentQuestion.value.answerIndex
      if (isCorrectIndex) correctAnswerCount.value++

      showCorrectAnswer.value = true
      setTimeout(() => {
        showCorrectAnswer.value = false
        showNextQuestion()
      },  3000)
    }
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
      correctAnswerCount,
      currentAnswerIndex,
      currentItem,
      progresBarWidth,
      progressPercentage,
      currentQuestion,
      onAnswer,
      goBack,
      resetBtn,
      showCorrectAnswer,
      testCompleted,
      questionCount,
    };
  },
};
</script>
