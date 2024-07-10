<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="w-full px-6 py-4 flex items-center justify-between">
                <div class="w-full">
                    <p class="text-xs text-gray-400">Welcome</p>
                    <h1 class="m-0 text-2xl text-primary font-bold">{{ user }}</h1>
                </div>

                <div class="w-fit px-3 py-2 bg-slate-100 rounded-lg flex items-center gap-2">
                    <div class="p-1 bg-indigo-200 rounded-full">
                        <svg class="h-4 w-4 fill-indigo-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>
                    </div>
                    <span class="text-lg font-bold text-primary">{{ totalScore ?? 0 }}</span>
                </div>
            </div> 

            <div class="w-full px-6 mt-8">
                <img class="w-full object-cover rounded-2xl" src="/dashboard-banner.png" alt="">
            </div>

            <div class="w-full px-6 pb-8 mt-10">
                <h2 class="text-black text-2xl font-extrabold">Levels</h2>

                <div class="w-full mt-6 flex flex-col gap-4">
                    <div v-for="(level, index) in levels" :key="level.id" @click.prevent="goToLevel(level)" class="w-full bg-slate-100 flex items-center rounded-lg overflow-hidden">
                        <div class="w-28 h-24 p-2 bg-indigo-200 flex items-center justify-center">
                            <p class="text-3xl font-extrabold text-indigo-700">{{ index + 1 }}</p>
                        </div>
                        <div class="w-full p-4">
                            <div class="w-full flex justify-between items-end gap-2">
                                <h3 class="m-0 text-base font-bold text-gray-900">{{ level.title }}</h3>

                                <button v-if="currentState.first(item => item.level_id == level.id)" type="button" class="font-medium rounded-lg text-xs px-2 py-1 focus:outline-none flex items-center gap-1 capitalize" :class="currentState.first(item => item.level_id == level.id)?.status == 'completed' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 hover:bg-green-500 text-green-800'">
                                    {{  currentState.first(item => item.level_id == level.id)?.status }}
                                </button>
                            </div>

                            <div class="w-full mt-3 flex justify-between items-end gap-4">
                                <p class="text-gray-600">{{ currentState.first(item => item.level_id == level.id)?.completed ?? 0 }}/<span class="text-gray-900 font-semibold">{{ level?.questions_count }}</span></p>

                                <div class="w-fit px-2 py-1 bg-slate-200 rounded-lg flex items-center gap-2">
                                    <div class="p-1 bg-yellow-200 rounded-full">
                                        <svg class="h-3 w-3 fill-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg>
                                    </div>
                                    <span class="text-sm font-bold text-yellow-600">{{ currentState.first(item => item.level_id == level.id)?.score ?? 0 }}/{{ level.questions_sum_score }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
        <IonFooter v-if="!pageLoading && !questionLoading && !nextLevel" class="w-full px-6 py-4 shadow-none border-none text-center text-sm text-gray-500" :translucent="false">
            Tester App
        </IonFooter>
    </ion-page>
</template>

<script setup>
import { IonContent, IonPage, onIonViewWillEnter } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import IonicPreference from '@/IonicPreference';
import axios from '@/axios';
import collect from 'collect.js';

const router = useRouter()
const user = ref("")
const levels = ref([])
const totalScore = ref(0)
var currentState = collect([])

async function goToLevel(level){
    if(currentState.contains('level_id', level.id) && currentState.first(item => item.level_id == level.id)?.status == 'completed'){
        return;
    }

    if(!currentState.contains('level_id', level.id)){
        currentState.push({
            'level_id': level.id,
            'status': 'continue',
            'completed': 0,
            'score': 0,
        })
        IonicPreference.set('current_state', JSON.stringify(currentState))
    }

    return router.push({'name': 'Question', 'params': {'id': level.id}});
}

async function getLevels(){
  await axios.get('levels')
    .then(({data}) => {
      levels.value = data.levels;
    });
}

onIonViewWillEnter(async()=>{
    user.value = await IonicPreference.get('user');
    totalScore.value = await IonicPreference.get('total_score');
    var response = await IonicPreference.get('current_state');
    currentState = collect(JSON.parse(response));
    await getLevels();
})
</script>  