// import { fileTypeFromBuffer } from "file-type";

// async function    validateUploadedFile(view: Uint8Array) {
//     const   type = await fileTypeFromBuffer(view)
//     console.log(type)
//     return (type && type.mime === 'video/webm');
// }

// function generateAudioFileName(userId: number) {
//     let fileName: string;

//     fileName = `audio-${Date.now()}_${userId}.wav`
//     return (fileName);
// }

// async function saveAudioFile(audioData: ArrayBuffer, filename: string) {
//     const view = new Uint8Array(audioData);

//     if (!await validateUploadedFile(view))
//         throw new ApplicationError('Invalid audio file type. Please upload a WAV file.');

//     let audioFileName = `uploads/${filename}`;

//     writeFile(path.join(path.resolve(), 'uploads', filename), view, (err) => {
//         if (err) {
//             console.log('write error:');
//             console.log(err);
//         }
//     });
//     return (filename);
// }