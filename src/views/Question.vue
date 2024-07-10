<template>
<ion-page>
    <ion-content :fullscreen="true">
        <div v-if="pageLoading" class="w-full h-full flex items-center justify-center">
            <div role="status">
                <svg aria-hidden="true" class="inline w-16 h-16 text-gray-200 animate-spin fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>

        <div v-else class="w-full relative">
            <div class="w-full px-6 py-4 border-b border-gray-300 text-base text-primary font-extrabold uppercase">
                {{ level?.title }}
            </div>

            <div class="w-full h-full absolute top-14 left-0 right-0 z-10 flex flex-col items-center justify-center bg-white transition-all" :class="questionLoading ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'">
                <div role="status">
                    <svg aria-hidden="true" class="inline w-16 h-16 text-gray-200 animate-spin fill-blue-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                <p class="text-center mt-6 text-gray-500 font-medium">Loading Next Question...</p>
            </div>
            <div class="w-full h-full absolute top-14 left-0 right-0 z-10 flex flex-col items-center justify-center bg-white transition-all" :class="nextLevel ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'">
                <img class="w-full" src="/level-complete-animation.gif" alt="">
                <p class="text-center mt-0 text-green-600 font-medium">Level Completed!</p>
            </div>
            
            <div class="w-full mt-1 p-6">
                <div class="w-full flex items-center justify-between gap-4">
                    <p class="text-base font-medium text-gray-800">Question {{ currentLevel.completed + 1 }} of {{ questions.count() }}</p>
    
                    <div class="w-fit px-3 py-2 border border-slate-300 rounded-lg flex items-center gap-2">
                        <div class="p-1 bg-indigo-200 rounded-full">
                            <svg class="h-3 w-3 fill-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>
                        </div>
                        <span class="text-sm font-bold text-primary">{{ currentLevel.score }}</span>
                    </div>
                </div>
    
                <div class="w-full mt-8 p-6 bg-indigo-100 border-2 border-indigo-500">
                    <p class="text-lg font-semibold text-indigo-700 text-center">{{ currentQuestion.question }}?</p>
                </div>
    
                <ul class="w-full mt-6 space-y-4">
                    <li v-for="option in currentQuestion.options" :key="option.id">
                        <input type="radio" :id="option.id" :value="option.id" v-model="answer" :disabled="showAnswer" name="options" class="hidden peer" required />
                        <label :for="option.id" class="inline-flex items-center justify-between w-full px-5 py-4 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg cursor-pointer peer-checked:border-2 peer-checked:border-blue-600 peer-checked:text-blue-600 peer-checked:font-bold" :class="showAnswer ? getAnswer(option) : ''">                           
                            {{ option.option }}
                        </label>
                    </li>
                </ul>
                <span class="hidden peer-checked:border-green-600 border-green-600 peer-checked:text-green-600 text-green-600 peer-checked:border-red-600 border-red-600 peer-checked:text-red-600 text-red-600"></span>
            </div>
        </div>
    </ion-content>
    <!-- paynow button -->
    <IonFooter v-if="!pageLoading && !questionLoading && !nextLevel" class="w-full px-6 py-4 shadow-none border-none" :translucent="false">
      <button type="button" v-on:click="next" :disabled="showAnswer || questionLoading || !answer" class="w-full bg-primary disabled:bg-indigo-400 rounded-lg flex justify-center items-center py-3"> 
        <p class="text-lg font-extrabold text-white">{{ showAnswer ? 'Loading...' : 'Next' }}</p>
      </button>
    </IonFooter>
</ion-page>
</template>

<script setup>
import { IonContent, IonPage, IonFooter, onIonViewWillEnter } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import IonicPreference from '@/IonicPreference';
import axios from '@/axios';
import collect from 'collect.js';

const router = useRouter()
const pageLoading = ref(true);
const questionLoading = ref(false);
const level = ref({})
const currentLevel = ref({})
var currentStateRef = ref([])
var currentStateCollection = collect([])
var questions = collect([])
const currentQuestion = ref({})
const answer = ref()
const correctAnswer = ref()
const showAnswer = ref(false)
const nextLevel = ref(false)

async function next(){
    showAnswer.value = true

    const index = currentStateRef.value.findIndex(obj => obj.level_id === level.value.id);

    if(answer.value == correctAnswer.value){
        currentStateCollection = collect(currentStateRef.value)
        currentLevel.value = currentStateRef.value[index]
        currentStateRef.value[index].score += currentQuestion.value.score
    }

    setTimeout(()=>{
        showAnswer.value = false
        questionLoading.value = true

        currentStateRef.value[index].completed += 1
        if(currentStateRef.value[index].completed == questions.count()){
            currentStateRef.value[index].status = 'completed'
        }
        currentLevel.value = currentStateRef.value[index]
        currentStateCollection = collect(currentStateRef.value)

        setTimeout(async ()=>{
            await IonicPreference.set('current_state', JSON.stringify(currentStateRef.value));
            await IonicPreference.set('total_score', JSON.stringify(currentStateCollection.sum('score')));

            if(currentLevel.value.status == 'completed'){
                nextLevel.value = true
                questionLoading.value = false
                setTimeout(()=>{
                    router.replace({name: 'Dashboard'});
                }, 2500)
            }else{
                const currrentquestion = questions.skip(currentLevel.value.completed).first()
                currentQuestion.value = currrentquestion
                correctAnswer.value = collect(currrentquestion.options).where('answer', 1).first().id;
            }

            answer.value = null
            questionLoading.value = false
        }, 1000)
    }, 2000)
}

function getAnswer(option){
    if(option.answer == 1){
        return 'border-2 peer-checked:border-green-600 peer-checked:text-green-600 border-green-600 text-green-600'
    }else if(option.id == answer.value && option.answer == 0){
        return 'border-2 peer-checked:border-red-600 peer-checked:text-red-600'
    }
}

async function getLevels(){
    await axios.get(router.currentRoute.value.path)
        .then(({data}) => {
            pageLoading.value = false;
            level.value = data.level;
            currentLevel.value = currentStateCollection.where('level_id', data.level.id).first()
            questions = collect(data.level.questions)
            currentQuestion.value = questions.skip(currentLevel.value.completed).first()
            correctAnswer.value = collect(currentQuestion.value.options).where('answer', 1).first().id;
        });
}

onIonViewWillEnter(async()=>{
    var response = await IonicPreference.get('current_state');
    currentStateCollection = collect(JSON.parse(response));
    currentStateRef.value = JSON.parse(response)
    await getLevels();
})
</script>  