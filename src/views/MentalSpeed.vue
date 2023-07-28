<template>
  <div class="container mx-auto w-full flex border-b-2 border-black">
    <div class="w-4/5 h-16 md:ml-44 mx-4">
      <p class="w-1/2 text-2xl font-bold">Panum</p>
      <p class="text-sm text-gray-500">Designed to train your brain</p>
    </div>
    <div
      class="w-32 h-16 border-l-2 border-black flex justify-center items-center md:mx-2"
    >
      <button
        class="border-2 border-black rounded-full text-center mx-2 w-36 h-8 flex justify-center items-center"
      >
        Log in
        <span class="ml-3"><arrowTop class="h-4 w-4"></arrowTop></span>
      </button>
    </div>
  </div>
  <div class="container mx-auto w-full mt-14">
    <div
      class="grid-group md:grid grid-cols-5 border-b-2 md:border-t-2 border-black"
    >
      <div class="col1 md:border-r-2 border-black"></div>
      <div
        class="col2 border-b-2 md:border-b-0 md:border-r-2 p-8 border-black flex items-end justify-center"
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
        class="col3 md:border-r-2 md:border-b-0 p-8 border-black flex items-end justify-center border-b-2"
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
        @click="attention"
        class="col4 md:border-r-2 p-8 border-black flex items-end justify-center cursor-pointer hover:bg-gray-100"
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
    <div class="grid-group md:grid grid-cols-5 border-b-2 border-black">
      <div class="col1 border-r-2 border-black"></div>
      <div
        class="col2 md:border-r-2 md:border-b-0 border-b-2 p-8 border-black flex items-end justify-center"
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
        class="col3 md:border-r-2 md:border-b-0 border-b-2 p-8 border-black flex items-end justify-center"
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
        class="col3 md:border-r-2 p-8 border-black flex items-end justify-center"
      >
        <div class="icon flex flex-col items-center space-y-5">
          <!-- box içine icon eklenecekse p etiketi içindeki margin silinecek -->
          <p class="font-semibold md:mt-24">Mental Speed</p>
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
    <div class="mx-auto my-6">
      <img src="https://www.digiq.eu/img/Aarhus_University_logo.svg.a8533700.png" class="h-12 mx-auto grayscale" alt="">

    </div>
  </div>
</template>

<script>
import arrowTop from "@/components/Icons/arrowTop.vue";
import arrowUp from "@/components/Icons/arrowUp.vue";
import gridIcon from "@/components/Icons/gridIcon.vue";
import peopleIcon from "@/components/Icons/peopleIcon.vue";
import { useRouter } from "vue-router";

export default {
  components: { arrowTop, gridIcon, arrowUp, peopleIcon },

  setup() {
    const router = useRouter();

    const attention = () => {
      router.push("/");
    };

    return { router, attention };
  },
};
</script>
