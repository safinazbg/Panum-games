<template>
  <PanumNavigation/>
  <div
      class="container mx-auto max-w-5xl flex flex-col items-center justify-center mt-20"
  >
    <div class="Recording-Wave flex flex-col justify-center">
      <div class="Record-text space-y-2 leading-6">
        <h1 class="gamifiedh1">
          Record background noise
        </h1>
        <p class="text-center gamifiedh2">Now let's record some background noise.</p>
        <p class="text-center mb-4 gamifiedp">
          Press the "mic" button to begin. Do not talk or make any noise for 10 seconds.
        </p>
                <div
                    v-if="secondsLeft !== null"
                    class="p-8 flex border-4 rounded-xl bg-gray-50 border-gray-700 w-8 h-8 items-center justify-center text-center text-2xl font-semibold ml-auto">
                {{secondsLeft}}
                </div>

      </div>
      <!-- Mic Record -->
      <div class="recordMicContainer mt-12">
        <button @click="ToggleMic">
          <MicActive v-if="isRecording"/>
          <MicInActive v-if="!isRecording"/>
        </button>
      </div>
      <!-- Sound Wave -->
      <div class="sound-wave ">
        <canvas ref="canvas" class="canvas mx-auto"></canvas>
      </div>
      <div class="mic-check my-6 flex justify-center text-center">
        <p v-if="showMicWorkingMessage">
          Recording done! Click the microphone button to redo
          <br>
          the recording, or click the button below to continue.

        </p>
        <p v-if="showMicError">
          Oh, no! Your mic appears to have some problems :( <br/>
          Please try again!
        </p>
      </div>
    </div>
    <RouterLink to="/recordthree" v-if="showMicWorkingMessage">
      <div class="next-btn">
        <button
            class="gamifiedButton"
        >
          Next
        </button>
      </div>
    </RouterLink>

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
    const isRecording = ref(false);

    const canvasRef = ref(null);

    const showMicWorkingMessage = ref(false);
    const showMicError = ref(false);


    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const sr = new Recognition();
    const recordingLength = 10
    const secondsLeft = ref(null)

    const countDownSecond = () => {
      setTimeout(() => {
        if (!secondsLeft.value) return
        secondsLeft.value--
        countDownSecond()
      }, 1000)
    }

    onMounted(() => {
      sr.continuous = true;
      sr.interimResults = true;

      sr.onstart = () => {
        console.log("SR Started");
        isRecording.value = true;
        secondsLeft.value = recordingLength-1
        countDownSecond()

        setTimeout(() => {
          console.log('timeout')
          sr.stop();
          stopAudioContext();

          if (isRecording.value) {
            showMicWorkingMessage.value = true;
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
      console.log(32, 'toggle')
      showMicWorkingMessage.value = false;
      showMicError.value = false;
      if (isRecording.value) {
        sr.stop();
        stopAudioContext();
      } else {
        startAudioContext();
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
      console.log(11.1)
      if (!audioContextStarted.value) {
        audioContextStarted.value = true;

        console.log(11)
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
        analyser.value = audioContext.value.createAnalyser();
        const source = audioContext.value.createMediaStreamSource(stream);
        source.connect(analyser.value);
        analyser.value.fftSize = 256;

        drawSoundWave();
      }
    };
    const stopAudioContext = () => {
      console.log(12.1)
      if (audioContextStarted.value === true) {
        console.log(12)
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
      secondsLeft,
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
              