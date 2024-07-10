<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="w-full h-screen relative">
        <img class="w-full h-full" src="/library-background.jpg" alt="">

        <div class="w-full absolute top-8 flex justify-center">
          <img class="w-32" src="/quiz-house-logo.png" alt="">
        </div>
        <div class="w-full p-6 absolute bottom-0 left-0 right-0">
          <h1 class="text-2xl font-bold text-white">Improve Your World <br> Knowledge</h1>

          <input type="text" v-model="name" class="w-full mt-6 bg-white border-2 border-black text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 block p-2.5 focus:outline-none" placeholder="Enter Your Name" required autofocus />
          <p class="mt-2 text-sm text-red-600" v-if="error">Your name is required.</p>

          <button @click.prevent="start" class="w-full mt-4 text-white bg-primary hover:bg-primary-dark font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none">Get Started</button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonContent, IonPage } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import IonicPreference from '@/IonicPreference';

const router = useRouter()
const name = ref("")
const error = ref(false)

function start(){
  if (name.value == "") {
    return error.value = true
  } else {
    error.value = false
    IonicPreference.set('user', name.value)
    IonicPreference.set('total_score', "0")
    IonicPreference.set('current_state', JSON.stringify([]))
    return router.replace('/dashboard')
  }
}
</script>
