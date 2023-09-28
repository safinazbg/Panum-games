<template>
  <PanumNavigation/>
  <!-- Start -->
  <div
      class="mentalSpeed"
      tabindex="0"
      ref="game"
      @keydown.left="next('left')"
      @keydown.right="next('right')"
  >
    <div
        class="WelcomePage container mx-auto flex flex-col items-center h-4/6 fadeInAnimation my-10
        backdrop-blur-2xl backdrop-brightness-125
      rounded-3xl shadow-gray-600 shadow-md"
    >
      <div
          v-if="view === 'welcome'"
          class="title flex flex-col justify-evenly items-center h-full">
        <h1 class="text-4xl text-center py-16">
          Welcome to the Mental speed game!
        </h1>
        <p class="text-center w-1/2 text-xl">
          You will play a <b>search minigame</b> and a <b>comparison minigame</b>.
          In both games, you have to answer as fast as you can.
          You will use the left and right arrow keys to respond.
        </p>

        <img src="../assets/mental.png" height="150" width="150" class="my-8"/>

        <p class="text-lg">
          Click the button to go to the instructions for the first game.
        </p>
        <button
            class="bg-gray-300 px-4 py-6 text-lg bo rder-2 border-gray-800 rounded-md my-10 hover:bg-gray-400 ease-in-out duration-300"
            @click="next"
        >
          Go to search game
        </button>

      </div>

      <div
          v-if="view === 'game1Intro'"
          class="introPage container mx-auto flex flex-col items-center fadeInAnimation"
      >
        <h2 class="text-3xl font-semibold text-center py-10">
          Search minigame
        </h2>
        <p class="text-xl text-center mb-2">Welcome to the search minigame!</p>
        <p class="text-xl text-center ">
          A symbol (letter or number) will appear on your screen.</p>
        <p class="text-xl text-center ">
          Using the left or right arrow key, you have to choose the
          <br> option that matches the symbol. Remember to be fast!
        </p>
        <p class="text-xl text-center mt-6">Good luck and have fun</p>
        <div class="flex flex-col">
          <p class="text-xl text-center mb-10">
            Press left or right arrow key to begin
          </p>
          <div class="flex space-x-8 my-14">
            <button
                class="bg-green-500 px-16 py-4 border-4 border-black rounded-xl hover:bg-green-400 duration-150 ease-linear"
                @click="next"
            >
              <chevronIcon class="w-8 rotate-180"/>
            </button>
            <button
                class="bg-red-500 px-16 py-4 border-4 border-black rounded-xl hover:bg-red-600 duration-150 ease-linear"
                @click="next"
            >
              <chevronIcon class="w-8"/>
            </button>
          </div>
        </div>
      </div>

      <div v-if="view === 'game1'" class="GamePage SelectedTask taskBox">
        <div class="flex flex-col items-center justify-center h-screen">
          <h1 class="text-4xl mb-14">
            {{ currentTaskQuestion.index + 1 }}
          </h1>
          <div
              class="w-44 h-24 border-2 rounded-xl border-black flex items-center justify-center"
          >
            <p class="text-xl font-medium">
              {{ currentTaskQuestion.viewBox }}
              <span v-if="currentTaskQuestion.index > 9" class="ml-8">{{
                  currentTaskQuestion.viewBox2
                }}</span>
            </p>
          </div>
          <div class="buttons flex space-x-8 mt-14">
            <div class="text-center">
              <p class="mb-4 text-xl font-medium">
                {{ currentTaskQuestion.btnLeft }}
              </p>
              <button
                  @click="next('equals')"
                  class="bg-green-500 px-16 py-4 border-4 border-black rounded-xl hover:bg-green-400 duration-150 ease-linear"
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
                  class="bg-red-500 px-16 py-4 border-4 border-black rounded-xl hover:bg-red-600 duration-150 ease-linear"
              >
                <chevronIcon class="w-8"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
          v-if="view === 'game2Intro'"
          class="title flex flex-col justify-evenly items-center h-full py-20">
        <h1 class="text-[min(10vw,3.75rem)] text-center">
          game 2 - Comparison task
        </h1>
        <p class="text-center w-1/2 text-lg">
          Now you will be shown a pair of 3 stimuli on the screen, which are again
          either numbers, letters or symbols. You just have to indicate whether
          they are the same or different from each other. Remember to be fast!
        </p>
        <p class="text-lg">The first 2 rounds are trials again.</p>
        <p class="text-lg">Good luck and have fun!</p>
        <div class="flex flex-col">
          <p class="text-center mb-14">
            Press left or right arrow key to continue
          </p>
          <div class="flex space-x-8">
            <button
                @click="next"
                class="bg-green-500 px-16 py-4 border-4 border-black rounded-xl hover:bg-green-400 duration-150 ease-linear"
            >
              <chevronIcon class="w-8 rotate-180"/>
            </button>
            <button
                @click="next"
                class="bg-red-500 px-16 py-4 border-4 border-black rounded-xl hover:bg-red-600 duration-150 ease-linear"
            >
              <chevronIcon class="w-8"/>
            </button>
          </div>
        </div>
      </div>
      <div v-if="view === 'game2'" class="GamePage SelectedTask taskBox">
        <div class="flex flex-col items-center justify-center h-screen">
          <h1 class="text-4xl mb-14">
           {{ currentTaskQuestion.index + 1 }}
          </h1>
          <div
              class="w-44 h-24 border-2 rounded-xl border-black flex items-center justify-center"
          >
            <p class="text-xl font-medium">
              {{ currentTaskQuestion.viewBox }}
              <span v-if="currentTaskQuestion.index > 9" class="ml-8">{{
                  currentTaskQuestion.viewBox2
                }}</span>
            </p>
          </div>
          <div class="buttons flex space-x-8 mt-14">
            <div class="text-center">
              <p class="mb-4 text-xl font-medium">
                {{ currentTaskQuestion.btnLeft }}
              </p>
              <button
                  @click="next('different')"
                  class="bg-green-500 px-16 py-4 border-4 border-black rounded-xl hover:bg-green-400 duration-150 ease-linear"
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
                  class="bg-red-500 px-16 py-4 border-4 border-black rounded-xl hover:bg-red-600 duration-150 ease-linear"
              >
                <chevronIcon class="w-8"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Game End -->
      <div
          v-if="view === 'gameCompleted'"
          class="GameEnd container mx-auto flex flex-col items-center h-screen fadeInAnimation"
      >
        <div class="title flex flex-col justify-evenly items-center h-full py-20">
          <h1 class="text-[min(10vw,3.75rem)] text-center flex">
            Thank you for playing!
          </h1>
          <p class="text-3xl mx-4">You have completed the game. Well done!</p>
          <p>Game 1: {{game1Evaluation.correctAnswers}} of 10 were correct!</p>
          <p>Game 2: {{game2Evaluation.correctAnswers}} of 10 were correct!</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mentalSpeed from "@/mentalSpeed.json";
import {onMounted, reactive, ref, watchEffect} from "vue";

import chevronIcon from "@/components/Icons/chevronIcon.vue";
import {launchConfetti} from "@/confettiJs/confetti";
import PanumNavigation from "@/components/PanumNavigation.vue";

export default {
  components: {chevronIcon, PanumNavigation},
  setup() {
    const game = ref(null);
    const task = reactive(mentalSpeed);

    const views = [
      'welcome',
      'game1Intro',
      'game1',
      'game2Intro',
      'game2',
      'gameCompleted'
    ]
    const view = ref(views[0])
    const game1Evaluation = ref({correctAnswers: 0})
    const game2Evaluation = ref({correctAnswers: 0})

    const loadNextTask = () => {
      currentTask.value++
      currentTaskQuestion.value = task[currentTask.value]
      if (currentTask.value === 10) view.value = 'game2Intro'
      else if (currentTask.value === task.length - 1) view.value = 'gameCompleted'
    }

    const onGame1Answer = answer => {
      answer = answer === 'left' ? 'equals' : 'notEquals'
      const question = currentTaskQuestion.value;

      console.log(33, question, answer)
      const {btnLeft, viewBox} = question
      const answerIsCorrect = viewBox === btnLeft && answer === 'equals'
          || viewBox !== btnLeft && answer === 'notEquals'

      if (answerIsCorrect) game1Evaluation.value.correctAnswers++
      loadNextTask()
    }
    const onGame2Answer = answer => {
      answer = answer === 'left' ? 'same' : 'different'
      const question = currentTaskQuestion.value

      const {viewBox, viewBox2} = question

      console.log(33.1, answer)
      const answerIsCorrect = viewBox === viewBox2 && answer === 'same'
          || viewBox !== viewBox2 && answer === 'different'

      if (answerIsCorrect) game2Evaluation.value.correctAnswers++
      loadNextTask()
    }
    const next = answer => {
      const currentIndex = views.indexOf(view.value || views[0])
      if (currentIndex === views.length - 1) return

      if (view.value === 'game1') onGame1Answer(answer)
      else if (view.value === 'game2') onGame2Answer(answer)
      else view.value = views[currentIndex + 1]
      console.log(22, view.value, currentIndex)
    }


    const currentTask = ref(0);
    const currentTaskQuestion = ref(task[currentTask.value]);

    onMounted(() => game.value.focus())

    watchEffect(() => {
      if (view.value === 'gameCompleted') {
        launchConfetti();
      }
    })

    return {
      currentTaskQuestion,
      game,
      game1Evaluation,
      game2Evaluation,
      next,
      view,
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
