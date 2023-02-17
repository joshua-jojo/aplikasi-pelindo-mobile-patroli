<template lang="">
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Form Pengaduan</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent :fullscreen="true">
            <div class="p-4 flex flex-col gap-2">
                <div class="grid grid-cols-2 gap-2">
                    <inputComponent v-model="pelaporan.first_name" :error="pelaporan.errors.first_name" title="First Name"></inputComponent>
                    <inputComponent v-model="pelaporan.last_name" :error="pelaporan.errors.last_name" title="Last Name"></inputComponent>
                </div>
                <inputComponent v-model="pelaporan.title" :error="pelaporan.errors.title" title="Title"></inputComponent>
                <inputTextArea title="Body" v-model="pelaporan.body" :error="pelaporan.errors.body"></inputTextArea>
                <inputComponent v-model="pelaporan.location" :error="pelaporan.errors.location" title="Location"></inputComponent>
                <div class="grid grid-cols-3 gap-2">
                    <div class="w-[7rem] h-[7rem] overflow-hidden" v-for="(photo, index) in photos" :key="index" @click="deleteImage(index)">
                        <img :src="photo.webviewPath" class="object-cover w-full h-full" alt="">
                    </div>
                    <div class="w-[7rem] h-[7rem] overflow-hidden" v-for="(video, index) in video_file" :key="index" @click="deleteVideo(index)">
                        <video :src="video.src" class="object-cover w-full h-full"></video>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div class="btn btn-primary" @click="takePhoto">
                        <ion-icon slot="icon-only" :icon="camera" size="large"></ion-icon>
                    </div>
                    <div class="btn btn-primary" @click="takeVideo()">
                        <ion-icon slot="icon-only" :icon="videocam" size="large"></ion-icon>
                    </div>
                </div>
                <div class="btn btn-success" @click="submit">
                    submit
                </div>
            </div>
        </IonContent>
    </IonPage>
</template>
<script lang="ts" setup>
import { camera, videocam } from 'ionicons/icons'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/vue';
import { usePhotoGallery } from '@/composables/camera/useCameraGallery'
import inputComponent from '@/component/inputComponent.vue'
import inputTextArea from '@/component/inputTextArea.vue';
import { reactive, inject } from 'vue';
import { videoRecord } from '@/composables/camera/videoComposable'


const axios: any = inject('axios')
const { takePhoto, photos } = usePhotoGallery()
const { takeVideo, video_file } = videoRecord()

interface pelaporanInterface {
    title: string,
    body: string,
    first_name: string,
    last_name: string,
    status_name: string,
    location: string,
    images: any,
    status: any,
    errors: any,
}

const pelaporan: pelaporanInterface = reactive({
    title: '',
    body: '',
    first_name: '',
    last_name: '',
    status_name: '',
    location: '',
    images: [],
    status: 'idle',
    errors: [],
})

async function submit() {
    pelaporan.images = []
    pelaporan.status = 'processing'
    await photos.value.filter(async (element: any) => {
        const file = await dataURLtoFile(element.webviewPath, element.filepath)
        pelaporan.images.push(file)
    });
    await video_file.value.filter(async (element: any) => {
        pelaporan.images.push(element.file)
    })

    await axios.post('/upload', pelaporan, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

function dataURLtoFile(dataurl: any, filename: any) {

    const arr: any = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]);

    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}

async function deleteImage(index: number) {
    photos.value.splice(index, 1)
}
async function deleteVideo(index: number) {
    video_file.value.splice(index, 1)
    console.log(video_file.value);

}

</script>
<style lang="">
    
</style>