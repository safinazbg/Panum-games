<template>
  <PanumNavigation></PanumNavigation>
  <div class="flex justify-center items-center min-h-screen">
    <div class="flex flex-col gap-2 items-center">

      <h2 class="text-5xl ">Current Level: {{ level }}</h2>
      <div class="flex gap-2 items-center pt-4">
        <h2>Current colors:</h2>

        <div v-for="(color, index) in colors" :key="index" class="w-8 h-8 rounded-md"
             :class="`bg-${color}-500`"></div>
      </div>
      <div class="flex flex-col relative items-center h-8 w-full">
        <p class="absolute inset-0 top-5 text-green-500 text-xl transition-all duration-200 transform translate-y-0" :class="{ 'opacity-100 transform -translate-y-5': isCorrect, 'opacity-0': !isCorrect }" >That's correct, Well Done</p>
        <p class="absolute inset-0 top-5 text-red-500 text-xl transition-all duration-200  transform translate-y-0" :class="{ 'opacity-100 transform -translate-y-5': isCorrect === false, 'opacity-0': isCorrect === true || isCorrect === null  }">That's wrong</p>
      </div>
      <!--        <div class="w-8 h-8 rounded-md bg-red-500">
              </div>
              <div class="w-8 h-8 rounded-md bg-blue-500">
              </div>
              <div class="w-8 h-8 rounded-md bg-purple-500">
              </div>
              <div class="w-8 h-8 rounded-md bg-green-500">
              </div>
              <div class="w-8 h-8 rounded-md bg-yellow-500">
              </div>
              <div class="w-8 h-8 rounded-md bg-orange-500">
              </div>-->
      <div class="flex gap-4 h-full relative">
        <div class="w-36 flex justify-center items-center ">
          <p2 class="transition-transform duration-200 transform font-bold text-2xl" :class="{ '-translate-y-2': scoreChanged }">Score: {{ score }}</p2>

        </div>
        <div class="grid grid-cols-3 gap-3">
          <MemoryGameSquare
              v-for="(tileColor, index) in squares"
              :key="index"
              :color="tileColor"
              :index="index"
              @choice="onChoice(index)"
              :disabled="squaresDisabled"
          />

        </div>
        <div class="flex flex-col  w-36 justify-center gap-8">
          <div class="flex flex-col items-center gap-1">
            <div class="" v-if="gamesBeforeLevel3 && gamesBeforeLevel3 >= 0">{{ gamesBeforeLevel3 }} Games left</div>
            <button :class="level === 5 ? ' text-gray-200' : 'text-gray-800' " @click=" levelUp"
                    class="flex-col flex items-center ">
              <svg class="w-12 h-12 self-center dark:text-white border-2 p-2 rounded-lg "
                   :class="level === 5 ? 'border-gray-200' : 'border-gray-800'"
                   aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   fill="none" viewBox="0 0 10 12">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 5 5 1 1 5m8 6L5 7l-4 4"/>
              </svg>
              <p>Lv Up</p>
            </button>

            <!--            <button :class="level === 6 ? 'disabledSecondaryButton' : 'buttonSecondary'" @click=" levelUp
                    ">Level Up
                        </button>-->
          </div>
          <!--          <button class="h-full self-end"
                            :class="{ 'disabledSecondaryButton': level === 2, 'buttonSecondary': level !== 2 }"
                            @click="levelDown">Level Down
                    </button>-->
          <div class="flex flex-col items-center gap-1">
            <button class="flex-col flex items-center"
                    :class="{ 'text-gray-200': level === 2, 'text-gray-800': level !== 2 }">
              <svg class="w-12 h-12 dark:text-white border-2 p-2 rounded-lg"
                   :class="level === 2 ? 'border-gray-200' : 'border-gray-800'"
                   @click="levelDown"
                   aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 12">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 7 4 4 4-4M1 1l4 4 4-4"/>
              </svg>
              <p>Lv Down</p>
            </button>

          </div>

          <!--        :disabled=" gamesBeforeLevel3> 4"-->
        </div>

      </div>
      <div class="flex w-full h-16 justify-center align-middle py-4">
        <div v-if="chooseColor" class="flex items-center gap-4">
          <div class="">Choose the latest {{ Object.keys(lastColorIndex)[currentColorGuess] }} square</div>
          <div class="w-12 h-12 rounded-xl"
               :class="['bg-' + Object.keys(lastColorIndex)[currentColorGuess] + '-500']"></div>
        </div>
      </div>

      <div class="flex gap-8">
        <button class="mb-4 "
                :class="{ 'disabledSecondaryButton' : !gameIsInProgress,  'buttonSecondary': gameIsInProgress }"
                :disabled='!gameIsInProgress' @click="gameIsInProgress = false">Cancel
        </button>
        <button class=" mb-4 " :class="{ 'disabledButton' : gameIsInProgress,  'button': !gameIsInProgress }"
                :disabled='gameIsInProgress' @click="onStart">Start level
        </button>
      </div>


    </div>
  </div>


</template>

<script>
import {ref, computed, watch} from 'vue';
import MemoryGameSquare from '@/components/MemoryGameSquare.vue';
import PanumNavigation from "@/components/PanumNavigation.vue";
export default {
  name: 'WorkingMemory',
  components: {
    MemoryGameSquare,
    PanumNavigation
  },
  setup() {
    const squares = ref(Array(9).fill('')); // Initialize with empty strings
    const level = ref(2);
    const gameIsInProgress = ref(false);
    const isCorrect = ref(null)
    const squaresDisabled = ref(true)
    const gamesBeforeLevel3 = ref(3)
    const score = ref(0)
    const timeOut = ref(2000);
    const allColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']; // All possible colors
    const chooseColor = ref(null);
    const currentColorGuess = ref(0);
    const colors = computed(() => {
      return allColors.slice(0, level.value); // Return the first 'level' colors
    });
    const lastColorIndex = ref(null);
    const scoreChanged = ref(false);

    watch(score, () => {
      scoreChanged.value = true;
      setTimeout(() => {
        scoreChanged.value = false;
      }, 200); // Adjust the time delay to match the CSS transition duration
    });

    // Every color has to show up the same as the level
    function updateTimeOut() {
      if (level.value >= 2 && level.value <= 5) {
        timeOut.value = Math.min(level.value * 400 + 1200, 2800);
      }
    }

    watch(isCorrect, (newValue) => {
      if (newValue !== null) {
        setTimeout(() => {
          isCorrect.value = null;
        }, 1000); // Change the time delay as needed (in milliseconds)
      }
    });


    function levelUp() {
      if (level.value < 6) {
        level.value++;
        updateTimeOut();
      }
    }

    function levelDown() {
      if (level.value > 2) {
        level.value--;
        updateTimeOut();
      }
    }

    const onChoice = (index) => {
      console.log(Object.values(lastColorIndex.value)[currentColorGuess.value])
      let currentColorIndex = Object.values(lastColorIndex.value)[currentColorGuess.value]
      console.log(currentColorIndex, index)
      if (currentColorIndex === index) {
        isCorrect.value = true
        score.value += level.value
        console.log('correct')
      } else {
        isCorrect.value = false
        console.log('wrong')
      }
      squares.value[index] = '';
      if (currentColorGuess.value < level.value - 1) {
        currentColorGuess.value++;
        console.log('next')
      } else {
        currentColorGuess.value = 0;
        chooseColor.value = false;
        gamesBeforeLevel3.value--
        gameIsInProgress.value = false
        squaresDisabled.value = true
        /*
                isCorrect.value = "You are done"
        */
        console.log('done')
      }
    }

    function shuffle(array) {
      let currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    function onStart() {
      gameIsInProgress.value = true;
      // Initialize an array to hold timeout IDs for each square
      const timeouts = Array(squares.value.length).fill(null);

      // Initialize an object to count how many times each color has been used
      let colorCounts = colors.value.reduce((counts, color) => ({...counts, [color]: 0}), {});

      // Initialize an object to track the last grid index where each color was used
      lastColorIndex.value = colors.value.reduce((indices, color) => ({...indices, [color]: null}), {});

      // Create an array of all the colors that will be used
      let allColors = [];
      for (let i = 0; i < level.value; i++) {
        allColors = allColors.concat(colors.value);
      }

      // Shuffle the array of colors
      let shuffledColors = shuffle(allColors);

      async function updateSquaresWithTimeouts() {
        let isFirstCall = true; // Flag to track the first call

        // Loop over the shuffled colors
        for (let i = 0; i < shuffledColors.length; i++) {
          const delay = isFirstCall ? 0 : timeOut.value + 500; // Adjust the delay
          isFirstCall = false;
          if (gameIsInProgress.value) {
            await new Promise(resolve => {
              setTimeout(() => {
                const randomColor = shuffledColors[i];
                let randomIndex;
                // Keep picking a random square until we find one that's not already displaying the current color
                do {
                  randomIndex = Math.floor(Math.random() * squares.value.length);
                } while (squares.value[randomIndex] === randomColor);

                // Clear existing timeout for this square
                if (timeouts[randomIndex]) {
                  clearTimeout(timeouts[randomIndex]);
                }

                // Change the color of the square, increment the color count, and update the last index for the color
                squares.value[randomIndex] = randomColor;
                colorCounts[randomColor]++;
                lastColorIndex.value[randomColor] = randomIndex;


                // Set a new timeout to revert the color back to gray after 1000 milliseconds
                timeouts[randomIndex] = setTimeout(() => {
                  colorCounts[squares.value[randomIndex]]--; // Decrement the count for the current color
                  squares.value[randomIndex] = '';
                }, timeOut.value);
                resolve();
              }, delay); // Delay each color change by 500 milliseconds
            });
          }
        }
        setTimeout(() => {
          chooseColor.value = true
          squaresDisabled.value = false
        }, timeOut.value)
      }

      updateSquaresWithTimeouts();
    }


    return {
      squares,
      onStart,
      levelUp,
      levelDown,
      level,
      allColors,
      colors,
      lastColorIndex,
      onChoice,
      chooseColor,
      currentColorGuess,
      timeOut,
      gamesBeforeLevel3,
      isCorrect,
      squaresDisabled,
      gameIsInProgress,
      score,
      scoreChanged
    };
  },
};
</script>

<style>
.button{
  width: 10rem;
  color: white;
  border-radius: .25rem !important;
  padding: 1rem 2rem !important;
  white-space: nowrap;
  background-color: rgba(50, 205, 50, 1);
  transition: background-color;
  transition-duration: 200ms;
  cursor: pointer;
  border: none;
}
.disabledButton{
  background-color: lightgrey;
  width: 10rem;
  color: white;
  border-radius: .25rem !important;
  padding: 1rem 2rem !important;
  transition: background-color;
  transition-duration: 200ms;
  border: none;
}
.button:hover{
  background-color: rgba(50, 205, 50, 0.8);
}
.buttonSecondary{
  width: 10rem;
  color: rgba(50, 205, 50, 1);
  border-radius: .25rem;
  padding: .75rem;
  background-color: white;
  border: 2px solid rgba(50, 205, 50, 1);
  transition: background-color;
  transition-duration: 200ms;
  cursor: pointer;
}
.disabledSecondaryButton{
  color: lightgrey;
  border: 2px solid lightgrey;
  width: 10rem;
  border-radius: .25rem;
  padding: .75rem;
  background-color: white;
  transition: background-color;
  transition-duration: 200ms;
}
.buttonSecondary:hover{
  background-color: rgba(50, 205, 50, 0.8);
  color:white;
}
</style>