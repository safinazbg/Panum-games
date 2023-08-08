<template>
  <PanumNavigation />
  <!-- Start -->
  <div
    v-if="isWelcome"
    class="WelcomePage container mx-auto flex flex-col items-center h-screen fadeInAnimation"
  >
    <div class="title flex flex-col justify-evenly items-center h-full py-20">
      <h1 class="text-[min(10vw,3.75rem)] text-center">Mental Speed Test</h1>
      <p>Some welcome message/explenation</p>
      <div class="flex flex-col">
        <p class="text-center mb-14">
          Press left or right arrow key to continue
        </p>
        <div class="flex space-x-8">
          <button
            @click="startTest"
            class="bg-green-500 px-16 py-4 border-4 border-black rounded-xl hover:bg-green-400 duration-150 ease-linear"
          >
            <chevronIcon class="w-8 rotate-180" />
          </button>
          <button
            @click="startTest"
            class="bg-red-500 px-16 py-4 border-4 border-black rounded-xl hover:bg-red-600 duration-150 ease-linear"
          >
            <chevronIcon class="w-8" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Game -->
  <div v-if="isGameStart" class="GamePage SelectedTask taskBox">
    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-4xl mb-14">
        {{ currentTaskQuestion.textName }} {{ currentTaskQuestion.index + 1 }}
      </h1>
      <div
        class="w-44 h-24 border-2 rounded-xl border-black flex items-center justify-center"
      >
        <p class="text-xl font-medium">{{ currentTaskQuestion.viewBox }}</p>
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
            <chevronIcon class="w-8 rotate-180" />
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
            <chevronIcon class="w-8" />
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
        Tank you for playing !
      </h1>
      <p>You can now continue the comparison task</p>
      <div class="flex flex-col">
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
      </div>
    </div>
  </div>
</template>

<script>
import mentalSpeed from "@/mentalSpeed.json";
import { reactive, ref, watchEffect } from "vue";

import chevronIcon from "@/components/Icons/chevronIcon.vue";
import { launchConfetti } from "@/confettiJs/confetti";
import PanumNavigation from "@/components/PanumNavigation.vue";

export default {
  components: { chevronIcon, PanumNavigation },
  setup() {
    const isWelcome = ref(true);
    const isGameStart = ref(false);
    const isGameComplated = ref(false);
    const task = reactive(mentalSpeed);
    const taskLength = task.length;
    const currentTask = ref(0);
    const currentTaskQuestion = ref(task[currentTask.value]);

    const startTest = () => {
      isWelcome.value = false;
      isGameStart.value = true;
    };

    const nextTask = () => {
      if (currentTask.value < taskLength - 1) {
        currentTask.value++;
      } else {
        isGameStart.value = false;
        isGameComplated.value = true;
      }

      currentTaskQuestion.value = task[currentTask.value];
    };

    const resetTest = () => {
      currentTask.value = 0;
      currentTaskQuestion.value = task[currentTask.value];
      isGameComplated.value = false;
      isWelcome.value = true;
      isGameStart.value = false;
    };

    watchEffect(() => {
      if (isGameComplated.value) {
        launchConfetti();
      }
    });

    return {
      isGameComplated,
      isWelcome,
      startTest,
      nextTask,
      resetTest,
      currentTaskQuestion,
      isGameStart,
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
