<template>
  <div class=" w-64 h-96 rounded-xl cursor-pointer object-contain hover overflow-hidden group">
    <router-link :to="path">
      <img :src="require(`../assets/${img}`)" alt="Game selection">


      <slot name="image"></slot>
      <p class="text-4xl font-bold text-white z-50 absolute self-center top-4 left-4 transition-all duration-300 group-hover:text-5xl group-hover:text-[#89f2f2] p-2 group-hover:translate-y-12">
        <slot name="title1"></slot>
      </p>
      <p class="text-4xl font-bold text-white z-10 absolute bottom-4 right-4 transition-all duration-300 group-hover:text-5xl group-hover:text-[#89f2f2]  p-2 group-hover:-translate-y-48">
        <slot name="title2"></slot>
      </p>
      <p class="text-xl text-container font-bold text-white z-10 absolute -bottom-48 p-4 transition-all duration-300 group-hover:bottom-0">
        <slot name="description"></slot>
      </p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "LGameCard",
  props: {
    path: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.text-container {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>