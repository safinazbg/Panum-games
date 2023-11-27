import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MindInTheEye from '../views/MindInTheEye.vue'
import WorkingMemory from "@/views/WorkingMemory.vue";
import MentalSpeed from "@/views/MentalSpeed.vue";
import SpeechRecognition from "@/views/SpeechRecognition.vue";
import RecordTwo from "@/components/RecordTwo.vue";
import RecordThree from "@/components/RecordThree.vue";
import WorkingMemoryGame from "@/components/workingMemory/WorkingMemoryGame.vue";
import DeclarativeKnowledge from "@/components/declarativeKnowledge/DeclarativeKnowledge.vue";
import DeclarativeKnowledgeStyled from "@/components/declarativeKnowledge/DeclarativeKnowledgeStyled.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/MindInTheEye',
    name: 'MindInTheEye',
    component: MindInTheEye
  },
  {
    path: '/MentalSpeed',
    name: 'MentalSpeed',
    component: MentalSpeed,
  },{
    path: '/WorkingMemory',
    name: 'WorkingMemory',
    component: WorkingMemory
  },
  {
    path: '/SpeechRecognition',
    name: 'SpeechRecognition',
    component: SpeechRecognition
  },
  {
    path: '/RecordTwo',
    name: 'RecordTwo',
    component: RecordTwo
  },{
    path: '/RecordThree',
    name: 'RecordThree',
    component: RecordThree
  },
  {
    path: '/WorkingMemoryGame',
    name: 'WorkingMemoryGame',
    component: WorkingMemoryGame
  },
  {
    path: '/DeclarativeKnowledge',
    name: 'DeclarativeKnowledge',
    component: DeclarativeKnowledge
  },
  {
    path: '/DeclarativeKnowledgeStyled',
    name: 'DeclarativeKnowledgeStyled',
    component: DeclarativeKnowledgeStyled
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
