<template>
  <PanumNavigation/>
  <div
      class="flex flex-col items-center justify-center max-w-3xl mx-auto text-center mt-40"
  >
    <div v-if="!gameStarted">
      <div class="h-20 flex items-center relative w-full justify-between">
<!--        <div class="bg-gray-500"></div>-->
      <div class="w-full bg-green-500 h-5 rounded-md absolute" />
        <div class="z-10" v-for="(style, view) in viewStyles" :key="view">
          <img :src="style.image" alt="" class="w-12 h-12 z-40 absolute">
          <div :class="['h-12 w-12 rounded-full', 'bg-' + style.color]">
        </div>
        </div>
      </div>
      <h1 class="text-6xl my-4 font-bold text-green-800">Quiz - test your knowledge</h1>
      <p class="leading-relaxed text-lg">
        Welcome to the quiz ! <br/>
        This quiz consist of
        <strong>{{ totalQuestions }}</strong>
        question. <br/>
        Please answer each question without using any outside help. <br/>
        if you do not know the answer to a question, just go with your best
        guess.
      </p>
      <button
          class="bg-gray-300 px-4 py-6 text-lg border-2 border-gray-800 rounded-md my-10 hover:bg-gray-400 ease-in-out duration-300"
          @click="startGame"
      >
        Start the quiz
      </button>
    </div>
    <div v-if="gameStarted">
      <div v-if="gameStarted && !showResult">
        <h2 class="text-3xl my-4">
          Question <strong>{{ currentQuestionIndex[currentView] + 1 }}</strong> of
          <strong>{{ questionsPrRound }}</strong>
        </h2>
        <hr/>
        <QuestionAll
            :question="currentQuestion"
            @answer="answerQuestion"
        />
      </div>

      <div v-if="showResult" class="space-y-4">
        <div v-for="(evaluation, category) in evaluations" :key="evaluation">
          <div v-if="evaluation.correctAnswers > 0">
            <p class="text-2xl" :class="'text-' + viewStyles[currentView].color + '-500'">
              {{ category }}: {{ evaluation.correctAnswers }} correct
              answers
            </p>
          </div>
        </div>
        <p class="text-2xl">Thank you for playing !</p>
        <button
        class="bg-gray-400 px-4 py-6 text-lg border-2 border-gray-800 rounded-md my-10 hover:bg-gray-500 ease-in-out duration-300"
            @click="resetGame"
        >
          Return to homepage
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import QuestionAll from "@/components/declarativeKnowledge/QuestionAll.vue";
import {computed, reactive, ref} from "vue";
import PanumNavigation from "@/components/PanumNavigation.vue";
import questions from "@/questions.json";
import CorrectIcon from "@/components/declarativeKnowledge/icons/CorrectIcon.vue";

export default {
  name: "DeclarativeKnowledge",
  components: {
    PanumNavigation,
    QuestionAll,
  },
  setup() {
    const gameStarted = ref(false);
    const correctAnswer = ref(0);
    const showResult = ref(false);

    const socialScienceQuestions = ref(questions['Social Science']);
    const naturalScienceQuestions = ref(questions['Natural Science']);
    const humanitiesQuestions = ref(questions['Humanities']);
    const questionsPrRound = 10
    const totalQuestions =  socialScienceQuestions.value.length + naturalScienceQuestions.value.length + humanitiesQuestions.value.length
    const views = [
      'Welcome',
      'Social Science',
      'Natural Science',
      'Humanities',
      'Feedback',
    ]
    const viewStyles =  {
      'Welcome': { color: 'gray-500', image: CorrectIcon },
      'Social Science': { color: 'red-500', image: CorrectIcon },
      'Natural Science': { color: 'blue-500', image: CorrectIcon },
      'Humanities': { color: 'yellow-500', image: CorrectIcon },
      'Feedback': { color: 'gray-500', image: CorrectIcon },
    }

    const currentView = ref(views[0])
    const currentQuestionIndex = reactive({
      'Social Science': 0,
      'Natural Science': 0,
      'Humanities': 0,
    });
    const evaluations = reactive({
      'Social Science': {correctAnswers: 0},
      'Natural Science': {correctAnswers: 0},
      'Humanities': {correctAnswers: 0},
    });



    const changeView = (newView) => {
      currentView.value = newView;
      currentQuestionIndex['Social Science'] = 0;
      currentQuestionIndex['Natural Science'] = 0;
      currentQuestionIndex['Humanities'] = 0;
    };
    const currentQuestion = computed(() => {
      const category = currentView.value;
      return questions[category][currentQuestionIndex[category]];
    });
    const answerQuestion = (isCorrect) => {
      if (currentView.value === 'Feedback') {
        showResult.value = true;
        return;
      }
      const category = currentView.value;

      if (isCorrect) {
        evaluations[category].correctAnswers++;
      }

      currentQuestionIndex[category]++;

      // If all questions in the category are answered, move to the next view
      if (currentQuestionIndex[category] >= questions[category].length) {
        const nextViewIndex = views.indexOf(currentView.value) + 1;
        if (nextViewIndex < views.length) {
          changeView(views[nextViewIndex]);
        } else {
          // All questions are answered in all categories, show result
          showResult.value = true;
        }
      }
    };


    const startGame = () => {
      currentView.value = 'Social Science';
      gameStarted.value = true;
    };

    const resetGame = () => {
      gameStarted.value = false;
      showResult.value = false;
      correctAnswer.value = 0;
      currentQuestionIndex.value = 0;
      currentView.value = 'Social Science';
    };

    return {
      gameStarted,
      startGame,
      currentQuestionIndex,
      correctAnswer,
      showResult,
      resetGame,
      currentView,
      socialScienceQuestions,
      naturalScienceQuestions,
      humanitiesQuestions,
      evaluations,
      changeView,
      answerQuestion,
      questionsPrRound,
      totalQuestions,
      currentQuestion,
      viewStyles,
      views,
      CorrectIcon
    };
  },
};
</script>

<style></style>
