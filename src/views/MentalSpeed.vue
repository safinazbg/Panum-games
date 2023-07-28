<template>
 <div class="container mx-auto w-full  flex border-b-2 border-black">
  <div class="w-4/5 h-16 ml-44">
    <p class="w-1/2 text-2xl font-bold">
        Panum
    </p>
    <p class="text-sm text-gray-500 font-n">
      Designed to train your brain
    </p>
    
  </div>
  <div class="w-1/5 h-16 border-l-2 border-black flex justify-center items-center">
      <button class="border-2 border-black rounded-full text-center w-36 h-8 flex justify-center items-center">Log in
        <span class="ml-3"><arrowTop class="h-4 w-4"></arrowTop></span>
      </button>
  </div>

 </div>
    
  
</template>

<script>
import arrowTop from "@/components/Icons/arrowTop.vue";

export default {
  components: { arrowTop },
};
</script>
