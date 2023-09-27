<template>
  <PanumNavigation/>
  <!-- Start -->
  <div
      class="mentalSpeed"
      tabindex="0"
      ref="game"
      @keydown.left="onLeft"
      @keydown.right="onRight"
  >
    <div
        class="WelcomePage container mx-auto flex flex-col items-center h-screen fadeInAnimation"
    >
      <div
          v-if="isWelcome"
          class="title flex flex-col justify-evenly items-center h-full py-20">
        <h1 class="text-4xl text-center">
          Welcome to the Mental speed game!
        </h1>
        <p class="text-center w-1/2 text-lg">
          You will play a <b>search minigame</b> and a <b>comparison minigame</b>.
          In both games, you have to answer as fast as you can.
          You will use the left and right arrow keys to respond.
        </p>

        <img src="../assets/mental.png" height="200" width="200"/>

        <p class="text-lg">
          Click the button to go to the instructions for the first game.
        </p>
        <button
            class="bg-gray-300 px-4 py-6 text-lg border-2 border-gray-800 rounded-md my-10 hover:bg-gray-400 ease-in-out duration-300"
            @click="goToGame"
        >
          Go to search game
        </button>

      </div>

      <div
          v-if="isIntroduction"
          class="introPage container mx-auto flex flex-col items-center h-screen fadeInAnimation"
      >
        <h2 class="text-2xl text-center">
          Search minigame
        </h2>
        <p class="text-lg">Welcome to the search minigame!
          A symbol (letter or number) will appear on your screen.
          Using the left or right arrow key, you have to choose
          the option that matches the symbol. Remember to be fast!
        </p>
        <p class="text-lg">Good luck and have fun</p>
        <div class="flex flex-col">
          <p class="text-center mb-14">
            Press left or right arrow key to begin
          </p>
          <div class="flex space-x-8">
            <button
                class="bg-green-500 px-16 py-4 border-4 border-black rounded-xl hover:bg-green-400 duration-150 ease-linear"
                @click="startTest"
            >
              <chevronIcon class="w-8 rotate-180"/>
            </button>
            <button
                class="bg-red-500 px-16 py-4 border-4 border-black rounded-xl hover:bg-red-600 duration-150 ease-linear"
                @click="startTest"
            >
              <chevronIcon class="w-8"/>
            </button>
          </div>
        </div>
      </div>

      <div
          v-if="page2"
          class="title flex flex-col justify-evenly items-center h-full py-20 text-center"
      >
        <h1 class="text-[min(10vw,3.75rem)] text-center">
          Level 1 - Search task
        </h1>
        <p class="w-1/2 text-lg">
          Now you will be shown a single stimulus on the screen, which are either
          numbers, letters or symbols. You just have to choose which given choice
          best matches them. Remember to be fast!
        </p>
        <p class="text-lg">The first 2 rounds are trials.</p>
        <p class="text-lg">Good luck and have fun!</p>
        <div class="flex flex-col">
          <p class="text-center mb-14">
            Press left or right arrow key to continue
          </p>
          <div class="flex space-x-8">
            <button
                @click="Level1Start"
                class="bg-green-500 px-16 py-4 border-4 border-black rounded-xl hover:bg-green-400 duration-150 ease-linear"
            >
              <chevronIcon class="w-8 rotate-180"/>
            </button>
            <button
                @click="Level1Start"
                class="bg-red-500 px-16 py-4 border-4 border-black rounded-xl hover:bg-red-600 duration-150 ease-linear"
            >
              <chevronIcon class="w-8"/>
            </button>
          </div>
        </div>
      </div>
      <div
          v-if="level2"
          class="title flex flex-col justify-evenly items-center h-full py-20">
        <h1 class="text-[min(10vw,3.75rem)] text-center">
          Level 2 - Comparison task
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
                @click="Level1Start"
                class="bg-green-500 px-16 py-4 border-4 border-black rounded-xl hover:bg-green-400 duration-150 ease-linear"
            >
              <chevronIcon class="w-8 rotate-180"/>
            </button>
            <button
                @click="Level1Start"
                class="bg-red-500 px-16 py-4 border-4 border-black rounded-xl hover:bg-red-600 duration-150 ease-linear"
            >
              <chevronIcon class="w-8"/>
            </button>
          </div>
        </div>
      </div>

      <div v-if="isGameStart" class="GamePage SelectedTask taskBox">
        <div class="flex flex-col items-center justify-center h-screen">
          <h1 class="text-4xl mb-14">
            {{ currentTaskQuestion.textName }} {{ currentTaskQuestion.index + 1 }}
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
                  @click="nextTask"
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
                  @click="nextTask"
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
          v-if="isGameComplated"
          class="GameEnd container mx-auto flex flex-col items-center h-screen fadeInAnimation"
      >
        <div class="title flex flex-col justify-evenly items-center h-full py-20">
          <h1 class="text-[min(10vw,3.75rem)] text-center flex">
            Thank you for playing!
          </h1>
          <p class="text-3xl mx-4">You have completed the game. Well done!</p>
          <!-- <div class="flex flex-col">
            <p class="text-center mb-14 animate-pulse">
              Press left or right arrow key to continue
            </p>
            <div class="flex space-x-8">
              <button
                @click="resetTest"
                class="bg-green-500 px-16 py-4 border-4 border-black rounded-xl hover:bg-green-400 duration-150 ease-linear"
              >
                <chevronIcon class="w-8 rotate-180" />
              </button>
              <button
                @click="resetTest"
                class="bg-red-500 px-16 py-4 border-4 border-black rounded-xl hover:bg-red-600 duration-150 ease-linear"
              >
                <chevronIcon class="w-8" />
              </button>
            </div>
          </div> -->
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
    const isIntroduction = ref(false);
    const isWelcome = ref(true);
    const isGameStart = ref(false);
    const isGameCompleted = ref(false);
    const page2 = ref(false);
    const level2 = ref(false);
    const task = reactive(mentalSpeed);
    const taskLength = task.length;
    const currentTask = ref(0);
    const currentTaskQuestion = ref(task[currentTask.value]);

    onMounted(() => {
      game.value.focus();
    });

    const goToGame = () => {
      isWelcome.value = false;
      isIntroduction.value = true;
      window.scrollTo(0, 0)
    };
    const startTest = () => {
      isIntroduction.value = false;
      page2.value = true;
      // isGameStart.value = true;
    };

    const Level1Start = () => {
      page2.value = false;
      level2.value = false;
      isGameStart.value = true;
    };
    // const nextTask = () => {
    //   if (currentTask.value < taskLength - 1) {
    //     currentTask.value++;
    //   } else {
    //     isGameStart.value = false;
    //     isGameComplated.value = true;
    //   }

    //   currentTaskQuestion.value = task[currentTask.value];
    // };
    const nextTask = () => {
      if (currentTask.value < taskLength - 1) {
        currentTask.value++;
        if (currentTask.value >= 10) {
          level2.value = true;
          isGameStart.value = false;
          if (currentTask.value >= 11) {
            level2.value = false;
            isGameStart.value = true;
          }
          currentTaskQuestion.value = task[currentTask.value + 1];
        }
      } else if (currentTask.value >= 11) {
        isGameStart.value = false;
        isGameCompleted.value = true;
      }
      currentTaskQuestion.value = task[currentTask.value];
    };

    // const resetTest = () => {
    //   currentTask.value = 0;
    //   currentTaskQuestion.value = task[currentTask.value];
    //   isGameComplated.value = false;
    //   isWelcome.value = true;
    //   isGameStart.value = false;
    // };

    watchEffect(() => {
      if (isGameCompleted.value) {
        launchConfetti();
      }
    });

    const onLeft = () => {
      if (isWelcome.value) {
        startTest();
      } else if (isGameStart.value) {
        nextTask();
      } else if (level2.value || page2.value) {
        Level1Start()
      }
    }
    const onRight = () => {
      if (isWelcome.value) {
        startTest();
      } else if (isGameStart.value) {
        nextTask();
      } else if (level2.value || page2.value) {
        Level1Start();
      }
    }


    return {
      isIntroduction,
      game,
      isGameComplated: isGameCompleted,
      isWelcome,
      startTest,
      nextTask,
      // resetTest,
      currentTaskQuestion,
      isGameStart,
      page2,
      Level1Start,
      level2,
      onLeft,
      onRight,
      goToGame
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
