<template>
  <div class="mic-check  my-4 flex justify-center text-center">
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
</template>
<script>
export default {
  name: 'MicStatusMessage',
  props: {
    showMicError: {},
    showMicWorkingMessage: {}
  }
}
</script>