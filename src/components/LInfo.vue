<template>
  <div
      class="absolute z-50 lg:p-12 p-6 lg:min-h-2/3 min-h-5/6  w-11/12 max-w-3xl  transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-600  bg-opacity-75 backdrop-blur-2xl backdrop-brightness-125 rounded-3xl shadow-gray-700 shadow-2xl z-50 overflow-x-hidden  opacity-0 scale-0 transition-all duration-500"
      :class="{ '!opacity-100  !scale-100': show }">
    <div class="h-full flex flex-col justify-around text-white">
      <div class="text-center rounded-xl font-custom pb-12 text-5xl bg-opacity-50 text-[#89f2f2] ">
        <slot name="title"></slot>
      </div>
      <div class="pb-8 text-lg text-md font-custom px-10">
        <slot name="body"></slot>
      </div>
      <div class="flex gamifiedButton self-center w-fit justify-center text-xl font-custom">
        <slot name="button"></slot>
      </div>

    </div>
  </div>
</template>

<script>
export default  {
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

</style>