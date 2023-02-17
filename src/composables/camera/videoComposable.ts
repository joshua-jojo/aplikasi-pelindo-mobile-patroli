import { MediaCapture } from '@whiteguru/capacitor-plugin-media-capture'
import { Capacitor } from '@capacitor/core';
import { ref } from 'vue';

export function videoRecord() {
  const video_file: any = ref([]);
  async function takeVideo() {
    const options: any = { duration: 30, quality: "sd" };
    const video: any = await MediaCapture.captureVideo(options);
    const dataVideo = await video.file;
    if (await dataVideo) {
      const url_video = await Capacitor.convertFileSrc(dataVideo.path);
      const video_file_data = await fetch(url_video);
      const blob_video = await video_file_data.blob();
      const file = await new File([blob_video], dataVideo.name, { type: blob_video.type })
      const file_final: any = await {
        src: url_video,
        file: file
      }
      await video_file.value.push(file_final)


    }


  }
  return {
    takeVideo,
    video_file
  };
}
