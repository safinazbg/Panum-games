<template>
  <PanumNavigation></PanumNavigation>
  <div
    class="container mx-auto max-w-5xl flex flex-col items-center justify-center mt-20"
  >
    <div class="Recording-Wave flex flex-col justify-center">
      <div class="Record-text space-y-2 leading-6">
        <p>Now please record yourself for min on any topic of your choosing.</p>
        <p>
          Press the "mic" button when you are ready. The recording will
          automatically stop after 1 min.
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
        <p v-if="showMicWorkingMessage">
          Thank you! The 1 minute audio recording has been completed. <br />
          Please click the 'Next' button for the next step.
        </p>
        <p v-if="showMicError">
          Oh, no! Your mic appears to have some problems :( <br />
          Please try again!
        </p>
      </div>
    </div>
    <router-link to="/recordfour">
      <div class="next-btn mt-6">
        <button
          v-if="showMicWorkingMessage"
          class="bg-[#3498db] px-4 py-2 rounded-md text-white hover:bg-[#3190d0]"
        >
          Next →
        </button>
      </div>
    </router-link>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import MicInActive from "@/components/Icons/MicInActive.vue";
import MicActive from "@/components/Icons/MicActive.vue";
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
        }, 60000);
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

    return {
      ToggleMic,
      isRecording,
      canvasRef,
      audioContextStarted,
      toggleAudioContext: startAudioContext,
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
