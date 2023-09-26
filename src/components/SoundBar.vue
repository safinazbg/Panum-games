<template>
  <div
      v-if="showGamePage"
      class="GamePage container mx-auto max-w-5xl flex flex-col items-center justify-center mt-20"
  >
    <div class="Recording-Wave flex flex-col justify-center">
      <div class="Record-text space-y-2 leading-6">
        <p>Now please read the following text aloud</p>
        <p>"insert some text that participant can read"</p>
        <p>
          Press the mic button when you're ready, and press the stop button when
          you are done
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
        <canvas ref="canvas" class="canvas mx-auto"></canvas>
      </div>
      <div class="mic-check my-6">
        <p v-if="showMicError">
          Oh, no! Your mic appears to have some problems :( <br />
          Please try again!
        </p>
      </div>
    </div>
  </div>
  <!-- Final Page -->
  <div class="mt-20 FinalPage" v-if="showFinalPage">
    <h1 class="text-4xl">Thank you for playing!</h1>
    <div class="button mt-10">
      <router-link to="/about">
        <button
            class="px-10 py-7 border-4 border-black bg-gray-400 bg-opacity-80 rounded-xl font-bold text-lg"
        >
          Return to <br />
          homepage
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import MicActive from "@/components/icons/MicActive.vue";
import MicInActive from "@/components/icons/MicInActive.vue";

export default {
  name: "SoundBar",
  components: {
    MicActive,
    MicInActive,
  },
  setup() {
    const isRecording = ref(false);
    const canvasRef = ref(null);
    const showMicWorkingMessage = ref(false);
    const showMicError = ref(false);
    const showGamePage = ref(true);
    const showFinalPage = ref(false);
    const audioContext = ref(null);
    const analyser = ref(null);
    const canvasContext = ref(null);
    const canvasWidth = 900;
    const canvasHeight = 200;
    const audioContextStarted = ref(false);

    const Recognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const sr = new Recognition();

    onMounted(() => {
      sr.continuous = true;
      sr.interimResults = true;

      sr.onstart = () => {
        console.log("SR Started");
        isRecording.value = true;
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
        console.error("Canvas elementi bulunamadı.");
      } else {
        setupCanvas();
      }
    });

    const ToggleMic = () => {
      showMicError.value = false;

      if (!isRecording.value) {
        showMicWorkingMessage.value = true;
        if (!audioContextStarted.value) {
          startAudioContext();
        }
        sr.start();
      } else {
        sr.stop();
        showGamePage.value = false;
        showFinalPage.value = true;
      }
      isRecording.value = !isRecording.value;
    };

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

      // 12 adet çubuğu çiz
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
          if (i < 40) {
            barColor = "#3E7C17";
          } else if (i < 55) {
            barColor = "#F4A442";
          } else {
            barColor = "#D72323";
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
      showMicWorkingMessage,
      showMicError,
      showGamePage,
      showFinalPage,
    };
  },
};
</script>

<style scoped>
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
  /* border: 1px solid #000; */
  width: 400px;
  border-radius: 10px;
  height: 100%;
  /* background-color: rgba(255, 255, 255, 0.5); */
}
</style>
