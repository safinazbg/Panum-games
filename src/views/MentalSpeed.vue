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
        class="WelcomePage container mx-auto flex flex-col items-center !k1:mx-12 fadeInAnimation my-10
        backdrop-blur-2xl backdrop-brightness-125
      rounded-3xl "
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

        <img src="../assets/mental.png" height="150" width="150" class="my-8 "/>

<!--        <p class="">
          Click the button to go to the instructions for the first game.
        </p>-->
        <button
            class="button w-auto text-lg rounded-md my-10 ease-in-out duration-300"
            @click="next"
        >
          Go to search game
        </button>

      </div>

      <div
          v-if="view === 'trial1Intro'"
          class="introPage container mx-auto flex flex-col items-center fadeInAnimation"
      >
        <h2 class="text-4xl text-center py-10">
          Search minigame trial
        </h2>
        <p class="text-xl text-center mb-2">Welcome to the search minigame!</p>
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
                class="greenButton"
                @click="next"
            >
              <chevronIcon class="w-8 rotate-180"/>
            </button>
            <button
                class="redButton"
                @click="next"
            >
              <chevronIcon class="w-8"/>
            </button>
          </div>
        </div>
      </div>
      <div v-if="view === 'trial1'" class="GamePage SelectedTask taskBox">
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
          <div class="buttons flex space-x-8 mt-14">
            <div class="text-center">
              <p class="mb-4 text-xl font-medium">
                {{ currentTaskQuestion.btnLeft }}
              </p>
              <button
                  @click="next('equals')"
                  class="greenButton"
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
                  class="redButton "
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
          v-if="view === 'game1Intro'"
          class="introPage container mx-auto flex flex-col items-center fadeInAnimation"
      >
        <h2 class="text-3xl font-semibold text-center py-10">
          Well done!        </h2>
        <p class="text-xl text-center mt-6">Now the real challenge will begin</p>
        <p class="text-xl text-center mt-6">Good luck and have fun</p>
        <div class="flex flex-col">

          <p class="text-center mt-10 mb-2">
            Press left or right arrow key to begin
          </p>
          <div class="flex space-x-8 mb-14">
            <button
                class="greenButton"
                @click="next"
            >
              <chevronIcon class="w-8 rotate-180"/>
            </button>
            <button
                class="redButton"
                @click="next"
            >
              <chevronIcon class="w-8"/>
            </button>
          </div>
        </div>
      </div>
      <div v-if="view === 'game1'" class="GamePage SelectedTask taskBox">
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
          <div class="buttons flex space-x-8 my-14">
            <div class="text-center">
              <p class="mb-4 text-xl font-medium">
                {{ currentTaskQuestion.btnLeft }}
              </p>
              <button
                  @click="next('equals')"
                  class="greenButton"
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
                  class="redButton"
              >
                <chevronIcon class="w-8"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
          v-if="view === 'trial2Intro'"
          class="title flex flex-col justify-evenly items-center h-full py-12">
        <h1 class="text-[min(10vw,3.75rem)] text-center">
          Game 2 - Comparison task trial
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
          <div class="flex space-x-8">
            <button
                @click="next"
                class="greenButton"
            >
              <chevronIcon class="w-8 rotate-180"/>
            </button>
            <button
                @click="next"
                class="redButton"
            >
              <chevronIcon class="w-8"/>
            </button>
          </div>
        </div>
      </div>
      <div v-if="view === 'trial2'" class="GamePage SelectedTask taskBox">
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
          <div class="buttons flex space-x-8 mt-14">
            <div class="text-center">
              <p class="mb-4 text-xl font-medium">
                {{ currentTaskQuestion.btnLeft }}
              </p>
              <button
                  @click="next('different')"
                  class="greenButton"
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
                  class="redButton"
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
          v-if="view === 'game2Intro'"
          class="title flex flex-col justify-evenly items-center h-full py-20 gap-6">
        <h1 class="text-[min(10vw,3.75rem)] text-center">
          Good Job!
        </h1>
        <p class="text-xl text-center mt-6">Now the real challenge will begin</p>
        <p class="text-lg">Good luck and have fun!</p>
        <div class="flex flex-col">
          <p class="text-center mt-10 mb-2">
            Press left or right arrow key to continue
          </p>
          <div class="flex space-x-8">
            <button
                @click="next"
                class="greenButton"
            >
              <chevronIcon class="w-8 rotate-180"/>
            </button>
            <button
                @click="next"
                class="redButton"
            >
              <chevronIcon class="w-8"/>
            </button>
          </div>
        </div>
      </div>
      <div v-if="view === 'game2'" class="GamePage SelectedTask taskBox">
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
          <div class="buttons flex space-x-8 my-14">
            <div class="text-center">
              <p class="mb-4 text-xl font-medium">
                {{ currentTaskQuestion.btnLeft }}
              </p>
              <button
                  @click="next('different')"
                  class="greenButton"
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
                  class="redButton"
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
          class="GameEnd container mx-auto flex flex-col items-center pt-12 pb-6 fadeInAnimation"
      >
        <div class="title flex flex-col justify-evenly items-center h-full py-20 ">
          <h1 class="text-[min(10vw,3.75rem)] text-center flex">
            Thank you for playing!
          </h1>
          <p class="text-3xl mx-4 my-12">You have completed the game. Well done!</p>
          <p class="text-2xl font-semibold">Game 1: {{game1Evaluation.correctAnswers}} of 10 were correct!</p>
          <p class="text-2xl font-semibold">Game 2: {{game2Evaluation.correctAnswers}} of 10 were correct!</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mentalSpeed from "@/mentalSpeed.json";
import {onMounted, reactive, ref, watch, watchEffect} from "vue";

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
      'trial1Intro',
      'trial1',
      'game1Intro',
      'game1',
      'trial2Intro',
      'trial2',
      'game2Intro',
      'game2',
      'gameCompleted'
    ]
    const view = ref(views[0])
    const game1Evaluation = ref({correctAnswers: 0})
    const game2Evaluation = ref({correctAnswers: 0})
    const isFalse = ref(false)

    const loadNextTask = () => {
      currentTask.value++
      currentTaskQuestion.value = task[currentTask.value]
      if (currentTask.value === 2) view.value = 'game1Intro'
      if (currentTask.value === 12) view.value = 'trial2Intro'
      if (currentTask.value === 14) view.value = 'game2Intro'
      else if (currentTask.value === task.length ) view.value = 'gameCompleted'
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

      console.log(33.1, answer)
      const answerIsCorrect = viewBox === viewBox2 && answer === 'same'
          || viewBox !== viewBox2 && answer === 'different'

      if (answerIsCorrect) game2Evaluation.value.correctAnswers++
      loadNextTask()
    }
    const onGame2TrialAnswer = answer => {
      answer = answer === 'left' ? 'same' : 'different'
      const question = currentTaskQuestion.value

      const {viewBox, viewBox2} = question

      console.log(33.1, answer)
      const answerIsCorrect = viewBox === viewBox2 && answer === 'same'
          || viewBox !== viewBox2 && answer === 'different'

      if (!answerIsCorrect) loadSameTask()
      else if (answerIsCorrect) loadNextTask()
    }
    const next = answer => {
      const currentIndex = views.indexOf(view.value || views[0])
      if (currentIndex === views.length - 1) return
      if (view.value === 'trial1') onGame1TrialAnswer(answer)
      else if (view.value === 'game1') onGame1Answer(answer)
      else if (view.value === 'trial2') onGame2TrialAnswer(answer)
      else if (view.value === 'game2') onGame2Answer(answer)
      else view.value = views[currentIndex + 1]
      console.log(22, view.value, currentIndex)
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
.button{
  @apply
   px-16 py-4 border-4 border-black rounded-xl duration-150 ease-linear
}
.redButton{
  @apply
  button
  bg-red-500
  hover:bg-red-600
}
.greenButton{
  @apply
  button
  bg-green-500
  hover:bg-green-600
}

</style>
