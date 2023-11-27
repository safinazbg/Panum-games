<template>
  <PanumNavigation></PanumNavigation>
  <IntroductionModal :show="!tutorialStarted && !gameStarted" @start="startTutorial"/>
<!--  <Progressbar :current-view="currentView" :is-view-reached="isViewReached(view)" :progress="progress"-->
<!--               :view-styles="viewStyles"/>-->

  <div class="" v-if="!gameStarted" :class="{ 'blur-xl': !tutorialStarted }">
    <TutorialGame @tutorialEnd="showGameModal"/>
  </div>
  <GameModal :show="isShowGameModal" @start="startGame" />
  <div v-if="gameStarted" :class="{ 'blur-xl': isShowGameModal || isEndGame  }">
    <MemoryGameGrid @end="endGame"   />
  </div>
  <DoneGameModal :totalPoints="totalScoreFromChild" :show="isEndGame"/>
</template>

<script>

import MemoryGameGrid from "@/components/workingMemory/MemoryGameGrid.vue";
import IntroductionModal from "@/components/workingMemory/IntroductionModal.vue";
import { ref} from "vue";
import TutorialGame from "@/components/workingMemory/Tutorial.vue";
import GameModal from "@/components/workingMemory/GameModal.vue";
import DoneGameModal from "@/components/workingMemory/DoneGameModal.vue";
import PanumNavigation from "@/components/PanumNavigation.vue";

export default {
  name: 'WorkingMemoryGame',
  components: {
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

    // const viewStyles = {
    //   'Welcome': {color: 'gray-500', image: StarIcon},
    //   'Level1': {color: 'red-500', image: Level1},
    //   'Level2': {color: 'blue-500', image: Level2},
    //   'Level3': {color: 'yellow-500', image: Level3},
    //   'Level4': {color: 'gray-500', image: Level4},
    //   'Level5': {color: 'gray-500', image: Level4},
    //   'Feedback': {color: 'gray-500', image: StarIcon},
    // }
    // const currentView = ref(views[0])
    //
    // const progress = computed(() => {
    //   const viewIndex = views.indexOf(currentView.value);
    //   const currentLevel = ......
    //   const totalLevels = 6
    //   const totalProgress = Math.min((viewIndex * 20) + 3 + (currentLevel / totalLevels * 20), 100)
    //   return totalProgress;
    // });

    const startTutorial = () => {
      tutorialStarted.value = true;
    }
    const endGame = (totalscore) => {
      totalScoreFromChild.value = totalscore
      setTimeout(() => {
        isEndGame.value = true;
      }, 500);
    }
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
      startTutorial, totalScoreFromChild, tutorialStarted, startGame, gameStarted, showGameModal, isShowGameModal, isEndGame, endGame,
    }
  }
}
</script>
