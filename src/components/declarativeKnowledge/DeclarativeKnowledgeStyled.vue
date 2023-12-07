
<template>
  <div class="min-h-screen flex flex-col ">
    <PanumNavigation/>
    <div
        class="  max-w-3xl mx-auto text-center my-16 w-full  flex-grow flex flex-col justify-between"
    >
      <Progressbar :current-view="currentView"  :progress="progress"
                   :view-styles="viewStyles"/>


      <div v-if="!gameStarted" class="flex-grow flex my-8 flex-col items-center justify-between ">
        <h1 class="text-4xl font-bold"> 🚀 Challenge Your Knowledge! 🚀 <br> <span
            class="text-neutral-600 font-semibold text-2xl">Quiz Time</span>
        </h1>
        <p class="leading-relaxed text-lg text-neutral-600">
          Buckle up for
          <strong>{{ totalQuestions }}</strong>
          exciting questions that will put your knowledge to the test.
          <br>
          Remember, no peeking – let's see how well you know your stuff! 🧠💻. <br/>
        </p>
        <div class="flex text-neutral-600 flex-col items-center gap-1">
          Are you ready? Let's dive in! 🚀🌐

          <button
              class="gamifiedButton w-40 text-xl"
              @click="startGame"
          >
            Start Quiz
          </button>
        </div>
      </div>
      <div v-if="gameStarted" class="flex-grow flex  my-8 flex-col justify-between">
        <div v-if="!showResult" class="">
          <h2 class="text-3xl my-2 !text-neutral-700">
            Question <strong>{{ currentQuestionIndex[currentView] + 1 }}</strong> of
            <strong>{{ questionsPrRound }}</strong>
          </h2>
          <hr/>
          <QuestionAll
              :question="currentQuestion"
              @answer="answerQuestion"
          />
        </div>
        <div v-if="showResult" class="space-y-4 my-6 flex-grow flex flex-col h-full justify-between ">
          <p class="gamifiedh1">️ Well done!
          </p>
          <div v-for="(evaluation, category) in evaluations" :key="evaluation">
            <div>
              <p class="text-xl" :class="'text-' + viewStyles[currentView].color + '-500'">
              <span v-if="category === 'Social Science'" class="">
                🧠 Social Science: <strong>{{ evaluation.correctAnswers }} Correct Answers! </strong>
              </span>
                <span v-if="category === 'Natural Science' " class="">
                🌿 Natural Science:  <strong>{{ evaluation.correctAnswers }}
 Correct Answers!</strong>

              </span>
                <span v-if="category === 'Humanities' " class="">
📜 Humanities:  <strong>{{ evaluation.correctAnswers }} Correct Answers!</strong>


              </span>
                <!--              {{ category }}: {{ evaluation.correctAnswers }} correct-->
                <!--              answers-->
              </p>
            </div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <p class="text-md">🙌 Thank you for playing and embracing the adventure of knowledge!🌍</p>
            <button class="gamifiedButton"
                    @click="resetGame"
            >
              Return to homepage
            </button>
          </div>
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
import Progressbar from "@/components/declarativeKnowledge/Progressbar.vue";

export default {
  name: "DeclarativeKnowledge",
  components: {
    Progressbar,
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
    const totalQuestions = socialScienceQuestions.value.length + naturalScienceQuestions.value.length + humanitiesQuestions.value.length
    const views = [
      'Welcome',
      'Social Science',
      'Natural Science',
      'Humanities',
      'Feedback',
    ]
    const viewStyles = {
      'Welcome': {color: 'gray-500', image: StarIcon},
      'Social Science': {color: 'red-500', image: StarIcon},
      'Natural Science': {color: 'blue-500', image: StarIcon},
      'Humanities': {color: 'yellow-500', image: StarIcon},
      'Feedback': {color: 'gray-500', image: StarIcon},
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
      const totalProgress = Math.min((viewIndex * 25) + 3 + (answeredQuestions / totalQuestions * 20), 100)
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

