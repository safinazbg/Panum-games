<template>
<div class="speechRecognition">
  <button @click="ToggleMic">Start Recording</button>
  <button @click="stopRecording" >Stop Recording</button>
  <div style="font-size: large" v-text="recognizedText"></div>

  <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
    </svg>
    <span class="sr-only">Icon description</span>
  </button>

</div>
</template>

<script>
import {onMounted, ref} from "vue";
export default {
  name: "SpeechRecognition",
  setup() {
    const recognizedText = ref("");
    const isRecording = ref(false);

    console.log(window.SpeechRecognition)
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const sr = new Recognition();

    onMounted(() => {
      sr.continuous = true;
      sr.interimResults = true;

      sr.onstart = () => {
        console.log('SR started')
        isRecording.value =true;
      }
      sr.onend = () => {
        console.log('SR stopped')
        isRecording.value =false;
      }

      sr.onresult = (event) => {
        // console.log(event)
        for (let i = 0; i< event.results.length; i++) {
          const result = event.results[i];

          if (result.isFinal) {
            CheckForCommand(result)
          }
        }

        const t = Array.from(event.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join('');
        recognizedText.value = t;
      }

    })

    const CheckForCommand = (result) => {
      const t = result[0].transcript;
      if (t.includes('stop recording')) {
        sr.stop()
      } else if (
          t.includes('what is the time') ||
          t.includes('what time is it')
      ){
        sr.stop()
        alert(new Date().toLocaleTimeString())
        setTimeout(() => {
          sr.start()
        }, 100 )
      }
    }
    const ToggleMic = () => {
      if (isRecording.value) {
        sr.stop();
      } else {
        sr.start();
      }
    }


    return {
      CheckForCommand,
      recognizedText,
      ToggleMic

    }
  }
}
</script>

<style scoped>

</style>