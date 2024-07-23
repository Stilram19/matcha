import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useActiveDm } from "../../context/activeDmProvider";
import { AiOutlineAudio } from "react-icons/ai";
import { IoSend } from "react-icons/io5";


function    useRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState('');
    const audioChunks = useRef<Blob[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    // useEffect(() => {
    //     const getMediaRecorder = async () => {
    //         try {
    //             const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true});
    //             const mediaRecorder = new MediaRecorder(mediaStream);
            
    //             mediaRecorder.ondataavailable = (e) => {
    //                 console.log(`data arrived`)
    //                 audioChunks.current.push(e.data);
    //             }

    //             mediaRecorder.onstop = () => {
    //                 const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
    //                 const url = URL.createObjectURL(audioBlob);
    //                 setAudioUrl(url);
    //                 audioChunks.current = [];
    //                 const tracks = mediaRecorder.stream.getTracks();
    //                 tracks.forEach((track) => track.stop());
    //             }

    //             mediaRecorderRef.current = mediaRecorder;
    //         } catch (e) {
    //             console.log(`media stream error: ${e}`);
    //         }
    //     }

    //     getMediaRecorder();

    //     return () => {
    //         if (!mediaRecorderRef.current)
    //             return ;
    //         const tracks = mediaRecorderRef.current.stream.getTracks();
    //         tracks.forEach((track) => track.stop());
    //     };
    // }, [])

    const startRecording = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true});
            const mediaRecorder = new MediaRecorder(mediaStream);

            mediaRecorder.ondataavailable = (e) => {
                console.log(`data arrived`)
                audioChunks.current.push(e.data);
            }
        
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
                audioChunks.current = [];
                const tracks = mediaRecorder.stream.getTracks();
                tracks.forEach((track) => track.stop());
            }

            mediaRecorderRef.current = mediaRecorder;
            setIsRecording(true);
            audioChunks.current = [];
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


    return {
        startRecording,
        stopRecording,
        audioUrl,
        isRecording
    }

}




const   ChatInputField: FC<{onSend: (msg: string) => void}> = ({onSend}) => {
    const   { activeDmId } = useActiveDm();
    const   inputRef = useRef<HTMLInputElement>(null);
    const   {startRecording, stopRecording, isRecording, audioUrl} = useRecorder();

    console.log(`${audioUrl}`)
    useEffect(() => {
        if (inputRef.current)
            inputRef.current.focus();
    }, [activeDmId]) // ! it depend on the active conversation id

    const   sendHandler = () => {
        if (!inputRef.current)
            return ;

        const   msg = inputRef.current.value;
        if (msg === '') return;
        onSend(msg);
        inputRef.current.value = '';
    }

    const   handleAudioRecording = () => {
        console.log(`recording ${isRecording}`)
        if (!isRecording)
            startRecording();
        else
            stopRecording();
    }

    return (
        <div className="relative pt-2">

            <div className="absolute bottom-2 w-full px-3">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter your message"
                    className="outline-none border w-full p-3 px-3 pr-20 rounded-lg"
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && sendHandler()}
                />

                <div className="absolute bottom-0 top-0 right-5 flex items-center gap-2">
                    <button className="">
                        <AiOutlineAudio size={25} className="fill-gray-500 hover:fill-black" onClick={handleAudioRecording} />
                    </button>
                    <button className="p-1 bg-pink rounded-md" onClick={sendHandler}>
                        <IoSend size={25} className="fill-white" />
                    </button>
                </div>
                {isRecording && "recording"}
            {
                audioUrl ? 
                    <audio src={audioUrl} controls></audio>
                :
                    null
            }
            </div> 
        </div>
    )

}


export default ChatInputField;