<template>
  <PanumNavigation></PanumNavigation>
  <IntroductionModal :show="!tutorialStarted && !gameStarted" @start="startTutorial"/>
  <div class="w-full flex justify-center ">
    <ProgressbarItem :current-view="currentView" :is-view-reached="currentViewIndex" :progress="progress"
                              :view-styles="viewStyles"/>
  </div>

  <div class="" v-if="!gameStarted" :class="{ 'blur-xl': !tutorialStarted }">
    <TutorialGame @tutorialEnd="showGameModal"/>
  </div>
<!--  <div class="absolute inset-0 button h-fit" @click="showGameModal">Skip turorial</div>-->
<!--  <div class="absolute top-12 button bg-blue-500 h-fit" @click="endGame">Skip level4</div>-->

  <GameModal :show="isShowGameModal" @start="startGame"/>
  <div v-if="gameStarted" :class="{ 'blur-xl': isShowGameModal || isEndGame  }">
    <MemoryGameGrid @end="endGame" @levelUp="levelUp"/>
  </div>
  <DoneGameModal :totalPoints="totalScoreFromChild" :show="isEndGame"/>
</template>

<script>

import MemoryGameGrid from "@/components/workingMemory/MemoryGameGrid.vue";
import IntroductionModal from "@/components/workingMemory/IntroductionModal.vue";
import {computed, ref, watch} from "vue";
import TutorialGame from "@/components/workingMemory/Tutorial.vue";
import GameModal from "@/components/workingMemory/GameModal.vue";
import DoneGameModal from "@/components/workingMemory/DoneGameModal.vue";
import PanumNavigation from "@/components/PanumNavigation.vue";
import StarIcon from "@/components/declarativeKnowledge/icons/StarIcon.vue";
import ProgressbarItem from "@/components/declarativeKnowledge/Progressbar.vue";

export default {
  name: 'WorkingMemoryGame',
  components: {
    ProgressbarItem,
    DoneGameModal,
    GameModal,
    TutorialGame,
    IntroductionModal,
    MemoryGameGrid,
    PanumNavigation
  },
  setup() {
    const gameStarted = ref(false);
    const tutorialStarted = ref(false);
    const isShowGameModal = ref(false);
    const isEndGame = ref(false);
    const totalScoreFromChild = ref(0)
    const currentLevel = ref(1)

    const startTutorial = () => {
      tutorialStarted.value = true;
    }

    const levelUp = (level) => {
      currentLevel.value = level +1
    }
    const endGame = (totalscore) => {
      totalScoreFromChild.value = totalscore
      setTimeout(() => {
        isEndGame.value = true;
      }, 500);
    }

   

    const views = ['Welcome', 'Tutorial', 'Level 1', 'Level 2', 'Level 3', 'Level 4', 'Feedback'];
    const currentView = ref(views[0])
    
    const viewStyles = {
      'Welcome': {color: 'gray-500', image: StarIcon},
      'Tutorial': {color: 'gray-500', image: StarIcon},
      'Level 1': {color: 'red-500', image: StarIcon},
      'Level 2': {color: 'blue-500', image: StarIcon},
      'Level 3': {color: 'yellow-500', image: StarIcon},
      'Level 4': {color: 'gray-500', image: StarIcon},
      'Feedback': {color: 'gray-500', image: StarIcon},
    }
    watch([gameStarted, tutorialStarted,currentLevel,isEndGame], () => {
      updateCurrentView();
      currentViewIndex();
    });

    const currentViewIndex = () => {
      const currentViewIndex = views.indexOf(currentView.value);
      return currentViewIndex;
    };


    const progress = computed(() => {
      const viewIndex = views.indexOf(currentView.value);
      const progressValue = (viewIndex / (views.length - 1)) * 100
      return progressValue;
    })

    const updateCurrentView = () => {
      if (!gameStarted.value && !tutorialStarted.value) {
        currentView.value = 'Welcome';
      } else if (tutorialStarted.value) {
        currentView.value = 'Tutorial'
      } else if (!isEndGame.value) {
        currentView.value = 'Level '+ currentLevel.value;
      } else if (isEndGame.value) {
        currentView.value = 'Feedback';
      }
    };
    const startGame = () => {
      isShowGameModal.value = false;
    }
    const showGameModal = () => {
      setTimeout(() => {
        tutorialStarted.value = false;
        gameStarted.value = true;
        isShowGameModal.value = true;
      }, 500);
    }
    return {
      startTutorial,
      levelUp,
      progress,
      currentViewIndex,
      viewStyles,
      views,
      currentView,
      totalScoreFromChild,
      tutorialStarted,
      startGame,
      gameStarted,
      showGameModal,
      isShowGameModal,
      isEndGame,
      endGame,
    }
  }
}
</script>
