<template>
  <button
      class="w-24 h-24 bg-gray-600 rounded-2xl bg-gray-200"
      :style="{ backgroundColor: color }"
      @click="emitChoice"
      :disabled="disabled"
  >
<!--
    <span class="text-white">{{color}} {{index}}</span>
-->
  </button>
</template>

<script>

export default {
  name: 'MemorySquareGame',
  emits: ['choice'],
  props: {
    color: {
      type: String,
      default: 'lightgray',
      required: true,
    },
    index: {
      type: Number,
      default: 0,
      required: true,
    },
    disabled: {
      default:true,
      type: Boolean,
      required: true,
    }
  },
  setup(props, { emit }) {
    const emitChoice = () => {
      emit('choice', props.index);
      console.log(props.index)
    };


    return { emitChoice };
  }
};
</script>
