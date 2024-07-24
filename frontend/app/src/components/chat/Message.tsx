import { FC } from "react";
import {MessageProps} from "../../types/index";

const Message: FC<MessageProps> = ({isSender, message, sentAt}) => {
    // maybe i should just accept the message prop since i can handle the case of the sender vs recipiant
    // in the parent component so that this component is more reusable and straightforward
    return (
        <div className={`flex ${ isSender ? 'justify-end' : 'justify-start' }`}>
            <div className={`h-min border p-1 max-w-[85%] md:max-w-[70%] rounded-t-lg text-sm md:text-base ${ isSender ? 'rounded-bl-lg bg-light-gray1 ' : 'rounded-br-lg bg-red-light'}  break-words`}>
                { message }
                <p className={`text-gray-500 text-xs flex ${!isSender ? "justify-end" : "justify-start"}`}>{ sentAt }</p>
            </div>
        </div>
    )
}


export default Message;