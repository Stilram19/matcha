import { forwardRef } from "react";

type MessageProps = {
    isSender: boolean,
    last?: boolean,
}

const Message = forwardRef<HTMLDivElement, MessageProps>((props, ref) => {

    // const roundedClasses =

    return (
        <div ref={ref} className={`my-2 mr-1 flex ${props.isSender ? 'justify-end' : 'justify-start'} ${props.last ? "mb-10" : ''}`}>
            <div className={`h-min border p-2 max-w-[60%] rounded-t-2xl ${props.isSender ? 'rounded-bl-2xl bg-black text-white' : 'rounded-br-2xl bg-light-gray1'}  font-semibold break-words`}>
                Hello world i'm waiting b;lha
            </div>
        </div>
    )
})


export default Message;