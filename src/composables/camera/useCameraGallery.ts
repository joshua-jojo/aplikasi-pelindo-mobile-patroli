// import { Directory, Filesystem } from '@capacitor/filesystem';
import { ref } from "vue";
import { Plugins } from '@capacitor/core'
import { CameraResultType, CameraSource, } from '@capacitor/camera';


export interface Photo {
    filepath: string,
    webviewPath?: string,
    fileDirectory?: string,
}

export function usePhotoGallery() {
    const { Camera } = Plugins;
    const photos = ref<Photo[]>([])
    const takePhoto = async () => {
        const cameraPhoto = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera,
            quality: 20,
        })

        const fileName = new Date().getTime() + '.jpg'
        const filePath = `secred/${fileName}`;
        const savedFileImage = {
            filepath: fileName,
            webviewPath: cameraPhoto.dataUrl,
            fileDirectory: filePath,
        }

        // const file = await Filesystem.readFile({
        //     path: cameraPhoto.path
        // })
        // await Filesystem.writeFile({
        //     path: filePath,
        //     data: file.data,
        //     directory: Directory.Documents
        // })

        photos.value = [savedFileImage, ...photos.value]


    }

    return {
        photos,
        takePhoto
    }
}