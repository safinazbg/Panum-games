<template>
  <PanumNavigation/>
  <div
      class="mentalSpeed focus:outline-none overflow-hidden "
      tabindex="0"
      ref="game"
      @keydown.left="next('left')"
      @keydown.right="next('right')"
  >
    <div
        class="WelcomePage container mx-auto flex h-full justify-between flex-col items-center !k1:mx-12 fadeInAnimation my-10
        backdrop-blur-2xl backdrop-brightness-125 rounded-3xl"
    >
      <Progressbar :current-view="adjustedCurrentView"  :progress="progress"
                   :view-styles="viewStyles"/>
      <Welcome :next="next" :view="view"/>
      <SearchTrialIntro :next="next" :view="view"/>
      <div v-if="view === 'Search Trial'" class="GamePage SelectedTask taskBox">
        <div class="flex flex-col items-center justify-center pt-12 pb-6">
          <h1 class="!text-4xl mb-14 gamifiedp">
            Question: {{ currentTaskQuestion.index + 1 }}
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
                  @click="next('left')"
                  class="gamifiedButtonMentalSpeedGreen"
              >
                <LeftArrow class="w-8 "/>
              </button>
            </div>
            <div class="text-center">
              <p class="mb-4 text-xl font-medium">
                {{ currentTaskQuestion.btnRight }}
              </p>
              <button
                  @click="next('right')"
                  class="gamifiedButtonMentalSpeedRed "
              >
                <RightArrow class="w-8"/>
              </button>
            </div>
          </div>
          <div class="p-4 text-red-500 opacity-0" :class="{'opacity-100' : isFalse }">
            Wrong answer try again
          </div>
        </div>
      </div>
      <SearchIntro :next="next" :view="view"/>
      <div v-if="view === 'Search'" class="GamePage SelectedTask taskBox">
        <div class="flex flex-col items-center justify-center pt-12 pb-6">
          <h1 class="!text-4xl mb-14 gamifiedp">
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
                <LeftArrow class="w-8 "/>
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
                <RightArrow class="w-8"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ComparisonTrialIntro :next="next" :view="view"/>
      <div v-if="view === 'Comparison Trial'" class="GamePage SelectedTask taskBox">
        <div class="flex flex-col items-center justify-center pt-12 pb-6">
          <h1 class="!text-4xl mb-14 gamifiedp">
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
                <LeftArrow class="w-8 "/>
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
                <RightArrow class="w-8"/>
              </button>
            </div>
          </div>
          <div class="p-4 text-red-500 opacity-0"  :class="{'opacity-100' : isFalse }" >
            Wrong answer try again
          </div>
        </div>
      </div>
      <ComparisonIntro :next="next" :view="view"/>
      <div v-if="view === 'Comparison'" class="GamePage SelectedTask taskBox">
        <div class="flex flex-col items-center justify-center pt-12 pb-6">
          <h1 class="!text-4xl mb-14 gamifiedp">
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
                <LeftArrow class="w-8 "/>
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
                <RightArrow class="w-8"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Feedback :comparisonEvaluation="ComparisonEvaluation.correctAnswers" :searchEvaluation="SearchEvaluation.correctAnswers" :view="view"/>
    </div>
  </div>
</template>

<script>
import mentalSpeed from "@/mentalSpeed.json";
import {computed, onMounted, reactive, ref, watch, watchEffect} from "vue";

import Progressbar from "@/components/declarativeKnowledge/Progressbar.vue";
import {launchConfetti} from "@/confettiJs/confetti";
import PanumNavigation from "@/components/PanumNavigation.vue";
import StarIcon from "@/components/declarativeKnowledge/icons/StarIcon.vue";
import Welcome from "@/components/mentalSpeed/Welcome.vue";
import SearchTrialIntro from "@/components/mentalSpeed/SearchTrialIntro.vue";
import ComparisonIntro from "@/components/mentalSpeed/ComparisonIntro.vue";
import Feedback from "@/components/mentalSpeed/Feedback.vue";
import SearchIntro from "@/components/mentalSpeed/SearchIntro.vue";
import ComparisonTrialIntro from "@/components/mentalSpeed/ComparisonTrialIntro.vue";
import LeftArrow from "@/components/declarativeKnowledge/icons/LeftArrow.vue";
import RightArrow from "@/components/declarativeKnowledge/icons/RightArrow.vue";

export default {
  components: {
    RightArrow,
    LeftArrow,
    ComparisonTrialIntro,
    SearchIntro,
    Feedback, ComparisonIntro, SearchTrialIntro, Welcome, PanumNavigation, Progressbar},
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
        }, 1000);
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

</style>
