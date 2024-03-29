<template>
  <!-- Welcome Page -->
  <div class="min-h-screen flex flex-col">
    <PanumNavigation/>
    <div class=" w-full flex justify-center">
      <ProgressbarItem :current-view="currentView" :is-view-reached="currentViewIndex" :progress="progress"
                       :view-styles="viewStyles"/>
    </div>
    <div class="fixed flex flex-col gap-2 top-0 right-0">
      <button
          class="gamifiedButton "
          @click="handleNext()"
      >
        Next button TEST
      </button>
      <RouterLink to="/howDoYouFeel">
        <button
            class="gamifiedButton"
        >
          How Do You Feel test
        </button>
      </RouterLink>
    </div>
    <div class="welcome-page flex-grow mt-6 h-full flex flex-col" v-show="currentView === 'Welcome'">
      <div
          class="container mx-auto max-w-5xl  flex flex-col items-center justify-center  space-y-2 leading-6"
      >
        <h1 class="font-semibold text-xl gamifiedh1">
          Welcome to the Voice game!
        </h1>
        <h5 class="font-semibold text-base gamifiedh2 pb-8 ">
          In this game, you will record yourself talking and reading.

        </h5>
        <LInfoBox class="">
          <template #first>
            Please ensure that you are in a quiet environment.
          </template>
          <template #second>
            You should just speak like you naturally would without thinking too much about it.
          </template>
          <template #third>
            If anything goes wrong, you can redo the recording.
          </template>
        </LInfoBox>
      </div>
      <div class="flex flex-col items-center justify-center w-full pt-4">
        <button
            class="gamifiedButton"
            @click="handleNext()"
        >
          Start Game
        </button>
      </div>
    </div>
    <!-- Second Page -->
    <div
        class="container mx-auto max-w-5xl flex flex-col items-center justify-center"
        v-show="currentView === 'Test'"
    >
      <div class="Recording-Wave">
        <div class="Record-text space-y-2 leading-6 flex flex-col items-center ">
          <h1 class="text-center gamifiedh1 mt-6">
            Before we start
          </h1>
          <h2 class="gamifiedh2">
            let's test your microphone!
          </h2>
          <LInfoBox class="pt-6">
            <template #first>
              Click the 'mic test' button.
            </template>
            <template #second>
              Click 'allow' if you see a question in the
              browser.
            </template>
            <template #third>
              Speak into the microphone. The lines should be in the green area!
            </template>
          </LInfoBox>
        </div>

        <!-- Mic Record -->
        <div class="recordMicContainer flex justify-center">
          <button @click="ToggleMic" >
            <MicActive v-if="isRecording"/>
            <MicInActive v-if="!isRecording" class="micStyle"/>
          </button>
        </div>
        <!-- Sound Wave -->
        <div class="sound-wave flex justify-center ">
          <canvas ref="canvas" class="canvas"></canvas>
        </div>
        <MicStatusMessage :show-mic-error="showMicError" :show-mic-working-message="showMicWorkingMessage"/>
      </div>
      <button
          class="gamifiedButton"
          @click="handleNext()"
          v-if="showMicWorkingMessage"
      >
        Next
      </button>
    </div>
    <!-- Third Page -->
    <div
        class="container mx-auto max-w-5xl flex flex-col items-center justify-center"
        v-show="currentView === 'Background Noise'"
    >
      <BackgroundNoise @next="handleNext()"/>
    </div>
    <!-- Fourth Page -->
    <div
        class="container mx-auto max-w-5xl flex flex-col items-center justify-center"
        v-show="currentView === 'Talk'"
    >
      <TalkSpeechRecognition @next="handleNext()"/>
    </div>

  </div>
</template>

<script>
import {ref, onMounted, computed} from "vue";
import MicActive from "@/components/Icons/MicActive.vue";
import MicInActive from "@/components/Icons/MicInActive.vue";
import PanumNavigation from "@/components/PanumNavigation.vue";
import StarIcon from "@/components/declarativeKnowledge/icons/StarIcon.vue";
import ProgressbarItem from "@/components/declarativeKnowledge/Progressbar.vue";
import BackgroundNoise from "@/components/speechRecognition/BackgroundNoise.vue";
import TalkSpeechRecognition from "@/components/speechRecognition/TalkSpeechRecognition.vue";
import LInfoBox from "@/components/speechRecognition/LInfoBox.vue";
import MicStatusMessage from "@/components/speechRecognition/MicStatusMessage.vue";

export default {
  components: {
    MicStatusMessage,
    LInfoBox,
    BackgroundNoise,
    MicActive,
    MicInActive,
    PanumNavigation,
    ProgressbarItem,
    TalkSpeechRecognition,

  },
  setup() {
    const isRecording = ref(false);
    const canvasRef = ref(null);
    const showMicWorkingMessage = ref(false);
    const showMicError = ref(false);
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const sr = new Recognition();
    const recordingLength = 10
    const secondsLeft = ref(null)
    const currentViewIndex = ref(0);
    const handleNext = () => {
      currentViewIndex.value = (currentViewIndex.value + 1) % views.length;
    };

    const views = ['Welcome', 'Test', 'Background Noise', 'Talk'];

    const viewStyles = {
      'Welcome': {color: 'gray-500', image: StarIcon},
      'Test': {color: 'gray-500', image: StarIcon},
      'Background Noise': {color: 'red-500', image: StarIcon},
      'Talk': {color: 'blue-500', image: StarIcon},
    }

    const currentView = computed(() => {
      return views[currentViewIndex.value];
    });

    const progress = computed(() => {
      const progressValue = currentViewIndex.value * 33;
      return progressValue;
    })

    onMounted(() => {
      sr.continuous = true;
      sr.interimResults = true;

      sr.onstart = () => {
        console.log("SR Started");
        isRecording.value = true;

        setTimeout(() => {
          console.log('timeout')
          sr.stop();
          stopAudioContext();

          if (isRecording.value) {
            showMicWorkingMessage.value = true;
            startAudioContext();
          } else {
            showMicError.value = true;
          }
        }, recordingLength * 1000);
      };

      sr.onend = () => {
        console.log("SR Stopped");
        isRecording.value = false;
        if (!showMicWorkingMessage.value) {
          showMicError.value = true;
        }
      };

      canvasRef.value = document.querySelector("canvas");
      if (!canvasRef.value) {
        console.error("Canvas element not found.");
      } else {
        setupCanvas();
      }
    });

    const ToggleMic = () => {
      console.log("Toggle");
      showMicWorkingMessage.value = false;
      showMicError.value = false;
      if (isRecording.value) {
        sr.stop();
        stopAudioContext();
      } else {
        startAudioContext();
        sr.start()
      }
    };

    const audioContext = ref(null);
    const analyser = ref(null);
    const canvasContext = ref(null);
    const canvasWidth = 900;
    const canvasHeight = 200;
    const audioContextStarted = ref(false);

    const startAudioContext = async () => {
      try {
        if (!audioContextStarted.value) {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });

          audioContext.value = new (window.AudioContext ||
              window.webkitAudioContext)();
          analyser.value = audioContext.value.createAnalyser();
          const source = audioContext.value.createMediaStreamSource(stream);
          source.connect(analyser.value);
          analyser.value.fftSize = 256;

          audioContextStarted.value = true;

          drawSoundWave();
        } else {
          audioContext.value.close();
          audioContextStarted.value = false;
          canvasContext.value.clearRect(0, 0, canvasWidth, canvasHeight);
        }
      } catch (error) {
        console.error("Microphone access denied:", error);
      }
    };

    const stopAudioContext = () => {
      if (audioContextStarted.value === true) {
        audioContext.value.close();
        canvasContext.value.clearRect(0, 0, canvasWidth, canvasHeight);
        audioContextStarted.value = false;
      }
    };
    const setupCanvas = () => {
      const canvas = canvasRef.value;
      if (!canvas) {
        console.error("Canvas element not found.");
        return;
      }
      canvasContext.value = canvas.getContext("2d");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const barCount = 60;
      const barWidth = 10;
      const barSpacing = 5;
      const initialColor = "#fff";

      for (let i = 0; i < barCount; i++) {
        const x = (barWidth + barSpacing) * i;
        canvasContext.value.fillStyle = initialColor;
        canvasContext.value.fillRect(x, 0, barWidth, canvasHeight);
      }
    };


    const drawSoundWave = () => {
      const dataArray = new Uint8Array(analyser.value.frequencyBinCount);
      const draw = () => {
        analyser.value.getByteFrequencyData(dataArray);
        canvasContext.value.clearRect(0, 0, canvasWidth, canvasHeight);

        const barCount = 100;
        const barWidth = 10;
        const barSpacing = 5;
        const maxBarHeight = canvasHeight;

        for (let i = 0; i < barCount; i++) {
          const x = (barWidth + barSpacing) * i;
          const barHeight = (dataArray[i] / 255) * maxBarHeight;

          let barColor = "B2B1B9";
          if (barHeight > 190) {
            barColor = "#D72323";
          } else if (barHeight > 175) {
            barColor = "#F4A442";
          } else {
            barColor = "#3E7C17";
          }

          canvasContext.value.fillStyle = barColor;
          canvasContext.value.fillRect(
              x,
              canvasHeight - barHeight,
              barWidth,
              barHeight
          );
        }

        requestAnimationFrame(draw);
      };
      draw();
    };


    return {
      ToggleMic,
      isRecording,
      canvasRef,
      audioContextStarted,
      toggleAudioContext: startAudioContext,
      secondsLeft,
      showMicWorkingMessage,
      showMicError,
      viewStyles,
      currentViewIndex,
      currentView,
      handleNext,
      progress,
    };
  },
};
</script>

<style lang="css" scoped>

</style>
