<template>
  <PanumNavigation/>
  <!-- Start -->
  <div
      class="mentalSpeed focus:outline-none overflow-hidden "
      tabindex="0"
      ref="game"
      @keydown.left="next('left')"
      @keydown.right="next('right')"

  >
    <div
        class="WelcomePage container mx-auto flex h-full justify-between flex-col items-center !k1:mx-12 fadeInAnimation my-10
        backdrop-blur-2xl backdrop-brightness-125
      rounded-3xl  "
    >
      <Progressbar :current-view="adjustedCurrentView"  :progress="progress"
                   :view-styles="viewStyles"/>
      <div
          v-if="view === 'Welcome'"
          class="title flex flex-col justify-evenly items-center h-full">
        <h1 class="gamifiedh1 text-center py-16">
          Mental speed game!
        </h1>
        <p class="text-center w-1/2 text-xl">
          You will play a <b>search minigame</b> and a <b>comparison minigame</b>.
          In both games, you have to answer as fast as you can.
          You will use the left and right arrow keys to respond.
        </p>

        <img src="../assets/mental.png" height="150" width="150" class="my-8 "/>

        <button
            class="gamifiedButton"
            @click="next"
        >
          Go to search game
        </button>

      </div>

      <div
          v-if="view === 'Search TrialIntro'"
          class="introPage container mx-auto flex flex-col items-center fadeInAnimation"
      >
        <h2 class="gamifiedh1 pt-16">
          Search minigame trial
        </h2>
        <p class="text-xl text-center mb-2 text-gray-600 pb-16">Welcome to the search minigame!</p>
        <p class="text-xl text-center ">
          A symbol (letter or number) will appear on your screen.</p>
        <p class="text-xl text-center ">
          Using the left or right arrow key, you have to choose the
          <br> option that matches the symbol. Remember to be fast!
        </p>
        <p class="text-xl text-center ">
          You will first have a short trial run to practice
        </p>
        <p class="text-xl text-center mt-6">Good luck and have fun</p>
        <div class="flex flex-col">

          <p class="text-center mt-10 mb-2">
            Press left or right arrow key to begin trial round
          </p>
          <div class="flex justify-between gap-x-8 mb-14">
            <button
                class="gamifiedButtonMentalSpeedGreen"
                @click="next"
            >
              <chevronIcon class="w-8 rotate-180"/>
            </button>
            <button
                class="gamifiedButtonMentalSpeedRed"
                @click="next"
            >
              <chevronIcon class="w-8"/>
            </button>
          </div>
        </div>
      </div>
      <div v-if="view === 'Search Trial'" class="GamePage SelectedTask taskBox">
        <div class="flex flex-col items-center justify-center pt-12 pb-6">
          <h1 class="text-4xl mb-14">
            Question:  {{ currentTaskQuestion.index + 1 }}
          </h1>
          <div
              class="w-44 h-24 border-2 rounded-xl border-black flex items-center justify-center bg-white"
          >
            <p class="text-xl font-medium">
              {{ currentTaskQuestion.viewBox }}
              <span v-if="currentTaskQuestion.index > 11" class="ml-8">{{
                  currentTaskQuestion.viewBox2
                }}</span>
            </p>
          </div>
          <div class="buttons flex space-x-8 justify-center mt-14">
            <div class="text-center">
              <p class="mb-4 text-xl font-medium">
                {{ currentTaskQuestion.btnLeft }}
              </p>
              <button
                  @click="next('equals')"
                  class="gamifiedButtonMentalSpeedGreen"
              >
                <chevronIcon class="w-8 rotate-180"/>
              </button>
            </div>
            <div class="text-center">
              <p class="mb-4 text-xl font-medium">
                {{ currentTaskQuestion.btnRight }}
              </p>



              <button
                  @click="next('notEquals')"
                  class="gamifiedButtonMentalSpeedRed "
              >
                <chevronIcon class="w-8"/>
              </button>
            </div>
          </div>
            <div class="p-4 text-red-500 opacity-0"  :class="{'opacity-100' : isFalse }" >
              Wrong answer try again
            </div>
        </div>
      </div>
      <div
          v-if="view === 'SearchIntro'"
          class="introPage container mx-auto flex flex-col items-center fadeInAnimation"
      >
        <h2 class="gamifiedh1 text-center py-10 ">
          Well done!        </h2>
        <p class="text-xl text-center mt-6">Now the real challenge will begin</p>
        <p class="text-xl text-center mt-6">Good luck and have fun</p>
        <div class="flex flex-col">

          <p class="text-center mt-10 mb-2">
            Press left or right arrow key to begin
          </p>
          <div class="flex space-x-8 justify-center mb-14">
            <button
                class="gamifiedButtonMentalSpeedGreen"
                @click="next"
            >
              <chevronIcon class="w-8 rotate-180"/>
            </button>
            <button
                class="gamifiedButtonMentalSpeedRed"
                @click="next"
            >
              <chevronIcon class="w-8"/>
            </button>
          </div>
        </div>
      </div>
      <div v-if="view === 'Search'" class="GamePage SelectedTask taskBox">
        <div class="flex flex-col items-center justify-center pt-12 pb-6">
          <h1 class="text-4xl mb-14">
            Question:  {{ currentTaskQuestion.index - 1 }}
          </h1>
          <div
              class="w-44 h-24 border-2 rounded-xl border-black flex items-center justify-center bg-white"
          >
            <p class="text-xl font-medium">
              {{ currentTaskQuestion.viewBox }}
              <span v-if="currentTaskQuestion.index > 11" class="ml-8">{{
                  currentTaskQuestion.viewBox2
                }}</span>
            </p>
          </div>
          <div class="buttons justify-center flex space-x-8 my-14">
            <div class="text-center">
              <p class="mb-4 text-xl font-medium">
                {{ currentTaskQuestion.btnLeft }}
              </p>
              <button
                  @click="next('equals')"
                  class="gamifiedButtonMentalSpeedGreen"
              >
                <chevronIcon class="w-8 rotate-180"/>
              </button>
            </div>
            <div class="text-center">
              <p class="mb-4 text-xl font-medium">
                {{ currentTaskQuestion.btnRight }}
              </p>
              <button
                  @click="next('notEquals')"
                  class="gamifiedButtonMentalSpeedRed"
              >
                <chevronIcon class="w-8"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
          v-if="view === 'Comparison TrialIntro'"
          class="title flex flex-col justify-evenly items-center h-full ">
        <h1 class=" gamifiedh1 text-center py-12">
          Comparison task trial
        </h1>
        <p class="text-center w-1/2 text-lg">
          Now you will be shown a pair of 3 stimuli on the screen, which are again
          either numbers, letters or symbols. You just have to indicate whether
          they are the same or different from each other. Remember to be fast!
        </p>
        <p class="text-lg">The first 2 rounds are trials again.</p>
        <p class="text-lg">Good luck and have fun!</p>
        <div class="flex flex-col">
          <p class="text-center mt-10 mb-2">
            Press left or right arrow key to continue
          </p>
          <div class="flex space-x-8 justify-center">
            <button
                @click="next"
                class="gamifiedButtonMentalSpeedGreen"
            >
              <chevronIcon class="w-8 rotate-180"/>
            </button>
            <button
                @click="next"
                class="gamifiedButtonMentalSpeedRed"
            >
              <chevronIcon class="w-8"/>
            </button>
          </div>
        </div>
      </div>
      <div v-if="view === 'Comparison Trial'" class="GamePage SelectedTask taskBox">
        <div class="flex flex-col items-center justify-center pt-12 pb-6">
          <h1 class="text-4xl mb-14">
            Question:  {{ currentTaskQuestion.index - 11 }}
          </h1>
          <div
              class="w-44 h-24 border-2 rounded-xl border-black flex items-center justify-center bg-white"
          >
            <p class="text-xl font-medium">
              {{ currentTaskQuestion.viewBox }}
              <span v-if="currentTaskQuestion.index > 11" class="ml-8">{{
                  currentTaskQuestion.viewBox2
                }}</span>
            </p>
          </div>
          <div class="buttons justify-center flex space-x-8 mt-14">
            <div class="text-center">
              <p class="mb-4 text-xl font-medium">
                {{ currentTaskQuestion.btnLeft }}
              </p>
              <button
                  @click="next('different')"
                  class="gamifiedButtonMentalSpeedGreen"
              >
                <chevronIcon class="w-8 rotate-180"/>
              </button>
            </div>
            <div class="text-center">
              <p class="mb-4 text-xl font-medium">
                {{ currentTaskQuestion.btnRight }}
              </p>
              <button
                  @click="next('same')"
                  class="gamifiedButtonMentalSpeedRed"
              >
                <chevronIcon class="w-8"/>
              </button>
            </div>
          </div>
          <div class="p-4 text-red-500 opacity-0"  :class="{'opacity-100' : isFalse }" >
            Wrong answer try again
          </div>
        </div>
      </div>
      <div
          v-if="view === 'ComparisonIntro'"
          class="title flex flex-col justify-evenly items-center h-full py-20 gap-6">
        <h1 class="gamifiedh1 text-center">
          Good Job!
        </h1>
        <p class="text-xl text-center mt-6">Now the real challenge will begin</p>
        <p class="text-lg">Good luck and have fun!</p>
        <div class="flex flex-col">
          <p class="text-center mt-10 mb-2">
            Press left or right arrow key to continue
          </p>
          <div class="flex space-x-8 justify-center">
            <button
                @click="next"
                class="gamifiedButtonMentalSpeedGreen"
            >
              <chevronIcon class="w-8 rotate-180"/>
            </button>
            <button
                @click="next"
                class="gamifiedButtonMentalSpeedRed"
            >
              <chevronIcon class="w-8"/>
            </button>
          </div>
        </div>
      </div>
      <div v-if="view === 'Comparison'" class="GamePage SelectedTask taskBox">
        <div class="flex flex-col items-center justify-center pt-12 pb-6">
          <h1 class="text-4xl mb-14">
            Question: {{ currentTaskQuestion.index - 3 }}
          </h1>
          <div
              class="w-44 h-24 border-2 rounded-xl border-black flex items-center justify-center bg-white"
          >
            <p class="text-xl font-medium">
              {{ currentTaskQuestion.viewBox }}
              <span v-if="currentTaskQuestion.index > 11" class="ml-8">{{
                  currentTaskQuestion.viewBox2
                }}</span>
            </p>
          </div>
          <div class="buttons justify-center flex space-x-8 my-14">
            <div class="text-center">
              <p class="mb-4 text-xl font-medium">
                {{ currentTaskQuestion.btnLeft }}
              </p>
              <button
                  @click="next('different')"
                  class="gamifiedButtonMentalSpeedGreen"
              >
                <chevronIcon class="w-8 rotate-180"/>
              </button>
            </div>
            <div class="text-center">
              <p class="mb-4 text-xl font-medium">
                {{ currentTaskQuestion.btnRight }}
              </p>
              <button
                  @click="next('same')"
                  class="gamifiedButtonMentalSpeedRed"
              >
                <chevronIcon class="w-8"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Game End -->
      <div
          v-if="view === 'Feedback'"
          class="GameEnd container mx-auto flex flex-col items-center pt-12 pb-6 fadeInAnimation"
      >
        <div class="title flex flex-col justify-evenly items-center h-full py-20 ">
          <h1 class="gamifiedh1 text-center flex">
            Thank you for playing!
          </h1>
          <p class="text-3xl mx-4 my-12">You have completed the game. Well done!</p>
          <p class="text-2xl font-semibold">Search minigame: {{SearchEvaluation.correctAnswers}} of 10 were correct!</p>
          <p class="text-2xl font-semibold">Comparison minigame: {{ComparisonEvaluation.correctAnswers}} of 10 were correct!</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mentalSpeed from "@/mentalSpeed.json";
import {computed, onMounted, reactive, ref, watch, watchEffect} from "vue";

import Progressbar from "@/components/declarativeKnowledge/Progressbar.vue";
import chevronIcon from "@/components/Icons/chevronIcon.vue";
import {launchConfetti} from "@/confettiJs/confetti";
import PanumNavigation from "@/components/PanumNavigation.vue";
import StarIcon from "@/components/declarativeKnowledge/icons/StarIcon.vue";

export default {
  components: {chevronIcon, PanumNavigation, Progressbar},
  setup() {
    const game = ref(null);
    const task = reactive(mentalSpeed);

    const views = [
      'Welcome',
      'Search TrialIntro',
      'Search Trial',
      'SearchIntro',
      'Search',
      'Comparison TrialIntro',
      'Comparison Trial',
      'ComparisonIntro',
      'Comparison',
      'Feedback'
    ]

    const currentView = ref(views[0])
    const SearchEvaluation = ref({correctAnswers: 0})
    const ComparisonEvaluation = ref({correctAnswers: 0})
    const isFalse = ref(false)

    const adjustedCurrentView = computed(() => {
      if (currentView.value.endsWith('Intro')) {
        // If the current view is an intro, return the corresponding base view without the "Intro" suffix
        return currentView.value.replace('Intro', '');
      } else {
        // If the current view is not an intro, return the current view as it is
        return currentView.value;
      }
    });
    const loadNextTask = () => {
      currentTask.value++
      currentTaskQuestion.value = task[currentTask.value]
      if (currentTask.value === 2) currentView.value = 'SearchIntro'
      if (currentTask.value === 12) currentView.value = 'Comparison TrialIntro'
      if (currentTask.value === 14) currentView.value = 'ComparisonIntro'
      else if (currentTask.value === task.length ) currentView.value = 'Feedback'
    }

    const viewStyles = {
      'Welcome': { color: 'gray-500', image: StarIcon },
      'Search Trial': { color: 'red-500', image: StarIcon },
      'Search': { color: 'blue-500', image: StarIcon },
      'Comparison Trial': { color: 'yellow-500', image: StarIcon },
      'Comparison': { color: 'blue-500', image: StarIcon },
      'Feedback': { color: 'gray-500', image: StarIcon },
    };

    const progress = computed(() => {
      const currentViewIndex = views.indexOf(currentView.value);
      const completedViews = views.slice(0, currentViewIndex);
      let completedProgress = 0;
      for (const view of completedViews) {
        const viewStyle = viewStyles[view];
        if (viewStyle) {
          completedProgress += 20;
        }
      }
      const totalProgress = Math.min(completedProgress, 100);
      return totalProgress;
    });

    const onGame1Answer = answer => {
      answer = answer === 'left' ? 'equals' : 'notEquals'
      const question = currentTaskQuestion.value;

      console.log(33, question, answer)
      const {btnLeft, viewBox} = question
      const answerIsCorrect = viewBox === btnLeft && answer === 'equals'
          || viewBox !== btnLeft && answer === 'notEquals'

      if (answerIsCorrect) SearchEvaluation.value.correctAnswers++
      loadNextTask()
    }
    const loadSameTask = () => {
      currentTaskQuestion.value = task[currentTask.value]
      isFalse.value = true;
    }
    const onGame1TrialAnswer = answer => {
      answer = answer === 'left' ? 'equals' : 'notEquals'
      const question = currentTaskQuestion.value;

      const {btnLeft, viewBox} = question
      const answerIsCorrect = viewBox === btnLeft && answer === 'equals'
          || viewBox !== btnLeft && answer === 'notEquals'

      if (!answerIsCorrect) loadSameTask()
      else if (answerIsCorrect) loadNextTask()
    }

    const onGame2Answer = answer => {
      answer = answer === 'left' ? 'same' : 'different'
      const question = currentTaskQuestion.value

      const {viewBox, viewBox2} = question

      const answerIsCorrect = viewBox === viewBox2 && answer === 'same'
          || viewBox !== viewBox2 && answer === 'different'

      if (answerIsCorrect) ComparisonEvaluation.value.correctAnswers++
      loadNextTask()
    }
    const onGame2TrialAnswer = answer => {
      answer = answer === 'left' ? 'same' : 'different'
      const question = currentTaskQuestion.value

      const {viewBox, viewBox2} = question

      const answerIsCorrect = viewBox === viewBox2 && answer === 'same'
          || viewBox !== viewBox2 && answer === 'different'

      if (!answerIsCorrect) loadSameTask()
      else if (answerIsCorrect) loadNextTask()
    }
    const next = answer => {
      const currentIndex = views.indexOf(currentView.value || views[0])
      if (currentIndex === views.length - 1) return
      if (currentView.value === 'Search Trial') onGame1TrialAnswer(answer)
      else if (currentView.value === 'Search') onGame1Answer(answer)
      else if (currentView.value === 'Comparison Trial') onGame2TrialAnswer(answer)
      else if (currentView.value === 'Comparison') onGame2Answer(answer)
      else currentView.value = views[currentIndex + 1]
    }


    watch(isFalse, (newValue) => {
      if (newValue !== null) {
        setTimeout(() => {
          isFalse.value = false;
        }, 1000); // Change the time delay as needed (in milliseconds)
      }
    });


    const currentTask = ref(0);
    const currentTaskQuestion = ref(task[currentTask.value]);

    onMounted(() => game.value.focus())

    watchEffect(() => {
      if (currentView.value === 'Feedback') {
        launchConfetti();
      }
    })

    return {
      currentTaskQuestion,
      game,
      viewStyles,
      progress,
      SearchEvaluation,
      ComparisonEvaluation,
      next,
      view: currentView,
      adjustedCurrentView,
      isFalse,
    };
  },
};
</script>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeInAnimation {
  animation: fadeIn 1s ease-in-out;
}

@keyframes slide-in {
  from {
    transform: translateY(100%);
    opacity: 0.25;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
}

.taskBox {
  animation: slide-in 500ms;
  animation-fill-mode: backwards;
}
</style>
