<template>
  <div
      class="flex flex-col items-center justify-center max-w-3xl mx-auto text-center mt-40"
  >
    <div v-if="!gameStarted">
      <h1 class="text-4xl my-4">Quiz - test your knowledge</h1>
      <p class="leading-relaxed text-lg">
        Welcome to the quiz ! <br />
        This quiz consist of
        <strong>{{ questions.length }}</strong>
        question. <br />
        Please answer each question without using any outside help. <br />
        if you do not know the answer to a question, just go with your best
        guess.
      </p>
      <button
          class="bg-gray-300 px-4 py-6 text-lg border-2 border-gray-800 rounded-md my-10 hover:bg-gray-400 ease-in-out duration-300"
          @click="startGame"
      >
        Start the quiz
      </button>
    </div>
    <div v-if="gameStarted">
      <h2 v-if="!showResult" class="text-3xl my-4">
        Question <strong>{{ currentQuestionIndex + 1 }}</strong> of
        <strong>{{ questions.length }}</strong>
      </h2>
      <hr v-if="!showResult" />
      <QuestionAll
          :question="questions[currentQuestionIndex]"
          @answer="checkAnswer"
      />

      <div v-if="showResult" class="space-y-4">
        <p class="text-3xl">
          You got <strong> {{ correctAnswer }}</strong> out of
          <strong> {{ questions.length }}</strong> correct answers!
        </p>
        <p class="text-2xl">Thank you for playing !</p>
        <button
            class="bg-gray-400 px-4 py-6 text-lg border-2 border-gray-800 rounded-md my-10 hover:bg-gray-500 ease-in-out duration-300"
            @click="resetGame"
        >
          Return to homepage
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionAll from "@/components/declarativeKnowledge/QuestionAll.vue";
import { ref } from "vue";

export default {
  name: "DeclarativeKnowledge",
  components: {
    QuestionAll,
  },
  setup() {
    const gameStarted = ref(false);
    const currentQuestionIndex = ref(0);
    const correctAnswer = ref(0);
    const showResult = ref(false);
    const questions = ref([
      {
        text: "What is the capital of Denmark ?",
        options: ["Copenhagen", "Aarhus", "Odense", "Aalborg"],
        answer: "Copenhagen",
      },
      {
        text: "What is the longest river in the world?",
        options: [
          "Nile River",
          "Amazon River",
          "Mississippi River",
          "Niger River",
        ],
        answer: "Nile River",
      },
      {
        text: "Which planet is the largest in the Solar System?",
        options: ["Mars", "Jupiter", "Venus", "Saturn"],
        answer: "Jupiter",
      },
      {
        text: "Who is the artist of the Mona Lisa painting?",
        options: [
          "Pablo Picasso",
          "Vincent van Gogh",
          "Leonardo da Vinci",
          "Claude Monet",
        ],
        answer: "Leonardo da Vinci",
      },
      {
        text: "What is the highest mountain on Earth?",
        options: ["Everest", "K2", "Annapurna", "Kilimanjaro"],
        answer: "Everest",
      },
      {
        text: 'What is the chemical symbol for which element is "H"\'?',
        options: ["Helium", "Hydrogen", "Hafnium", "Hahnium"],
        answer: "Hydrogen",
      },
      {
        text: "Which planet is the hottest in the Solar System?",
        options: ["Merkury", "Venus", "Mars", "Jupiter"],
        answer: "Venus",
      },
      {
        text: "Which color is not one of the primary colors of a rainbow?",
        options: ["Blue", "Green", "Yellow", "Red"],
        answer: "Green",
      },
      {
        text: 'Which animal lives in a place known as the "kingdom of birds"?',
        options: ["Elephant", "Tortoise", "Kangaroo", "Owl"],
        answer: "Owl",
      },
      {
        text: "What is the largest ocean on Earth?",
        options: [
          "Indian Ocean",
          "Atlantic Ocean",
          "Pacific Ocean",
          "Arctic Ocean",
        ],
        answer: "Pacific Ocean",
      },
    ]);

    const startGame = () => {
      gameStarted.value = true;
    };

    const checkAnswer = (isCorrect) => {
      if (isCorrect) {
        correctAnswer.value++;
      }
      currentQuestionIndex.value++;
      if (questions.value.length === currentQuestionIndex.value) {
        showResult.value = true;
      }
    };

    const resetGame = () => {
      currentQuestionIndex.value = 0;
      correctAnswer.value = 0;
      showResult.value = false;
      gameStarted.value = true;
    };

    return {
      gameStarted,
      startGame,
      currentQuestionIndex,
      correctAnswer,
      showResult,
      questions,
      checkAnswer,
      resetGame,
    };
  },
};
</script>

<style></style>
