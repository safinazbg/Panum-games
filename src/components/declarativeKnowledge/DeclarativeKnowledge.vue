<template>
  <div class="min-h-screen">
  <PanumNavigation/>
  <div
      class="  max-w-3xl mx-auto text-center mt-24 min-h-[400px] flex flex-col justify-between"
  >
      <div class="h-20 flex items-center relative w-full justify-between">
<!--        <div class="border-gray-500"></div>-->
<!--        <div class="border-red-500"></div>-->
<!--        <div class="border-blue-500"></div>-->
<!--        <div class="border-yellow-500"></div>-->
<!--                <div class="bg-gray-500"></div>-->
<!--                <div class="bg-red-500"></div>-->
<!--                <div class="bg-blue-500"></div>-->
<!--                <div class="bg-yellow-500"></div>-->
<!--                <div class="text-gray-500"></div>-->
<!--                <div class="text-red-500"></div>-->
<!--                <div class="text-blue-500"></div>-->
<!--                <div class="text-yellow-500"></div>-->
      <div class="border w-[94%] mx-6 bg-slate-200 h-2 rounded-md absolute" >
        <div class=" w-full shadow-md h-2 bg-slate-700 transition-all duration-500 ease-in-out"
             :style="{ width: progress && !isNaN(progress) ? progress + '%' : 0 + '%', backgroundColor: progress && !isNaN(progress) ? '#85dcf9' : '' }"></div>
        </div>
        <div class="  relative " v-for="(style, view) in viewStyles" :key="view">
          <p class="absolute -top-6 text-gray-600 font-bold left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 duration-500 transition-opacity" :class="[{'opacity-100': currentView === view}]">
          {{ view }}
          </p>
          <div :class="['h-12 w-12 rounded-full border-4 transition-all duration-500 delay-100 ', { ' border-[#85dcf9] bg-[#85dcf9]': isViewReached(view) }, { '!bg-white': !isViewReached(view) } ]">
            <component :is="style.image" alt="" class=" z-40 grid  h-full place-items-center transition-all duration-500" :class="{ '!opacity-30 bounce': !isViewReached(view) }" />
          </div>
        </div>
      </div>

    <div v-if="!gameStarted">
      <h1 class="text-4xl ">Quiz - Test your knowledge</h1>
      <p class="leading-relaxed text-lg">
        Welcome to the quiz ! <br/>
        This quiz consist of
        <strong>{{ totalQuestions }}</strong>
        question. <br/>
        Please answer each question without using any outside help. <br/>
        If you do not know the answer to a question, just go with your best
        guess.
      </p>
      <button
          class="gamifiedButton"
          @click="startGame"
      >
        Start the quiz
      </button>
    </div>
    <div v-if="gameStarted">
      <div v-if="!showResult" class="">
        <h2 class="text-3xl my-2">
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
        <button class="gamifiedButton"
            @click="resetGame"
        >
          Return to homepage
        </button>
      </div>

    </div>
  </div>
  </div>
</template>

<script>
import QuestionAll from "@/components/declarativeKnowledge/QuestionAll.vue";
import {computed, reactive, ref} from "vue";
import PanumNavigation from "@/components/PanumNavigation.vue";
import questions from "@/questions.json";
import StarIcon from "@/components/declarativeKnowledge/icons/StarIcon.vue";

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
      'Welcome': { color: 'gray-500', image: StarIcon },
      'Social Science': { color: 'red-500', image: StarIcon },
      'Natural Science': { color: 'blue-500', image: StarIcon },
      'Humanities': { color: 'yellow-500', image: StarIcon },
      'Feedback': { color: 'gray-500', image: StarIcon },
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

    const progress = computed(() => {
      const viewIndex = views.indexOf(currentView.value);
      const answeredQuestions = currentQuestionIndex[currentView.value] ? currentQuestionIndex[currentView.value] : 0;
      const totalQuestions = questionsPrRound;
      const totalProgress = Math.min((viewIndex * 25 ) + 3  + (answeredQuestions / totalQuestions * 20),100)
      // Calculate progress as a percentage
      return totalProgress;
    });

    const isViewReached = (view) => {
      const currentViewIndex = views.indexOf(currentView.value);
      const targetViewIndex = views.indexOf(view);
      return currentViewIndex >= targetViewIndex;
    };
    const changeView = (newView) => {
      currentView.value = newView;
      currentQuestionIndex['Social Science'] = 0;
      currentQuestionIndex['Natural Science'] = 0;
      currentQuestionIndex['Humanities'] = 0;
    };
    const currentQuestion = computed(() => {
      const category = currentView.value;
      if (!questions[category] || !questions[category][currentQuestionIndex[category]]) {
        return null;
      }
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
          if (currentView.value === 'Feedback') {
            showResult.value = true;
          }
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
      for (const key in evaluations) {
        evaluations[key].correctAnswers = 0;
      }
      currentView.value = 'Welcome';
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
      progress,
      isViewReached
    };
  },
};
</script>

<style></style>
