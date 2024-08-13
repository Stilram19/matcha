import { KeyboardEvent, useEffect, useRef } from "react";
import { useActiveDm } from "../../context/activeDmProvider";
import { AiOutlineAudio } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { useSocket } from "../../context/SocketProvider";
import useRecorder from "../../hooks/useRecorder";
import { EventsEnum } from "../../types";

type OutgoingMessagePayload = {
    to: number,
    type: 'text' | 'audio',
    content: string | ArrayBuffer;
}

function formatMinuteSecond(seconds: number) {
    return Math.floor(seconds / 60).toString().padStart(2, '0') + ':' + Math.floor(seconds % 60).toString().padStart(2, '0')
}

const   ChatInputField = ({onSend}: {onSend: () => void}) => {
    const   socket = useSocket();
    const   { activeDmId } = useActiveDm();
    const   inputRef = useRef<HTMLInputElement>(null);
    const   {startRecording, stopRecording, isRecording, audioArrayBuffer, audioClear, audioSeconds} = useRecorder();

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
        return () => {
            audioClear();
            stopRecording();
        }
    }, [activeDmId])


    const   sendMessage = ({type, content, to}: OutgoingMessagePayload) => {
        const   messageDetails = {
            to,
            messageType: type,
            messageContent: content,
        }
        console.log('emitting')
        console.log(socket);
        console.log(EventsEnum.CHAT_SEND);
        socket?.emit(EventsEnum.CHAT_SEND, messageDetails);
    }

    const   sendHandler = () => {
        if (audioArrayBuffer) {
            console.log(audioArrayBuffer);
            sendMessage({type: 'audio', content: audioArrayBuffer, to: activeDmId});
            audioClear();
        } else {
            if (!inputRef.current || !inputRef.current.value)
                return ;
            sendMessage({type: 'text', content: inputRef.current.value, to: activeDmId});
            inputRef.current.value = '';
        }
        onSend();
    }

    const   handleAudioRecording = () => {
        !isRecording ? startRecording() : stopRecording();
    }

    return (
        <div className="relative pt-2">

            <div className="absolute bottom-2 w-full px-3">
                {!isRecording && !audioArrayBuffer ?
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Enter your message"
                        className="outline-none border w-full p-3 px-3 pr-20 rounded-lg"
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && sendHandler()}
                    /> :
                    <div className="w-full flex items-center p-3 border rounded-lg gap-4 bg-transparent pr-20">
                        <div className="font-semibold">
                            {formatMinuteSecond(audioSeconds)}
                        </div>
                        <div className="flex justify-center w-full">
                        {
                            isRecording ?
                            <div className="beats-container">
                                <div className="beat"></div>
                                <div className="beat"></div>
                                <div className="beat"></div>
                                <div className="beat"></div>
                                <div className="beat"></div>
                            </div> :
                            <div className="flex justify-between w-[200px] items-center">
                                <div className="h-5 w-5 rounded-full bg-red-dark"></div>
                                <div className="h-5 w-5 rounded-full bg-red-dark"></div>
                                <div className="h-5 w-5 rounded-full bg-red-dark"></div>
                                <div className="h-5 w-5 rounded-full bg-red-dark"></div>
                                <div className="h-5 w-5 rounded-full bg-red-dark"></div>
                            </div>
                        }
                        </div>
                    </div>
                }



                <div className="absolute bottom-0 top-0 right-5 flex items-center gap-2">
                    <button className={`${inputRef.current && inputRef.current.value ? 'hidden' : ''}`}>
                        <AiOutlineAudio size={25} className="fill-gray-500 hover:fill-black" onClick={handleAudioRecording} />
                    </button>
                    <button className="p-1 bg-pink rounded-md" onClick={sendHandler}>
                        <IoSend size={25} className="fill-white" />
                    </button>
                </div>

            </div> 
        </div>
    )

}


export default ChatInputField;