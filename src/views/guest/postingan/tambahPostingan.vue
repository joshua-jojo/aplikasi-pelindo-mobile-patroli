<template lang="">
    <teleport to='#loading'>
        <div v-if="uploadPercentage > 0" class="absolute w-screen h-screen bg-gray-800 bg-opacity-70 z-[100] flex justify-center items-center">
            <div class="flex flex-col justify-center items-center gap-2">
                <div class="text-white capitalize text-4xl mb-4 font-bold drop-shadow-lg">Mengirim Data</div>
                <div class="radial-progress bg-primary text-primary-content border-4 border-primary" :style="`--value:${uploadPercentage};`">{{uploadPercentage}}%</div>
                <div class="text-white capitalize text-xl mb-4 font-bold drop-shadow-lg">{{uploadProgress.upload}} MB / {{uploadProgress.total}} MB</div>
            </div>
        </div>
    </teleport>
    <div class="min-h-screen bg-base-200 px-4">
        <div class="max-w-md p-4 mx-auto">
        <!-- step  -->
        <div class="w-full py-5">
                <ul class="steps w-full">
                    <li id="step1" class="step" :class="{'step-primary' : (step >= 1)}">Upload Foto</li>
                    <li id="step2" class="step" :class="{'step-primary' : (step >= 2)}">Isi Laporan</li>
                    <li id="step3" class="step" :class="{'step-primary' : (step == 3)}">Selesai</li>
                </ul>
            </div>
        </div>

        <!-- upload foto  -->
        <div id="upload-foto" class="card bg-base-100 my-2 shadow" v-if="step == 1">
            <div class="p-4 grid grid-cols-2 gap-2">
                <figure
                    id="btn-upload"
                    class="btn btn-ghost w-full h-40 bg-base-200 rounded-box"
                    @click="takePhoto()"
                >
                    <svg
                        id="icon-camera"
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        fill="currentColor"
                        class="bi bi-camera-fill opacity-25"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                        />
                        <path
                            d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"
                        />
                    </svg>
                </figure>
                <figure
                @click="takeVideo()"
                    id="btn-upload"
                    class="btn btn-ghost w-full h-40 bg-base-200 rounded-box"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-camera-reels opacity-25" viewBox="0 0 16 16">
                        <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"/>
                        <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"/>
                        <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                    </svg>
                </figure>
                <div class="grid grid-cols-3 col-span-2 gap-2">
                    <img
                        id=""
                        :src="item.webviewPath"
                        class="bg-base-100 shadow w-24 h-24 object-cover rounded-box mx-auto hover:opacity-50"
                        @click="hapusGambar(index)"
                        v-for="(item, index) in photos" :key="index"
                    />
                    <video
                        v-for="(item,index) in video_file"
                        :src="`${item.src}#t=0.1`"
                        class="bg-base-100 shadow w-24 h-24 object-cover rounded-box mx-auto hover:opacity-50"
                        :key="index"
                        @click="hapusVideo(index)"
                    ></video>
                </div>
            </div>
        </div>
        <!-- form pendataan  -->
        <div id="isi-laporan" class="card bg-base-100 my-2 shadow" v-if="step == 2">
                <div class="p-4">
                    <div class="form-control w-full">
                        <label class="label justify-start gap-1">
                            <span class="label-text">Judul Laporan</span>
                            <span class="label-text-alt text-error">*</span>
                        </label>
                        <input
                            v-model="form.title"
                            name="title"
                            type="text"
                            placeholder="Judul Laporan"
                            class="input input-bordered w-full"
                        />
                        <label class="label" v-if="form.errors.title">
                            <span class="label-text-alt text-error"
                                >Bidang tidak boleh kosong</span
                            >
                        </label>
                    </div>

                    <div class="form-control">
                        <label class="label justify-start gap-1">
                            <span class="label-text">Keterangan</span>
                            <span class="label-text-alt text-error">*</span>
                        </label>
                        <textarea
                            v-model="form.body"
                            class="textarea textarea-bordered h-32"
                            placeholder="Detail Laporan"
                        ></textarea>
                        <label class="label" v-if="form.errors.body">
                            <span class="label-text-alt text-error"
                                >Bidang tidak boleh kosong</span
                            >
                        </label>
                    </div>

                    <div class="form-control w-full">
                        <label class="label justify-start gap-1">
                            <span class="label-text">Lokasi</span>
                            <span class="label-text-alt text-error">*</span>
                        </label>
                        <input
                            v-model="form.location"
                            name="location"
                            type="text"
                            placeholder="Lokasi"
                            class="input input-bordered w-full"
                        />
                        <label class="label" v-if="form.errors.location">
                            <span class="label-text-alt text-error"
                                >Bidang tidak boleh kosong</span
                            >
                        </label>
                    </div>

                    <div class="form-control w-full" v-show="false">
                        <label class="label justify-start gap-1">
                            <span class="label-text">Nama</span>
                            <span class="label-text-alt text-error">*</span>
                        </label>
                        <input
                            v-model="form.name"
                            name="name"
                            type="text"
                            placeholder="Nama Pelapor"
                            class="input input-bordered w-full"
                        />
                        <label class="label" v-if="form.errors.name">
                            <span class="label-text-alt text-error"
                                >Bidang tidak boleh kosong</span
                            >
                        </label>
                    </div>
                </div>
        </div>

        <div id="laporan-sukses" class="card my-2" v-if="step == 3">
            <div class="p-4">
                <div class="alert alert-info shadow">
                    <div class="flex-col py-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="stroke-current flex-shrink-0 h-24 w-24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>Laporan Berhasil Dibuat!</span>
                    </div>
                </div>
                <router-link :to="{name : 'user.postingan.show', params : {id : idPostingan}}">
                    <div
                        id="btn-lihat"
                        class="btn btn-primary btn-block mt-5"
                    >
                        Lihat Laporan
                    </div>
                </router-link>
            </div>
        </div>
            
        <div class="grid grid-cols-2 gap-3 py-2">
            <button
                class="btn btn-primary btn-outline"
                :disabled="buttonBack"
                @click="backStep"
                v-if="step < 3"
            >
                Back
            </button>
            <button
                class="btn btn-primary"
                :disabled="buttonNext"
                v-if="step >= 1 && step < 2"
                @click="nextStep"
            >
                Next
            </button>
            <button
                id="btn-submit"
                class="btn btn-primary"
                v-if="step == 2"
                :disabled="submitCheck"
                @click="submit"
            >
                Submit
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { usePhotoGallery } from '@/composables/camera/useCameraGallery'
import { videoRecord } from '@/composables/camera/videoComposable'
import axios from 'axios';
import { useStore } from 'vuex';

const { takePhoto, photos } = usePhotoGallery();
const { takeVideo, video_file } = videoRecord()

const store = useStore()
const step = ref(1)
const uploadPercentage = ref(0)
const uploadProgress = reactive({
    upload : '',
    total : '',
})
const idPostingan = ref()
const show = ref(0)
const form: any = reactive({
    title: '',
    token: store.state.user.token,
    body: '',
    location: '',
    name: store.state.user.nama,
    files: [],
    errors: {},
})

function hapusGambar(index: number) {
    photos.value.splice(index, 1)

}
function hapusVideo(index: number) {
    video_file.value.splice(index, 1)
}

function nextStep() {
    step.value++
}
function backStep() {
    step.value--
}
async function submit() {
    await photos.value.filter(async (element: any) => {
        const file = await dataURLtoFile(element.webviewPath, element.filepath)
        form.files.push(file)
    });
    await video_file.value.filter(async (element: any) => {
        form.files.push(element.file)
    })
    await axios({
        method: 'post',
        url: '/guest/postingan/buat',
        data: form,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent: any) => {
            uploadPercentage.value = Math.floor((progressEvent.loaded/progressEvent.total)*100)
            uploadProgress.total = (progressEvent.total/1048576).toFixed(2)
            uploadProgress.upload = (progressEvent.loaded /1048576).toFixed(2)
            show.value = 1
            
        }
    }).then((response) => {
        show.value = 0
        const data = response.data
        if (data.status == 'error') {
            form.errors = data.errors
        }
        else if (data.status == 'success') {
            idPostingan.value = data.data.postingan_id
            step.value++

            form.title = ''
            form.body = ''
            form.location = ''
            form.name = ''
            form.files = []
        }
    })
    uploadPercentage.value = 0
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

const buttonBack = computed(
    () => {
        let final = true
        if (step.value > 1 && step.value < 3) {
            final = false
        }
        return final;
    }
)

const buttonNext = computed(
    () => {
        let final = true
        if ((photos.value.length || video_file.value.length)) {
            final = false
        }
        return final;
    }
)

const submitCheck = computed(
    () => {
        let final = true
        final = !(form.title.length && form.body.length && form.name.length && form.location.length);
        return final
    }
)
</script>
<style lang="">
    
</style>