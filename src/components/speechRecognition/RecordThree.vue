<template>
  <PanumNavigation></PanumNavigation>
  <div
      class="container mx-auto max-w-5xl flex flex-col items-center justify-center mt-20"
  >
    <div class="Recording-Wave flex flex-col justify-center">
      <div class="Record-text space-y-2 justify-center max-w-3xl leading-6">
        <h1 class="gamifiedh1 text-center">
          Time to talk
        </h1>
        <h2 class="gamifiedh2">your morning routine</h2>
        <p class="text-center">
          Your task is to speak about<b> your morning routine</b>. Think about a typical morning and describe what you
          do. For example, you can talk about:
        </p>

        <div class="flex flex-wrap items-center justify-center text-white gap-2  ">
          <div class="bg-gray-600 rounded-lg p-2" v-for="things in thingsToTalkAbout" :key="things">
            <p class="text-center">
              {{ things }}
            </p>
          </div>
        </div>

        <p class="text-center">
          There is no right and wrong - just talk about your experiences. Try your best to keep talking without taking
          long breaks.
        </p>
        <p class="text-center">
          Press the microphone button when you are ready to speak. The recording will stop automatically after 90
          seconds.
        </p>
        <RouterLink to="/howDoYouFeel" >
          <div class="next-btn">
            <button
                class="gamifiedButton "
            >
              How Do You Feel test
            </button>
          </div>
        </RouterLink>
      </div>
      <!-- Mic Record -->
      <div class="recordMicContainer">
        <button @click="ToggleMic">
          <MicActive v-if="isRecording"/>
          <MicInActive v-if="!isRecording"/>
        </button>
      </div>
      <!-- Sound Wave -->
      <div class="sound-wave">
        <canvas ref="canvas" class="canvas mx-auto"></canvas>
      </div>
      <div class="mic-check my-6  flex justify-center text-center">
        <p v-if="showMicWorkingMessage">
          Recording done! Click the button below to continue.
        </p>
        <p v-if="showMicError">
          Oh, no! Your mic appears to have some problems :( <br/>
          Please try again!
        </p>
      </div>
    </div>


    <router-link to="/recordfour">
      <div class="next-btn">
        <button
            v-if="showMicWorkingMessage"
            class="gamifiedButton"
        >
          Next
        </button>
      </div>
    </router-link>
  </div>
</template>

<script>
import {ref, onMounted} from "vue";
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
    const thingsToTalkAbout = ['Alarm clock', 'Waking up', 'Breakfast', 'Brushing teeth', 'Putting on clothes', 'Packing a bag', 'Leaving the house']
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

          audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
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
      showMicWorkingMessage,
      showMicError,
      thingsToTalkAbout
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
