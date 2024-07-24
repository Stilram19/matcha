import ChatInputField from "./ChatInputField";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import { useMessages } from "../../context/messagesProvider";



function    getFormattedTime() {
    const   dateNow = new Date();
    const   formattedTime = `${dateNow.getHours()}:${dateNow.getMinutes()}`
    return (formattedTime)
}

const   ChatBox = () => {
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const { messages } = useMessages();
    const [shouldScrollDown, setShouldScrollDown] = useState<boolean>(true);
    const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
    // ? this will be true if new messages arrived or the user viewing older messages

    useEffect(() => {
        if (!chatBoxRef.current)
            return ;
        if (shouldScrollDown)
            chatBoxRef.current.scrollTop = chatBoxRef.current?.scrollHeight;
        else
            setShowScrollButton(true);
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
                                const   isAudio = message.messageType === 'audio';
                                console.log(`isAudio: ${isAudio}`)
                                return (
                                    <div
                                        key={index} // ! add the id of the message instead of the array index
                                        className={`mr-1 my-2 md:my-2 lg:my-3 ${(index > 0 && arr[index-1].isSender != arr[index].isSender ? 'mt-3 md:mt-5 lg:mt-6' : '')} ${index == messages.length - 1 ? 'mb-3' : ''}`}
                                    >
                                        { isAudio ? 
                                            <audio controls src={URL.createObjectURL(new Blob([message.messageContent], {type: 'audio/wav'}))}></audio>
                                            : <Message  message={message.messageContent as string} sentAt={getFormattedTime()} isSender={message.isSender}  />
                                        }
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
            <ChatInputField onSend={() => setShouldScrollDown(true)} />
        </>
    )
}



export default ChatBox;