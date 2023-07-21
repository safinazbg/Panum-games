<template>
  <div class="home flex flex-col items-center h-screen justify-center w-full mx-auto bg-gray-100">

    <div class="max-w-5xl ">
      <div class="topbar flex items-center w-full mb-4">

        <div class="w-[40%] sm:w-[20%]">

          <button class="sm:px-6 px-4 py-1 text-slate-500 shadow-md bg-slate-50 border-slate-400 rounded-l-full sm:mr-2 hover:bg-white hover:text-black hover:border-slate-500 duration-300 ease-linear">
            Go Back
          </button>

        </div>
        <div class="progresbar relative bg-slate-50 border border-slate-300 shadow-md w-[99%] sm:w-full h-8 rounded-r-full">

          <div class="bg-cyan-300 flex items-center h-8 rounded-r-sm duration-300 ease-linear">

            <div class="absolute top-1 left-2 sm:left-1/2 sm:-translate-x-1/2">
              <div class="flex space-x-2 ">

                <p class="font-light">
                  ITEM

                  <span class="font-bold">1</span>

                </p>

                <p class="font-light">
                  FROM 36
                </p>

                <p class="">
                  (<span class="font-bold">0%</span>)

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div class="questionImg w-full shadow-lg">

        <img src="/images/0.jpg" class="object-cover mx-auto rounded" alt="">

      </div>

      <div class="answerButton flex flex-col w-full mx-auto mt-4">

        <button class="px-8 py-4 bg-slate-50 border border-slate-300 rounded-xl shadow-md hover:bg-white hover:shadow-lg hover:border-b-slate-400 mb-3 duration-300 ease-linear capitalize">
          jealous
        </button>

        <button class="px-8 py-4 bg-slate-50 border border-slate-300 rounded-xl shadow-md hover:bg-white hover:shadow-lg hover:border-b-slate-400 mb-3 duration-300 ease-linear capitalize">
          jealous
        </button>

        <button class="px-8 py-4 bg-slate-50 border border-slate-300 rounded-xl shadow-md hover:bg-white hover:shadow-lg hover:border-b-slate-400 mb-3 duration-300 ease-linear capitalize">
          jealous
        </button>

        <button class="px-8 py-4 bg-slate-50 border border-slate-300 rounded-xl shadow-md hover:bg-white hover:shadow-lg hover:border-b-slate-400 mb-3 duration-300 ease-linear capitalize">
          jealous
        </button>

      </div>

    </div>

    <div class="">
      <div class="flex flex-col items-center mt-4">

        <p class="">
          Testi tekrarlamak istermisiniz?
        </p>

        <button class="px-6 py-4 bg-cyan-300 mt-2 ">
          EVET
        </button>

      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  components: {
    
  }
}
</script>
