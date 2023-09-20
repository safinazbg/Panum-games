<template>
  <!-- Welcome Page -->
  <PanumNavigation/>
  <div class="welcome-page" v-if="firstPage">
    <div
        class="container mx-auto max-w-5xl flex flex-col items-center justify-center mt-20 space-y-2 leading-6"
    >
      <h1 class="font-semibold text-xl">
        Welcome to the Speech recognition game!
      </h1>
      <h5 class="font-semibold text-base">
        Your task is just to record yourself speaking freely and then reading a
        text aloud for 1 minute.
      </h5>
      <p>
        Please ensure that you are in a quiet environment when playing the game.
      </p>
      <p>Otherwise, just speak naturally and clearly.</p>
      <p>
        You can redo the recording if you are not satisfied with the result.
      </p>
      <p>Click 'Start game' to start playing! :)</p>
    </div>
    <div class="flex mt-10 items-center justify-center w-full">
      <button
          class="px-10 py-7 border-4 border-black bg-opacity-80 rounded-xl font-bold text-lg"
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
      <div class="Record-text space-y-2 leading-6">
        <h1 class="font-semibold text-xl">
          Before we start, let's test your microphone!
        </h1>
        <h2 class="font-semibold text-lg text-center my-8">Please follow these instructions:</h2>
        <p> 1. Click the 'mic test' button.</p>
        <p> 2. Click 'allow' if you see a question in the
          browser.
        </p>
        <p> 3. The line should move when you talk into the mic!
        </p>
      </div>
      <!-- Mic Record -->
      <div class="recordMicContainer">
        <button @click="ToggleMic">
          <MicActive v-if="isRecording" />
          <MicInActive v-if="!isRecording" />
        </button>
      </div>
      <!-- Sound Wave -->
      <div class="sound-wave">
        <canvas ref="canvas" class="canvas"></canvas>
      </div>
      <div class="mic-check my-6">
        <p v-if="showMicWorkingMessage">
          Yay! Your mic is working perfectly! <br />
          Please click the 'Next' button to proceed.
        </p>
        <p v-if="showMicError">
          Oh, no! Your mic appears to have some problems :( <br />
          Please try again!
        </p>
      </div>
    </div>

    <RouterLink to="recordtwo"  v-if="showMicWorkingMessage" >
      <div class="next-btn ">
        <button
            class=" mt-4 bg-[#3498db] px-4 py-2 rounded-md text-white hover:bg-[#3190d0]"
        >
          Next →
        </button>
      </div>
    </RouterLink>



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

    const canvasRef = ref(null);

    const showMicWorkingMessage = ref(false);
    const showMicError = ref(false);

    const Recognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const sr = new Recognition();

    onMounted(() => {
      sr.continuous = true;
      sr.interimResults = true;

      sr.onstart = () => {
        console.log("SR Started");
        isRecording.value = true;
        setTimeout(() => {
          sr.stop();
          if (audioContextStarted.value) {
            startAudioContext();
          }

          if (isRecording.value) {
            showMicWorkingMessage.value = true;
          } else {
            showMicError.value = true;
          }
        }, 10000);
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
      showMicWorkingMessage.value = false;
      showMicError.value = false;
      if (isRecording.value) {
        sr.stop();
        if (audioContextStarted.value) {
          startAudioContext();
        }
      } else {
        if (!audioContextStarted.value) {
          startAudioContext();
        }
        sr.start();
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

    const setupCanvas = () => {
      const canvas = canvasRef.value;
      if (!canvas) {
        console.error("Canvas element not found.");
        return;
      }
      canvasContext.value = canvas.getContext("2d");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    };

    const drawSoundWave = () => {
      const dataArray = new Uint8Array(analyser.value.frequencyBinCount);
      const draw = () => {
        analyser.value.getByteTimeDomainData(dataArray);
        canvasContext.value.clearRect(0, 0, canvasWidth, canvasHeight);
        canvasContext.value.lineWidth = 4;
        canvasContext.value.strokeStyle = "red";
        canvasContext.value.beginPath();
        const sliceWidth = canvasWidth / dataArray.length;
        let x = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * canvasHeight) / 2;
          if (i === 0) {
            canvasContext.value.moveTo(x, y);
          } else {
            canvasContext.value.lineTo(x, y);
          }
          x += sliceWidth;
        }
        canvasContext.value.lineTo(canvasWidth, canvasHeight / 2);
        canvasContext.value.stroke();
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
      startGame,
      showMicWorkingMessage,
      showMicError,
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
  width: 400px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
