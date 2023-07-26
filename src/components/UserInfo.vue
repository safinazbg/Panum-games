<template>
  <LInfo class="visible !h-4/5" :class="{ 'hidden': !show} ">
    <template #title>
      Please tell us something about yourself

    </template>
    <template #body>
      <p>
        In order to scientific research using this game we
        would like to know your gender and age. Please provide this information in the fields below.
      </p>

<!--      why not use something else than a input field for gender?? because there are too many genders or ?-->
      <div class="flex flex-col gap-2 mt-6">

      <div class="flex justify-center align-middle">
          <label for="title" class="text-xl font-semibold w-20">Gender</label>
          <TextInput
              :tabIndex="1"
              name="gender"
              placeholder="Your gender"
              @change="onGenderChange"
          ></TextInput>
      </div>
      <div class="flex">
          <label for="title" class="text-xl font-semibold w-20">Age </label>
          <TextInput
              :tabIndex="2"
              name="gender"
              placeholder="Your age"
              @change="onAgeChange"
          ></TextInput>
      </div>
      <div @click="() => onTermChange(!terms)" class="">
        <input
            class="mr-1"
            type="checkbox"
            :tabindex="3"
            :checked="terms"
        />
        <label class="">Accept terms and conditions</label>
      </div>
      </div>

    </template>
    <template #button>
      <button class="button"                   @click="onSubmit"

      >
        Submit
      </button>
    </template>
  </LInfo>
</template>

<script>
import LInfo from "@/components/LInfo.vue";
import {ref} from "vue";
import TextInput from "@/components/TextInput.vue";

const getDefaultUser = () =>
    new Object({
      gender: "",
      age:0
    });
export default {
  name: "UserInfo",
  components: {TextInput, LInfo},
  setup(){
    const newUser = ref(getDefaultUser());
    let terms = ref(false);
    let show = ref(true);

    const onSubmit = async () => {
      console.log(newUser.value)
      show.value = false;
    };

    return{
      onGenderChange: (value) => (newUser.value.gender = value),
      onAgeChange: (value) => (newUser.value.age = value),
      onTermChange: (value) => (terms = value),
      onSubmit,
      terms,
      show

    }
  }


}
</script>

<style scoped>

</style>