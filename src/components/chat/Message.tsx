import { FC } from "react";
import {MessageProps} from "../../types/index";

const Message: FC<MessageProps> = (props) => {
    // maybe i should just accept the message prop since i can handle the case of the sender vs recipiant
    // in the parent component so that this component is more reusable and straightforward
    return (
        <div className={`flex ${ props.isSender ? 'justify-end' : 'justify-start' }`}>
            <div className={`h-min border p-2 max-w-[70%] rounded-t-2xl ${ props.isSender ? 'rounded-bl-2xl bg-black text-white' : 'rounded-br-2xl bg-red-light'}  break-words`}>
                { props.message }
                <p className="text-gray-500 text-sm md:text-md">{ props.sent_at }</p>
            </div>
        </div>
    )
}


export default Message;