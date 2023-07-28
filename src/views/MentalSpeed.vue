<template>
  <div class="container mx-auto w-full flex border-b-2 border-black">
    <div class="w-4/5 h-16 ml-44">
      <p class="w-1/2 text-2xl font-bold">Panum</p>
      <p class="text-sm text-gray-500 font-n">Designed to train your brain</p>
    </div>
    <div
      class="w-1/5 h-16 border-l-2 border-black flex justify-center items-center"
    >
      <button
        class="border-2 border-black rounded-full text-center w-36 h-8 flex justify-center items-center"
      >
        Log in
        <span class="ml-3"><arrowTop class="h-4 w-4"></arrowTop></span>
      </button>
    </div>
  </div>
  <div class="container mx-auto w-full mt-14">
    <div class="grid-group grid grid-cols-5 border-b-2 border-t-2 border-black">
      <div class="col1 border-r-2 border-black"></div>
      <div
        class="col2 border-r-2 p-8 border-black flex items-end justify-center"
      >
        <div class="icon flex flex-col items-center space-y-5">
          <gridIcon class="w-12 h-12" />
          <p class="font-semibold">Working Memory Test</p>
          <button
            class="border-2 border-black rounded-full text-center w-36 h-8 flex justify-center items-center"
          >
            Play
            <span class="ml-3"><arrowUp class="h-4 w-4"></arrowUp></span>
          </button>
        </div>
      </div>
      <div
        class="col3 border-r-2 p-8 border-black flex items-end justify-center"
      >
        <div class="icon flex flex-col items-center space-y-5">
          <peopleIcon class="w-12 h-12" />
          <p class="font-semibold">Mental Speed</p>
          <button
            class="border-2 border-black rounded-full text-center w-36 h-8 flex justify-center items-center"
          >
            Play
            <span class="ml-3"><arrowUp class="h-4 w-4"></arrowUp></span>
          </button>
        </div>
      </div>
      <div
        class="col4 border-r-2 p-8 border-black flex items-end justify-center"
      >
        <div class="icon flex flex-col items-center justify-center">
          <p class="font-semibold text-lg">Mental Speed</p>
          <p class="mb-4">
            Verbal fluency is the ability to rapidly retreive words from your
            mental vocabulary
          </p>
          <button
            class="border-2 border-black rounded-full text-center w-36 h-8 flex justify-center items-center"
          >
            Play
            <span class="ml-3"><arrowUp class="h-4 w-4"></arrowUp></span>
          </button>
        </div>
      </div>
      <div class="col5 border-black"></div>
    </div>
    <div class="grid-group grid grid-cols-5 border-b-2 border-black">
      <div class="col1 border-r-2 border-black"></div>
      <div
        class="col2 border-r-2 p-8 border-black flex items-end justify-center"
      >
        <div class="icon flex flex-col items-center space-y-5">
          <p class="font-semibold">Working Memory Test</p>
          <button
            class="border-2 border-black rounded-full text-center w-36 h-8 flex justify-center items-center"
          >
            Play
            <span class="ml-3"><arrowUp class="h-4 w-4"></arrowUp></span>
          </button>
        </div>
      </div>
      <div
        class="col3 border-r-2 p-8 border-black flex items-end justify-center"
      >
        <div class="icon flex flex-col items-center space-y-5">
          <p class="font-semibold">Mental Speed</p>
          <button
            class="border-2 border-black rounded-full text-center w-36 h-8 flex justify-center items-center"
          >
            Play
            <span class="ml-3"><arrowUp class="h-4 w-4"></arrowUp></span>
          </button>
        </div>
      </div>
      <div
        class="col3 border-r-2 p-8 border-black flex items-end justify-center"
      >
        <div class="icon flex flex-col items-center space-y-5">
          <p class="font-semibold mt-24">Mental Speed</p>
          <button
            class="border-2 border-black rounded-full text-center w-36 h-8 flex justify-center items-center"
          >
            Play
            <span class="ml-3"><arrowUp class="h-4 w-4"></arrowUp></span>
          </button>
        </div>
      </div>
      <div class="col5 border-black"></div>
    </div>
  </div>
  <!-- <div class="col6 border-r-2 border-black"></div>
<div
  class="col7 border-r-2 border-t-2 flex flex-col py-10 items-center justify-end border-black"
>
  <div class="icon flex flex-col items-center justify-center">
    <p class="mb-4">Working Memory Test</p>
    <button
      class="border-2 border-black rounded-full text-center w-36 h-8 flex justify-center items-center"
    >
      Play
      <span class="ml-3"><arrowUp class="h-4 w-4"></arrowUp></span>
    </button>
  </div>
</div>
<div
  class="col9 border-r-2 border-t-2 flex flex-col py-10 items-center justify-end border-black"
>
  <div class="icon flex flex-col items-center justify-center">
    <p class="mb-4">Working Memory Test</p>
    <button
      class="border-2 border-black rounded-full text-center w-36 h-8 flex justify-center items-center"
    >
      Play
      <span class="ml-3"><arrowUp class="h-4 w-4"></arrowUp></span>
    </button>
  </div>
</div>
<div
  class="col8 border-r-2 border-t-2 flex flex-col py-10 items-center justify-end border-black"
>
  <div class="icon flex flex-col items-center justify-center">
    <p class="mb-4">Working Memory Test</p>
    <button
      class="border-2 border-black rounded-full text-center w-36 h-8 flex justify-center items-center"
    >
      Play
      <span class="ml-3"><arrowUp class="h-4 w-4"></arrowUp></span>
    </button>
  </div>
</div> -->
  <!-- <div class="col10 border-r-2 border-black"></div> -->
</template>

<script>
import arrowTop from "@/components/Icons/arrowTop.vue";
import arrowUp from "@/components/Icons/arrowUp.vue";
import gridIcon from "@/components/Icons/gridIcon.vue";
import peopleIcon from "@/components/Icons/peopleIcon.vue";

export default {
  components: { arrowTop, gridIcon, arrowUp, peopleIcon },
};
</script>
