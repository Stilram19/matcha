import { forwardRef } from "react";

type MessageProps = {
    isSender: boolean,
    message: string,
    last?: boolean,
}

const Message = forwardRef<HTMLDivElement, MessageProps>((props, ref) => {

    // const roundedClasses =

    return (
        <div ref={ref} className={`flex ${props.isSender ? 'justify-end' : 'justify-start'}`}>
            <div className={`h-min border p-2 max-w-[60%] rounded-t-2xl ${props.isSender ? 'rounded-bl-2xl bg-black text-white' : 'rounded-br-2xl bg-red-light'}  break-words`}>
                { props.message }
                <p className="text-gray-500">sent at 10:30PM</p>
            </div>
        </div>
    )
})


export default Message;