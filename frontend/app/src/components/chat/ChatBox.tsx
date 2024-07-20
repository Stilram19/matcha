import { ChatBoxProps } from "../../types";
import Message from "./Message";
import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useActiveDm } from "../../context/activeDmProvider";
import { AiOutlineAudio } from "react-icons/ai";
import { IoArrowDownCircleOutline, IoSend } from "react-icons/io5";
 
const   ChatInputField: FC<{onSend: (msg: string) => void}> = ({onSend}) => {
    const   { activeDmId } = useActiveDm();
    const   inputRef = useRef<HTMLInputElement>(null);

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
                        <AiOutlineAudio size={25} className="fill-gray-500 hover:fill-black" />
                    </button>
                    <button className="p-1 bg-pink rounded-md" onClick={sendHandler}>
                        <IoSend size={25} className="fill-white" />
                    </button>
                </div>
            </div> 
        </div>
    )

}


const   ChatBox: FC<ChatBoxProps & {onSend: (msg: string) => void}> = ({messages, onSend}) => {
    const [shouldScrollDown, setShouldScrollDown] = useState<boolean>(true);
    const [showScrollButton, setShowScrollButton] = useState<boolean>(false); // ? this will be true if new messages arrived or the user viewing older messages
    const chatBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chatBoxRef.current)
            return ;
        console.log(shouldScrollDown);
        if (shouldScrollDown) {
            chatBoxRef.current.scrollTop = chatBoxRef.current?.scrollHeight;
        } else {
            console.log("new messages are received")
            setShowScrollButton(true);
        }
    }, [messages])


    const handleOnScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

        if (scrollHeight - scrollTop === clientHeight) {
            setShouldScrollDown(true);
            setShowScrollButton(false);
        } else {
            setShouldScrollDown(false);
        }
        
        if (scrollTop === 0) {
            // fetchMoreMessages(); // ? this function should fetch more data when the user consume all the dms history
            console.log('MORE DMS');
        }
    }

    const handleOnSend = (msg: string) => {
        onSend(msg);
        setShouldScrollDown(true);
    }

    const handleScrollButtonClick = () => {
        if (!chatBoxRef.current)
            return ;
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }


    return (
        <>
            <div className="h-full w-full overflow-hidden">
                {showScrollButton && 
                <div
                    onClick={handleScrollButtonClick}
                    className="w-full text-center bg-gray-200 rounded-b-lg text-sm cursor-pointer"
                >
                    you're viewing old messages
                </div>}

                <div className="h-full w-full p-2 pr-0">
                    <div ref={chatBoxRef} className="h-[calc(100%-50px)] overflow-y-auto scrollbar mr-1 pr-1.5"  onScroll={handleOnScroll}>
                        {
                            messages.map((message, index, arr) => {
                                return (
                                    <div
                                        key={index} // ! add the id of the message instead of the array index
                                        className={`mr-1 my-2 md:my-2 lg:my-3 ${(index > 0 && arr[index-1].isSender != arr[index].isSender ? 'mt-3 md:mt-5 lg:mt-6' : '')} ${index == messages.length - 1 ? 'mb-3' : ''}`}
                                    >
                                        <Message  {...message}  />
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
            <ChatInputField onSend={handleOnSend} />
        </>
    )
}



export default ChatBox;