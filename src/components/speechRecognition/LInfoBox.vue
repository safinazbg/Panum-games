<script setup>
</script>

<template>
  <div class="flex w-full gap-4 justify-center">
    <div class="p-4 rounded-lg gap-4 flex flex-col items-center text-center  max-w-1/3 w-1/3 shadow-2xl">
      <div class="rounded-full w-20  h-20 grid bg-white place-content-center shadow-2xl gamifiedh1">
        1
      </div>
      <div class=" gamifiedp ">
        <slot name="first"/>
      </div>
    </div>
    <div class="p-4 rounded-lg gap-4 flex flex-col items-center text-center max-w-1/3 w-1/3 shadow-2xl" v-if="$slots.second">
      <div class="rounded-full w-20  h-20 grid bg-white place-content-center shadow-2xl gamifiedh1">
        2
      </div>
      <div class="gamifiedp">
        <slot name="second" ></slot>
      </div>
    </div>
    <div class="p-4 rounded-lg gap-4 flex flex-col items-center text-center max-w-1/3 w-1/3 shadow-2xl" v-if="$slots.third">
      <div class="rounded-full w-20  h-20 grid bg-white place-content-center shadow-2xl gamifiedh1">
        3
      </div>
      <div class=" gamifiedp ">
        <slot name="third"/>
      </div>
    </div>
  </div>
</template>

<style scoped>


</style>