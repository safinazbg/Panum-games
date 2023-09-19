<template>
<div class="speechRecognition">
  <button @click="ToggleMic">Start Recording</button>
  <button @click="stopRecording" >Stop Recording</button>
  <div style="font-size: large" v-text="recognizedText"></div>


</div>
</template>

<script>
export default {
  name: "SpeechRecognition"
}
</script>

<style scoped>

</style>