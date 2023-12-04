<template>
  <div class="h-20 flex items-center relative w-full font-custom justify-between max-w-3xl ">
    <!--        <div class="border-gray-500"></div>-->
    <!--        <div class="border-red-500"></div>-->
    <!--        <div class="border-blue-500"></div>-->
    <!--        <div class="border-yellow-500"></div>-->
    <!--                <div class="bg-gray-500"></div>-->
    <!--                <div class="bg-red-500"></div>-->
    <!--                <div class="bg-blue-500"></div>-->
    <!--                <div class="bg-yellow-500"></div>-->
    <!--                <div class="text-gray-500"></div>-->
    <!--                <div class="text-red-500"></div>-->
    <!--                <div class="text-blue-500"></div>-->
    <!--                <div class="text-yellow-500"></div>-->
    <div class="border w-[94%] mx-6 bg-slate-200 h-2 rounded-md absolute">
      <div class=" w-full shadow-md h-2 bg-slate-700 transition-all duration-500 ease-in-out"
           :style="{ width: progress && !isNaN(progress) ? progress + '%' : 0 + '%', backgroundColor: progress && !isNaN(progress) ? '#85dcf9' : '' }"></div>
    </div>

    <div class="  relative " v-for="(style, view) in viewStyles" :key="view">
      <div
          class="absolute -top-10 text-sm before:absolute before:border-l-transparent before:border-r-transparent before:border-r-8 before:border-l-8 before:border-t-[8px] before:border-[#85dcf9] before:top-[95%] before:left-1/2 before:-translate-x-1/2  text-white p-1 px-2 rounded-lg bg-[#85dcf9]  left-1/2 translate-y-5 -translate-x-1/2 whitespace-nowrap opacity-0 duration-500 transition-all"
          :class="[{'opacity-100 !translate-y-0': currentView === view}]">
        {{ view }}
        <div class=""></div>
      </div>
      <div
          :class="['h-12 w-12 rounded-full border-4 transition-all duration-500 delay-100 ', { ' border-[#85dcf9] bg-[#85dcf9]': isViewReached(view) }, { '!bg-white': !isViewReached(view) } ]">
        <component :is="style.image" alt=""
                   class=" z-40 grid  h-full place-items-center transition-all duration-500"
                   :class="{ '!opacity-30 bounce': !isViewReached(view) }"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProgressbarItem',
  props: {
    currentView: {},
    progress: {},
    viewStyles: {}
  },
  setup(props){
    const isViewReached = (view) => {
      const views = Object.keys(props.viewStyles);
      const currentViewIndex = views.indexOf(props.currentView);
      const targetViewIndex = views.indexOf(view);
      return currentViewIndex >= targetViewIndex;
    }

    return {
        isViewReached
    }
  }
}
</script>
