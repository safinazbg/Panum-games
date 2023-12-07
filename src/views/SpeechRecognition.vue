<template>
  <!-- Welcome Page -->
  <div class="min-h-screen flex flex-col ">
  <PanumNavigation/>
  <div class="welcome-page flex-grow grid place-content-center" v-if="firstPage">
    <div
        class="container mx-auto max-w-5xl  flex flex-col items-center justify-center  space-y-2 leading-6"
    >
      <h1 class="font-semibold text-xl gamifiedh1">
        Welcome to the Voice game!
      </h1>
      <h5 class="font-semibold text-base gamifiedh2 ">
        In this game, you will record yourself talking and reading.

      </h5>
      <ol class="gamifiedp list-decimal max-w-xl py-16">
          <li>
            Please ensure that you are in a quiet environment.
          </li>
          <li>
            You should just speak like you naturally would without thinking too much about it.
          </li>
          <li>
            If anything goes wrong, you can redo the recording.
          </li>
      </ol>

    </div>
    <div class="flex flex-col items-center justify-center w-full">
      <button
          class="gamifiedButton"
          @click="startGame"
      >
        Start Game
      </button>
    </div>
  </div>
  <!-- Second Page -->
  <div
      class="container mx-auto max-w-5xl flex flex-col items-center justify-center mt-20"
      v-show="secondPage"
  >
    <div class="Recording-Wave">
      <div class="Record-text space-y-2 leading-6 flex flex-col items-center ">
        <h1 class="text-center gamifiedh1">
          Before we start
        </h1>
        <h2 class="gamifiedh2">
          let's test your microphone!
        </h2>
<!--        <h2 class="font-semibold text-center text-lg !mb-12 gamifiedp">Please follow these instructions:</h2>-->
        <ol class="gamifiedp list-decimal max-w-xl py-12">
          <li>
            Click the 'mic test' button.
          </li>
          <li>
            Click 'allow' if you see a question in the
            browser.
          </li>
          <li>
            Speak into the microphone. The lines should be in the green area!
          </li>
        </ol>
      </div>

      <!-- Mic Record -->
      <div class="recordMicContainer flex justify-center">
        <button @click="ToggleMic">
          <MicActive v-if="isRecording" />
          <MicInActive v-if="!isRecording" />
        </button>
      </div>
      <!-- Sound Wave -->
      <div class="sound-wave flex justify-center ">
        <canvas ref="canvas" class="canvas"></canvas>
      </div>
      <div class="mic-check my-4 flex justify-center text-center">
        <p v-if="showMicWorkingMessage"
        class="text-green-800">
          Sounds good - your microphone is working!
          <br />
          Please click the ‘Next’ button to continue.
        </p>
        <p v-if="showMicError"
        class="text-red-700 text-center">
          Oh, no! Your mic appears to have some problems :( <br />
          Please try again!
        </p>
      </div>
    </div>

    <RouterLink to="recordtwo"  v-if="showMicWorkingMessage" >
      <div class="next-btn">
        <button
            class="gamifiedButton"
        >
<!--            class="bg-[#3498db] gamifiedButton px-4 py-2 rounded-md text-white hover:bg-[#3190d0]"-->
          Next →
        </button>
      </div>
    </RouterLink>


  </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import MicActive from "@/components/Icons/MicActive.vue";
import MicInActive from "@/components/Icons/MicInActive.vue";
import PanumNavigation from "@/components/PanumNavigation.vue";

export default {
  components: {
    MicActive,
    MicInActive,
    PanumNavigation
  },
  setup() {
    const isRecording = ref(false);
    const showGamePage = ref(true);
    const showFinalPage = ref(false);
    const canvasRef = ref(null);

    const showMicWorkingMessage = ref(false);
    const showMicError = ref(false);

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const sr = new Recognition();
    const recordingLength = 10
    const secondsLeft = ref(null)



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

    const firstPage = ref(true);
    const secondPage = ref(false);

    const startGame = () => {
      firstPage.value = false;
      secondPage.value = true;
    };



    return {
      ToggleMic,
      isRecording,
      canvasRef,
      audioContextStarted,
      toggleAudioContext: startAudioContext,
      firstPage,
      secondPage,
      secondsLeft,
      startGame,
      showMicWorkingMessage,
      showMicError,
      showGamePage,
      showFinalPage,

    };
  },
};
</script>

<style lang="css" scoped>
.recordMicContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.mic {
  padding: 10px 20px;
  background-color: #3498db;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.mic.recording {
  background-color: #e74c3c;
}

.wave {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.canvas {
  border: 1px solid #000;
  width: 490px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
