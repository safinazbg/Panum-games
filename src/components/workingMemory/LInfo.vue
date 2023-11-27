<template>
  <div
      class="fixed z-50 k1:min-h-2/3 min-h-5/6 max-w-screen w-full p-12 px-18 lg:max-w-3xl transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      !bg-[#B7FFD5] border-t-4 border-b-[10px] border-x-8  border-[#565557] bg-opacity-75 backdrop-blur-2xl backdrop-brightness-125
      rounded-[100px]
        before:border-4 before:border-x-8 before:border-green-300 before:absolute before:top-0 before:left-0 before:border-b-[16px] before:right-0 before:bottom-0 before:rounded-[90px]
        shadow-gray-600 shadow-2xl  opacity-0
      scale-0 transition-all duration-500"
      :class="{ '!opacity-100  !scale-100': show }">

    <div class="h-full flex flex-col  justify-around p-2 mirrorEffectBig">
      <div class="text-center heading1 pb-12 gamifiedh1 rounded-xl bg-opacity-50 ">
        <slot name="title"></slot>
      </div>
      <div class=" text-[#6A4E3A] lg:text-md px-10 pb-6 text-sm font-custom ">
        <slot name="body"></slot>
      </div>
      <div class="flex justify-center items-center w-full relative">
        <div class="gamifiedButtonMemoryGame w-fit gamifiedh1 !text-yellow-200  mirrorEffect !px-8">
        <slot name="button"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LInfo",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
@media (min-width: 1000px) {
  .fixed {
    backdrop-filter: blur(1rem) brightness(1.25); /* Equivalent to backdrop-blur-2xl backdrop-brightness-125 */
  }
}
</style>