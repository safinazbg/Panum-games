<template>
  <div class="about">
    <div class="flex flex-col  justify-center items-center gap-8">
      <!-- get user information here  -->
      <UserInfo v-if="userInfo"/>
      <div class="flex justify-between z-50 absolute top-12 right-12">
        <div class="flex gap-4">
          <img src="../assets/logo.png" alt="Home"
               class="h-8 cursor-pointer  object-contain hover"
          />
          <img src="../assets/logo.png" alt="Home"
               class=" h-8 cursor-pointer object-contain hover"
          />
        </div>
      </div>
      <h1 class="font-extrabold k1:text-7xl text-5xl mt-24  justify-center text-white font-custom
">
        Crea. Games
      </h1>
      <div class="flex gap-20 flex-wrap m-12 justify-center     font-custom
">
        <LGameCard
            :path="'/tiles'"
            :img="'logo.png'"
        >
          <template #title1>
            Crea.
          </template>
          <template #title2>
            Tiles
          </template>
          <template #description>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias.
          </template>
        </LGameCard>
        <LGameCard
            :path="'/blender'"
            :img="'logo.png'"
        >
          <template #title1>
            Crea.
          </template>
          <template #title2>
            Blender
          </template>
          <template #description>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias.
          </template>
        </LGameCard>


      </div>
    </div>
    <div class="absolute bottom-0 right-0 p-8">
      <router-link to="/about">
        <img src="../../src/assets/logo.png" alt="Science at home"
             class="h-16 cursor-pointer object-contain hover bg-white">
      </router-link>

      <!--
          <router-view></router-view>
      -->

    </div>


  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";
import {ref} from "vue";
import LGameCard from "@/components/LGameCard.vue";

export default {
  name: 'AboutView',
  components: {LGameCard, UserInfo},
  setup() {
    const userInfo = ref(false);

    return {
      userInfo
    }
  }
}
</script>
