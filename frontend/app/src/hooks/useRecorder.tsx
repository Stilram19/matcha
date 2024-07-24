import { useRef, useState } from "react";

function    useRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [audioSeconds, setAudioSeconds] = useState(0);
    const [ audioArrayBuffer, setArrayBuffer ] = useState<ArrayBuffer | null>(null)
    const audioChunks = useRef<Blob[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const startRecording = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true});
            const mediaRecorder = new MediaRecorder(mediaStream, { mimeType: 'audio/webm' });

            const intervalId = setInterval(() => setAudioSeconds(prev => prev + 1), 1000);
            mediaRecorder.ondataavailable = (e) => {
                console.log(`data arrived`)
                audioChunks.current.push(e.data);
            }
        
            mediaRecorder.onstop = async () => {
                console.log('recording stopped')
                const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
                // const url = URL.createObjectURL(audioBlob);
                const audioBuffer = await audioBlob.arrayBuffer();
                setArrayBuffer(audioBuffer);
                // const audioContext = new AudioContext();
                // const audioBuffer1 = await audioContext.decodeAudioData(audioBuffer);
                // console.log(audioBuffer1);
                audioChunks.current = [];
                const tracks = mediaRecorder.stream.getTracks();
                tracks.forEach((track) => track.stop());
                clearInterval(intervalId);
            }

            mediaRecorderRef.current = mediaRecorder;
            setIsRecording(true);
            audioChunks.current = []; // ? before recording starts
            mediaRecorder.start();
        } catch (e) {
            console.log(e);
        }
    }

    const stopRecording = () => {
        if (!mediaRecorderRef.current)
            return ;
        setIsRecording(false);
        mediaRecorderRef.current.stop();
    }

    const audioClear = () => {
        setArrayBuffer(null);
        setAudioSeconds(0);
    }

    return {
        startRecording,
        stopRecording,
        audioArrayBuffer,
        audioClear,
        isRecording,
        audioSeconds
    }

}


export default useRecorder;