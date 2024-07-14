import { ChatBoxProps } from "../../types";
import Message from "./Message";
import useScrollInto from "../../hooks/useScrollInto";
import { FC } from "react";
 


const   ChatBox: FC<ChatBoxProps> = ({messages}) => {
    const   lastMessageRef = useScrollInto(messages);

    // ! this callback i should accepted in the props of this component.
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (e.currentTarget.scrollTop === 0)
            console.log("Top");
        // Fetching more messages
        // accespting a callback that update the state
        // ! also i'm concerned with the useScrollInto
    }

    return (
        <div className="h-full w-full p-2 pr-0 overflow-hidden">
                <div className="h-[calc(100%-50px)] overflow-y-auto scrollbar mr-1"  onScroll={handleScroll}>
                    {
                        messages.map((message, index, arr) => {
                            return (
                                <div
                                    key={index} // ! add the id of the message instead of the array index
                                    className={`mr-1 my-2 md:my-3 lg:my-5 ${(index > 0 && arr[index-1].isSender != arr[index].isSender ? 'mt-5 md:mt-7 lg:mt-10' : '')} ${index == messages.length - 1 ? 'mb-5' : ''}`}
                                >
                                    <Message  {...message}  />
                                </div>
                            )
                        })
                    }
                    <div ref={lastMessageRef} />
                </div>
        </div>
    )
}



export default ChatBox;